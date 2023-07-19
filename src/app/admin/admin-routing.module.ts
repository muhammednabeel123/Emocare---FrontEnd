import { DashboardComponent } from './dashboard/dashboard.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { CustomersComponent } from './customers/customers.component';
import { CounsellorsComponent } from './counsellors/counsellors.component';
import { ViewCounselorComponent } from './view-counselor/view-counselor.component';
import { NewCounselorComponent } from './new-counselor/new-counselor.component';
import { ServicesComponent } from './services/services.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { AppointmentsComponent } from './appointments/appointments.component';



const routes: Routes = [
    {
      path: 'admin',
      component: LoginComponent
    },
    {
      path: 'admin',
      canActivate: [AuthGuardGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'counselor', component: CounsellorsComponent },
        { path: 'view-counselor/:id', component: ViewCounselorComponent },
        { path: 'customers', component: CustomersComponent },
        { path: 'new-counselor', component: NewCounselorComponent },
        { path: 'services', component: ServicesComponent },
        { path: 'add-services', component: AddServicesComponent },
        { path:'Appointments',component:AppointmentsComponent }
      ]
    }
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminRoutingModule { }