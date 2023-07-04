import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleSharedModule } from "../shared/shared.module";
import { UserRoutinMOdule } from './user-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { VerifyComponent } from './verify/verify.component';
import { NavComponent } from '../nav/nav.component';
import { BookingHomeComponent } from './booking-home/booking-home.component';
import { UserInterceptorInterceptor } from './user-interceptor.interceptor';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlotTimeComponent } from './slot-time/slot-time.component';
import { SlotPaymentComponent } from './slot-payment/slot-payment.component';

 





@NgModule({
    declarations: [
        LoginComponent,
        UserSignupComponent,
        HomeComponent,
        VerifyComponent,
        NavComponent,
        BookingHomeComponent,
        SlotBookingComponent,
        SlotTimeComponent,
        SlotPaymentComponent,
    ],
    exports: [
        LoginComponent,
        UserSignupComponent,
        
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModuleSharedModule,
        UserRoutinMOdule,
        HttpClientModule,
        NgxPaginationModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
      
    ],
    providers:[
        {provide:HTTP_INTERCEPTORS,useClass:UserInterceptorInterceptor,multi:true}
    ]
})
export class UserModule { }
