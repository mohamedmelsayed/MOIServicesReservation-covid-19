import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
public locations:any[]=[];
  constructor(private _hs: HttpService, private _ss: ShareService, private _ar: ActivatedRoute,
    private _router: Router) { 
      // this._ar.params.subscribe(params => (this.appid = Number(params["id"])));

    }
  ngOnInit() {
  this._hs.Get('locations').subscribe((res:any)=>{
    console.log(res);
    if(res.length>0){
      this.locations=res;
    }
    
  })

  

  }

  goto(Input){
    let obj=JSON.stringify(Input);
    this._router.navigate([`/services/${obj}`]);
  }

}
