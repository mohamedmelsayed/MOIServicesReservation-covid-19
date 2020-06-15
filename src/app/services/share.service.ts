import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "./http.service";
@Injectable({
  providedIn: "root"
})
export class ShareService {
  constructor(private _hs: HttpService) {}
  public REPORTHEADER: string = "";
  public REPORTFOOTER: string = "";
  //Langs
  private langs = new BehaviorSubject({});
  public Langs = this.langs.asObservable();
  setLangs(langs) {
    this.langs.next(langs);
  }
  //Menu
  private menu = new BehaviorSubject({});
  public Menu = this.menu.asObservable();
  setMenu(menu) {
    this.menu.next(menu);
  }
  //newitems
  public nuItems: string[] = [];
  addNuItem(item:string) {
    if (this.nuItems.indexOf(item) < 0) {
      this.nuItems.push(item);
    }
  }
  public getNuItems() {
    var sql:string="INSERT INTO LANGS (`code`,`en`,`ar`) VALUES ";
    this.nuItems.forEach((one:string)=>{
      sql=sql+one;
    });
    sql = sql.substring(0,sql.length-1)+';';
    return sql;
  }

  translate(value: string) {
    if (value in this.langs.value) {
      if (this.user.value.id > 0) {
        return this.langs.value[value][this.user.value["language"]];
      } else {
        return this.langs.value[value]["en"];
      }
    } else {
      //  return value;
      var prefix = "mnu_msg_rep_btn_plh_txt_gen_val_col_dlg_";
      var newcodeprefix = value.length > 4 ? value.substr(0, 4) : value;
      if (prefix.indexOf(newcodeprefix) >= 0) {
        var newlangitem: any = {
          code: value,
          en: value.replace("_", " ").toUpperCase(),
          ar: value.replace("_", " ").toUpperCase()
        };
        this.addNuItem(
          "('" +
            newlangitem.code +
            "','" +
            newlangitem.en +
            "','" +
            newlangitem.ar +
            "'),"
        );
        return value.replace("_", " ").toUpperCase();
      } else {
        return value;
      }
    }
  }

  //User
  private user = new BehaviorSubject({ username:"",pwd:"",id:0});

  public User = this.user.asObservable();
  setUser(user) {
    this._hs.currentUser = user;
    this.user.next(user);
  }

  //SnackBar
  private snackBar = new BehaviorSubject({});
  public SnackBar = this.snackBar.asObservable();
  setSnackBar(message) {
    this.snackBar.next(this.translate(message));
  }

  //Screen
  private screen = new BehaviorSubject({});
  public Screen = this.screen.asObservable();
  setScreen(screen) {
    this._hs.currentScreen = screen;
    this.screen.next(screen);
  }

  //Report
  private report = new BehaviorSubject({});
  public Report = this.report.asObservable();
  setReport(report) {
    this.report.next(report);
  }

  //appIsBusy
  private appIsBusy = new BehaviorSubject({});
  public AppIsBusy = this.appIsBusy.asObservable();
  setAppIsBusy(value) {
    this.appIsBusy.next(value);
  }
  //settings
  private settings = new BehaviorSubject({});
  public Settings = this.settings.asObservable();
  setSettings(value) {
    console.log('settings in SS: ', value);
    this.settings.next(value);
  }

  
  showReport(title: string,type:string) {
    this.REPORTHEADER =
  '<!doctype html><html lang="ar"><head><title>Prining</title><style> .title{ text-align: center;}' +
  'table {font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;}' +
  "table td, table th {border: 1px solid #ddd;}table td{height: 30px;padding-right: 5px;}table " +
  " th {padding-top: 5px;padding-bottom: 5px;padding-right: 5px;text-align: right;color: black;}" +
  "table {width:100%;}" +
  '</style></head><body dir="rtl"><br><br><br><table><br>';


    var w = window.open();

    w.document.write(
      this.REPORTHEADER + "<h3>" + title + "</h3>"
    );
    w.document.write("<h5>" + new Date(Date.now()).toLocaleString() + "</h5>");
    if (type == 'final'||type=='init') {
    
      var divs = document.getElementsByClassName("printdiv2");

    } else {
      var divs = document.getElementsByClassName("printdiv");

    }
    for (var i = 0; i < divs.length; i++) {
      var ele = divs.item(i);
      w.document.write(ele.innerHTML + "<br>");
    }
    // this.REPORTFOOTER =
      // "<br><br><b>:" +
      // this._ss.translate("rep_signature") +
      // "</b><br>----------------------------<br><b>:" +
      // this._ss.translate("rep_issuedby") +
      // "</b> " +
      // this.user.name +
      // "<br><b>:" +
      // this._ss.translate("rep_notes") +
      // "</b></body></html>";

    w.document.write(this.REPORTFOOTER);
    w.document.close();

    w.print();
    w.close();
  }
}
