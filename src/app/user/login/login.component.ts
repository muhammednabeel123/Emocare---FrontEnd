import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '../user-signup/interface/message';
import { UserServiceService } from '../user.service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private router : Router,
    private userService:UserServiceService
  ){}
 
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required,
    
  ]);
  showAlert = false;
  alertMsg = 'Please! Your Account is being created.';
  alertColor = 'blue';

  LoginForm = new FormGroup({
 
    email: this.email,
    password: this.password,
   
  });

  login(): void {
    this.showAlert = true;
    this.alertMsg = 'Please! You are being logged';
    this.alertColor = 'blue';
  
    this.userService.login(this.LoginForm.value).subscribe(
      (res: any) => {
        console.log(res,"anything");
        
      
        if (res.message === 'Forbidden') {
          this.showAlert = true;
          this.alertMsg = 'You are temporarily blocked';
          this.alertColor = 'red';
        } else {
          localStorage.setItem('userToken',res.token)
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.showAlert = true;
        this.alertMsg = 'something went wrong';
        this.alertColor = 'red';
      }
    );
  }
  
  
    

   
      
  }


 


