import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesitesComponent } from './components/servicesites/servicesites.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationsComponent } from './components/locations/locations.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FormsModule } from '@angular/forms';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesitesComponent,
    LocationsComponent,
    ReservationComponent,
    VerifyComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxQRCodeModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
