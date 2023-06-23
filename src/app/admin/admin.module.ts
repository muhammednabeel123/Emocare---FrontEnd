import { CounsellorsComponent } from './counsellors/counsellors.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { environment } from 'src/environments/environment';
import { ModuleSharedModule } from '../shared/shared.module';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { ViewCounselorComponent } from './view-counselor/view-counselor.component';






@NgModule({
  declarations: [
    
    LoginComponent,
         DashboardComponent,
         CustomersComponent,
         AdminNavComponent,
         CounsellorsComponent,
         ViewCounselorComponent
      
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ModuleSharedModule
  ]
})
export class AdminModule { }
