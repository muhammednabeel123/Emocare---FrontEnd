import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


const routes:Routes =[
    {path:'counselor-signup',component:SignupComponent },
    {path:'counselor-login',component:LoginComponent}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CounseloRoutingModule { }