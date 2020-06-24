import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  @Input('reserve')
  public reserve: any = {};
  @ViewChild("date", { static: false })
  public date2: any;
  public statistics: any[] = [];
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  public request: any = {};
  result: any;
  constructor(private _hs: HttpService, private _ss: ShareService, private _ar: ActivatedRoute,
    private _router: Router) {
    this._ar.params.subscribe(params => (this.reserve = JSON.parse(params["reserve"])));

  }
  ngOnInit() {

  }

  search() {
    this._hs.DoOperation({
      method: 'get',table:"orders",
      where: 'servicesid,eq,' + this.reserve.id + '^dateofapp,eq,' + formatDate(this.request.dateofapp, "yyyy-MM-dd", "en") + '^phonenumber,eq,' + this.request.phonenumber
    }).subscribe((res: any) => {
      if (res.length > 0) {
        console.log(res);
        this.result = res[0]
      }
      else{
        this.result=null;
      }
    });
  }


}
