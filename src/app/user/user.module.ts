import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    UserSignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    UserSignupComponent
  ]
})
export class UserModule { }
