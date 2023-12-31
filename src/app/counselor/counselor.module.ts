import { SignupComponent } from '../counselor/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounseloRoutingModule } from './counselor-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModuleSharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { CNavComponent } from './c-nav/c-nav.component';
import { VideocallComponent } from './videocall/videocall.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';





@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CNavComponent,
    VideocallComponent,
    ProfileComponent,
    BookingHistoryComponent,
    

  ],
  imports: [
    CommonModule,
    CounseloRoutingModule,
    FormsModule,
    ModuleSharedModule,
    ReactiveFormsModule,
    
    
    
    
    

    
  ]
})
export class CounselorModule { }
