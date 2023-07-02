import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { HomeComponent } from "./home/home.component";
import { VerifyComponent } from "./verify/verify.component";
import { BookingHomeComponent } from "./booking-home/booking-home.component";
import { SlotBookingComponent } from "./slot-booking/slot-booking.component";
import { SlotTimeComponent } from "./slot-time/slot-time.component";



const routes: Routes = [
    
    {path:'login',component:LoginComponent},
    {path:'',component:HomeComponent},
    {path:'sign-up',component:UserSignupComponent},
    {path:'user/:id/verify/:token',component:VerifyComponent},
    {path:'booking-home',component:BookingHomeComponent },
    {path:'slot/:id',component:SlotBookingComponent},
    {path:'slot/:id/time',component:SlotTimeComponent}

   ];
   
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
 
export class UserRoutinMOdule { }

