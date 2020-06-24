import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesitesComponent } from './components/servicesites/servicesites.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { VerifyComponent } from './components/verify/verify.component';


const routes: Routes = [
  {path:'',component:LocationsComponent},
  {path:'services/:location',component:ServicesitesComponent},
  {path:'reservation/:reserve',component:ReservationComponent},
  {path:'verify/:reserve',component:VerifyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
