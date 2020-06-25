import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-servicesites',
  templateUrl: './servicesites.component.html',
  styleUrls: ['./servicesites.component.css']
})
export class ServicesitesComponent implements OnInit {
  @Input('location')
  public location: any;
  public statistics:any[]=[];
  services: any[]=[];
  constructor(private _hs: HttpService, private _ss: ShareService, private _ar: ActivatedRoute,
    private _router: Router) { 
      this._ar.params.subscribe(params => (this.location = JSON.parse(params["location"])));

    }

  ngOnInit() {
    this.getServices();
  }

  getServices(){
    this._hs.DoOperation({method:'groupservices',where:'locationsid,eq,'+this.location.id+'^dateofapp,eq,'+formatDate(Date.now(),"yyyy-MM-dd","en")}).subscribe((res:any)=>{
      if(res.length>0){
        this.statistics=res;
        console.log(this.statistics);
        
      }
    })

    this._hs.Get('services','locationsid,eq,'+this.location.id).subscribe((res:any)=>{
      console.log(res);
      if(res.length>0){
        this.services=res;

        
      }
      
    })
  }


  routeto(Input){
    Input.locationname=this.location.name;
    let obj=JSON.stringify(Input);
    this._router.navigate([`/reservation/${obj}`]);
  }
  verify(Input){
    Input.locationname=this.location.name;
    let obj=JSON.stringify(Input);
    this._router.navigate([`/verify/${obj}`]);
  }

}
