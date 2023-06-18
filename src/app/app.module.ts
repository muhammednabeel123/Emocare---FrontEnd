import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicModule } from '@ionic/angular';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';

import { ModuleSharedModule } from './shared/shared.module';
import { ServiceNameService } from './auth.service';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
   
  ],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    UserModule,
    ModuleSharedModule,
    AppRoutingModule,
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ServiceNameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
