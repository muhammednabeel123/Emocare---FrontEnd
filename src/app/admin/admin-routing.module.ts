import { DashboardComponent } from './dashboard/dashboard.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { CustomersComponent } from './customers/customers.component';
import { CounsellorsComponent } from './counsellors/counsellors.component';
import { ViewCounselorComponent } from './view-counselor/view-counselor.component';


const routes:Routes =[{
    path:'admin',component:LoginComponent},
    {path:'admin',children:[
        {path:'dashboard',component:DashboardComponent},
        {path:'counselor',component:CounsellorsComponent},
        {path:'view-counselor/:id',component:ViewCounselorComponent},
        {path:'customers',component:CustomersComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminRoutingModule { }