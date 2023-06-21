import { DashboardComponent } from './dashboard/dashboard.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CounselorsComponent } from './counselors/counselors.component';
import { CustomersComponent } from './customers/customers.component';

const routes:Routes =[{
    path:'admin',component:LoginComponent},
    {path:'admin',children:[
        {path:'dashboard',component:DashboardComponent},
        {path:'counselors',component:CounselorsComponent},
        {path:'customers',component:CustomersComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminRoutingModule { }