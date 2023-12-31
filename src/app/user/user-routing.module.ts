import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { HomeComponent } from "./home/home.component";
import { VerifyComponent } from "./verify/verify.component";
import { BookingHomeComponent } from "./booking-home/booking-home.component";
import { SlotBookingComponent } from "./slot-booking/slot-booking.component";
import { SlotTimeComponent } from "./slot-time/slot-time.component";
import { SlotPaymentComponent } from "./slot-payment/slot-payment.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { UservideocallComponent } from "./uservideocall/uservideocall.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthUserGuard } from './auth-user.guard';





const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: UserSignupComponent },
    {path:'',component:HomeComponent},
    { path: 'user/:id/verify/:token', component: VerifyComponent },
    {
      path: '', canActivate: [AuthUserGuard],children: [ 
   
        { path: 'booking-home', component: BookingHomeComponent },
        { path: 'slot/:id', component: SlotBookingComponent },
        { path: 'slot/:id/time', component: SlotTimeComponent },
        { path: 'slot/:id/time/book/:index', component: SlotPaymentComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'video_consult/:id', component: UservideocallComponent },
        { path: 'booking-history', component: BookingHistoryComponent },
        { path: 'user-profile', component: UserProfileComponent },
        { path: 'login', redirectTo:'login', pathMatch: 'full' },
       
      ]
    }
  ];
   
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
 
export class UserRoutinMOdule { }

