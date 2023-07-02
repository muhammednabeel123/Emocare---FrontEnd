import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { HomeComponent } from './user/home/home.component';



const routes: Routes = [
  {path:'',loadChildren:()=>import('./user/user.module').then(mod => mod.UserModule)},
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
