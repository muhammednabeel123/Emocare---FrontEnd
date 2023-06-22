import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicModule } from '@ionic/angular';
import { UserModule } from './user/user.module';



import { ModuleSharedModule } from './shared/shared.module';
import { ServiceNameService } from './auth.service';
import { CounselorModule } from './counselor/counselor.module';
import { AdminModule } from './admin/admin.module';
import { CounsellorsComponent } from './admin/counsellors/counsellors.component';






@NgModule({
  declarations: [
    AppComponent,
    
  
    
   
  ],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    UserModule,
    ModuleSharedModule,
    AdminModule,
    AppRoutingModule,
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ServiceNameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
