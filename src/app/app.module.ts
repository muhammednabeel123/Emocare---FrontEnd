import { Appointment } from './admin/adminState/adminInterface';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicModule } from '@ionic/angular';
import { UserModule } from './user/user.module';



import { ModuleSharedModule } from './shared/shared.module';
import { CounselorModule } from './counselor/counselor.module';
import { AdminModule } from './admin/admin.module';
import { CounsellorsComponent } from './admin/counsellors/counsellors.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/userState/user.effects';
import { UserReducer } from './user/userState/user.reducer';
import { AppointmentReducer } from './admin/adminState/admin.reducer';
import { adminEffect } from './admin/adminState/admin.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { NotFoundErrorComponent } from './error/not-found-error/not-found-error.component';
import { UserServiceService } from './user/user.service.service';








@NgModule({
  declarations: [
    AppComponent,
    ServerErrorComponent,
    NotFoundErrorComponent,
    
  
    
   
  ],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    UserModule,
    ModuleSharedModule,
    AdminModule,
    AppRoutingModule,
    CounselorModule,
    StoreModule.forRoot({ User: UserReducer, allAppointment: AppointmentReducer }),
    EffectsModule.forRoot([UserEffects,adminEffect])
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
