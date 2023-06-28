import { SignupComponent } from '../counselor/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounseloRoutingModule } from './counselor-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModuleSharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CounseloRoutingModule,
    FormsModule,
    ModuleSharedModule,
    ReactiveFormsModule
    
    

    
  ]
})
export class CounselorModule { }
