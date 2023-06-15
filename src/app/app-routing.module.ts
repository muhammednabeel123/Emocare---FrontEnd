import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:UserSignupComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
