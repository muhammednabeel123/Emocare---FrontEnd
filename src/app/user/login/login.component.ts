import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '../user-signup/interface/message';
import { Subscription } from 'rxjs';

import { UserServiceService } from '../user.service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.router.navigate(['/booking-home']);
    }
  }

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
      
        if (res.message === 'Forbidden' || res.message === 'Password is incorrect') {
          this.showAlert = true;
          this.alertMsg = res.message ;
          this.alertColor = 'red';
        } else {
          localStorage.setItem('userToken',res.token)
          this.router.navigate(['/booking-home']);
        }
      },
      (err) => {
        this.showAlert = true;
        this.alertMsg = err.error.message;
        this.alertColor = 'red';
      }
    );
  }
  
  googleSign() {
    this.userService.GoogleAuth().then((res) => {
      const data = {
        credential: res,
      };
  
      this.userService.googleSignIN(data).subscribe((result: any) => {    
        if (result.status) {
          localStorage.setItem('userToken', result.token);
          this.router.navigate(['/']);
        } else {
          this.showAlert = true;
          this.alertMsg = result.message;
          this.alertColor = 'red';
          localStorage.setItem('userToken', result.token);
          this.router.navigate(['/']);
        }
      }, (error: any) => {
        // Handle error if needed
      });
    }).catch((error: any) => {
      // Handle error if needed
    });
  }
  

  
    

   
      
  }


 


