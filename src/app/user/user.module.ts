import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleSharedModule } from "../shared/shared.module";
import { UserRoutinMOdule } from './user-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { VerifyComponent } from './verify/verify.component';
import { NavComponent } from '../nav/nav.component';
 





@NgModule({
    declarations: [
        LoginComponent,
        UserSignupComponent,
        HomeComponent,
        VerifyComponent,
        NavComponent,
    ],
    exports: [
        LoginComponent,
        UserSignupComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModuleSharedModule,
        UserRoutinMOdule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ]
})
export class UserModule { }
