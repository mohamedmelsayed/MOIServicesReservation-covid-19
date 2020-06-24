import { Injectable, isDevMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { Md5 } from "ts-md5/dist/md5";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  public APISERVER: string = "";
  public API: string = "";
  public currentUser: any;
  public currentUserId: number;
  public currentScreen: string;
  private _md5: Md5;
  // private webdomain = "http://www.prof-dev.com/eisa/";
  // private webdomain = "http://new.haven-eagle.com/";
  // private localdomain = "http://localhost/salesdove/";
  private localdomain = "http://localhost/moi/";
  // private localdomain = "http://koby.flowbytes.com/";
  private webdomain = "http://62.12.99.11/reservations/";
  // private webdomain = "http://79.170.44.126/platinum-sd.com/kushite/";


  constructor(public _http: HttpClient) {
    if (environment.production) {
      this.APISERVER = this.webdomain;
    } else {
      this.APISERVER = this.localdomain;
    }
    this.API = this.APISERVER + "api.php";
  }
  md5(value) {
    this._md5 = new Md5();
    return this._md5.appendStr(value).end();
  }
  private token = new BehaviorSubject("");
  public setToken(token) {
    this.token.next(token);
  }
  private getHeaders() {
    if (!this.token.value) {
      var hdrs2 = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      };
      return hdrs2;
    } else {
      var hdrs1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          apitoken: this.token.value
        })
      };
      return hdrs1;
    }
  }

  getTimeStamp() {
    var dt = new Date();
    return (
      dt.toISOString().split("T")[0] +
      " " +
      dt.toLocaleTimeString().split(" ")[0]
    );
  }

  getFieldsNames(table) {
    return this._http.post(
      this.API,
      { table: table, method: "fieldsnames" },
      this.getHeaders()
    );
  }

  sendeMail(
    email: string,
    activationkey: string,
    password: string,
    username: string
  ) {
    return this._http.get(
      this.APISERVER +
        "mail.php?type=send&password=" +
        password +
        "&username=" +
        username +
        "&email=" +
        email +
        "&activationkey=" +
        activationkey
    );
  }
  sendResetePasswordMail(email: string, resetPasswordCode: string) {
    return this._http.get(
      this.APISERVER +
        "mail.php?type=resetpassword&email=" +
        email +
        "&resetcode=" +
        resetPasswordCode
    );
  }
  DoAudit(body:any, table:string, cud:string){
    if (environment.production){
      this._http
      .post(
        this.API,
        {
          table: "log",
          method: "post",
          body: {
            usersid: this.currentUser.username,
            table: table,
            cud: cud,
            screen: this.currentScreen,
            body: JSON.stringify(body)
          }
        },
        this.getHeaders()
      )
      .subscribe((res: any) => {});
    }
  }
  doTransaction(operations) {
    let cud;
    var index=200;
    let list:any[]=[];
    list=operations;
    this.log("TRANS OP: ", JSON.stringify(operations));
    list.forEach(element => {
      cud=element.method=='post'?'c':element.method=='put'?'u':'d';
    
        list.push( {
          index:index,
          table: "log",
          method: "post",
          body: {
            usersid: this.currentUser.username,
            table: element.table,
            cud: cud,
            screen: this.currentScreen,
            body: cud=='d'?element.where:JSON.stringify(JSON.stringify(element.body))
          }
        });
      index++;
    });
    return this._http.post(this.API, JSON.stringify(list), this.getHeaders());
  }
  DoTransaction(operations){
    return this._http.post(this.API, operations, this.getHeaders());
  }
  getIssues(where?) {
    return this._http.post(this.API, {
      method: "get",
      table: "issues",
      where: where ? where : ""
    },this.getHeaders());
  }
  putIssue(body) {
    return this._http.post(this.API, {
      method: "put",
      table: "issues",
      body: body,
      where: "id,eq," + body.id
    },this.getHeaders());
  }
  postIssue(body) {
    return this._http.post(this.API, {
      method: "post",
      table: "issues",
      body: body,
      where: "id,eq," + body.id
    },this.getHeaders());
  }
  Get(table, where?, order?, limit?) {
    var operation = {
      method: "get",
      table: table,
      where: where ? where : "",
      order: order ? order : "",
      limit: limit ? limit : ""
    };
    this.log("GET: ", JSON.stringify(operation));
    return this._http.post(this.API, operation, this.getHeaders());
  }

  GetLangs() {
    var operation = { method: "langs" };
    return this._http.post(this.API, operation, this.getHeaders());
  }

  DeleteLangItem(item: any) {
    var operation = {
      table: "langs",
      method: "delete",
      where: "code,eq," + item.code
    };
    return this._http.post(this.API, operation, this.getHeaders());
  }
  PutLangItem(item: any) {
    var operation = {
      table: "langs",
      method: "put",
      body: item,
      where: "code,eq," + item.code
    };
    return this._http.post(this.API, operation, this.getHeaders());
  }
  PostLangItem(item: any) {
    var operation = { table: "langs", method: "post", body: item };
    return this._http.post(this.API, operation, this.getHeaders());
  }
  GetReport(table, where?) {
    var query = { method: table, where: where ? where : "" };
    this.log("TGET Report: ", JSON.stringify(query));
    return this._http.post(this.API, query, this.getHeaders());
  }
  Login(where?) {
    var query = {
      method: "login",
      table: "users",
      where: where,
      tokenlifetime: 10000
    };
    this.log("login query", JSON.stringify(query));
    return this._http.post(this.API, query);
  }
  LogOut(user: any) {
    var query = { method: "logout", username: user.username };
    this.log("login query", JSON.stringify(query));
    return this._http.post(this.API, query);
  }
  log(...args) {
  console.log(args);
  }

  DoOperation(query) {
    this.log('DO OP: ', query);
    return this._http.post(this.API, query, this.getHeaders());
  }
  Post(table, data) {
    //this.DoAudit(data,table,"c");
    var operation = { table: table, method: "post", body: data };
    this.log("POST OP", JSON.stringify(operation));
    return this._http.post(this.API, operation, this.getHeaders());
  }

  Put(table, pk_field, body) {
    //this.DoAudit(body,table,"u");
    var operation = {
      table: table,
      method: "put",
      body: body,
      where: pk_field + ",eq," + body[pk_field]
    };
    this.log("PUT OP", JSON.stringify(operation));
    return this._http.post(this.API, operation, this.getHeaders());
  }
  PutWhere(table, body, where?) {
    //this.DoAudit(body,table,"u");
    var operation = {
      table: table,
      method: "put",
      body: body,
      where: where ? where : ""
    };
    this.log("PUT Where OP", JSON.stringify(operation));
    return this._http.post(this.API, operation, this.getHeaders());
  }

  Delete(table, pk_field, body) {
    //this.DoAudit(body,table,"d");
    var operation = {
      table: table,
      method: "delete",
      where: pk_field + ",eq," + body[pk_field]
    };
    this.log("DEL OP", JSON.stringify(operation));
    return this._http.post(this.API, operation,this.getHeaders());
  }
  DeleteWhere(table, where?) {
    //this.DoAudit({delete:"all",where:where},table,"d");
    var operation = { table: table, method: "delete", where: where };
    this.log("DEL WHERE OP", JSON.stringify(operation));
    return this._http.post(this.API, operation, this.getHeaders());
  }
  GetChart(name) {
    if (this.currentUser.id == 0) return;
    var op = { method: name };
    console.log("Chart ", JSON.stringify(op));
    return this.DoOperation(op);
  }
}
