import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VideocallComponent } from './videocall/videocall.component';


const routes:Routes =[
    {path:'',component:LoginComponent},
    {path:'sigup',component:SignupComponent },
    {path : 'home',component:HomeComponent },
    {path:'consulting/:id',component:VideocallComponent}
   
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CounseloRoutingModule { }