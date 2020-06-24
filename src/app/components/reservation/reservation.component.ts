import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input('reserve')
  public reserve: any={};
  @ViewChild("date",{static:false})
  public date2: any;
  public statistics:any[]=[];
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string ;
  public request: any={};
  constructor(private _hs: HttpService, private _ss: ShareService, private _ar: ActivatedRoute,
    private _router: Router) { 
      this._ar.params.subscribe(params => (this.reserve = JSON.parse(params["reserve"])));

    }

  ngOnInit() {
  }

  save(){
    this._hs.DoOperation({method:'groupservices',where:'servicesid,eq,'+this.reserve.id+'^dateofapp,eq,'+formatDate(this.request.dateofapp,"yyyy-MM-dd","en")}).subscribe((res:any)=>{
      if(res.length>0){
        console.log(res);
        
       let count=res[0].count;
       let maxapps=res[0].maxapps;
       if(count<maxapps||count==null){
         this._hs.Post('orders',{fullname:this.request.fullname,
          locationsid:this.reserve.locationsid,dateofapp:formatDate(this.request.dateofapp,"yyyy-MM-dd","en"),
        phonenumber:this.request.phonenumber,nationalnumber:this.request.nationalnumber,servicesid:this.reserve.id}).subscribe((res:any)=>{
           console.log(res);
           if(res>0){
            console.log(res);

             this.value=res[0]+this.request.phonenumber;
           }
           else{
            alert('لا يمكن عمل الحجز مرتين بنفس الرقم');
          }
         })}

        
      }
      else {
        // this._hs.Post('orders',{fullname:this.request.fullname,
        //   locationsid:this.reserve.locationsid,dateofapp:formatDate(this.request.dateofapp,"yyyy-MM-dd","en"),
        // phonenumber:this.request.phonenumber,nationalnumber:this.request.nationalnumber,servicesid:this.reserve.id}).subscribe((res:any)=>{
        //      this.value=res[0]+this.request.phonenumber;
        //      console.log(res);
        //    if(res>0){
        //     console.log(res);

        //      this.value=res[0]+this.request.phonenumber;
        //    }
           
        //  })
        alert('تم تجاوز الحد الأقصى');
      }
    
  
      
    })


  //   this._hs.DoOperation({method:"save",body:{fullname:this.request.fullname,
  //     locationsid:this.reserve.locationsid,dateofapp:formatDate(this.request.dateofapp,"yyyy-MM-dd","en"),
  //   phonenumber:this.request.phonenumber,nationalnumber:this.request.nationalnumber,servicesid:this.reserve.servicesid},
  // where:"servicesid,eq,"+this.reserve.id+'^dateofapp,eq,'+formatDate(this.request.dateofapp,"yyyy-MM-dd","en")}).subscribe((res:any)=>{
  //   console.log(res);
    
  // })
    
  }
home(){
  this._router.navigate([`/`]);

}
  showReservations(){
    console.log("hehe");

    if(this.request.dateofapp==undefined){
      return;
    }
    
    this._hs.DoOperation({method:'groupservices',where:'servicesid,eq,'+this.reserve.id+'^dateofapp,eq,'+formatDate(this.request.dateofapp,"yyyy-MM-dd","en")}).subscribe((res:any)=>{
      if(res.length>0){
        this.statistics=res;
        console.log(this.statistics);
        
      }
      else{
        this.statistics=[];
      }
    })
  }
}
