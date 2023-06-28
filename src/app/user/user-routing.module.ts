import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { HomeComponent } from "./home/home.component";
import { VerifyComponent } from "./verify/verify.component";
import { BookingHomeComponent } from "./booking-home/booking-home.component";



const routes: Routes = [
    
    {path:'login',component:LoginComponent},
    {path:'sign-up',component:UserSignupComponent},
    {path:'user/:id/verify/:token',component:VerifyComponent},
    {path:'booking-home',component:BookingHomeComponent }

   ];
   
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
 
export class UserRoutinMOdule { }

