import { SignupComponent } from '../counselor/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounseloRoutingModule } from './counselor-routing.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    CounseloRoutingModule,
    FormsModule
    
    

    
  ]
})
export class CounselorModule { }
