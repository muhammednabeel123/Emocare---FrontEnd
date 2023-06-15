import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleSharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [
        LoginComponent,
        UserSignupComponent
    ],
    exports: [
        LoginComponent,
        UserSignupComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModuleSharedModule
    ]
})
export class UserModule { }
