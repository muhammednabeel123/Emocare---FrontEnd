import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleSharedModule } from "../shared/shared.module";
import { UserRoutinMOdule } from './user-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component'

import { environment } from 'src/environments/environment.development';

import { VerifyComponent } from './verify/verify.component';
import { NavComponent } from './nav/nav.component';
import { BookingHomeComponent } from './booking-home/booking-home.component';

import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { SlotTimeComponent } from './slot-time/slot-time.component';
import { SlotPaymentComponent } from './slot-payment/slot-payment.component';
import { UservideocallComponent } from './uservideocall/uservideocall.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

 





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
        UservideocallComponent,
        AppointmentsComponent,
        BookingHistoryComponent,
        UserProfileComponent,
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
        FormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),//intialize our firebase config from environment
        provideFirestore(() => getFirestore()),
    
        


      
    ],
    providers:[
    ]
})
export class UserModule { }
