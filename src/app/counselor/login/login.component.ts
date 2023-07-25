import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CounselorService } from '../counselor.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router : Router,
    private counselorService : CounselorService
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
    this.counselorService.login(this.LoginForm.value)
      .subscribe(
        (res) => {
          if (res.message === 'Forbidden') {
            this.showAlert = true;
            this.alertMsg = 'You are temporarily blocked';
            this.alertColor = 'red';
          } else {
            localStorage.setItem('CToken',res.token)
            this.router.navigate(['/counselor/home']);
          }
        },
        (err) => {
          this.showAlert = true;
          this.alertMsg = err.error.message;
          this.alertColor = 'red';
        }
      );
  }
  

}
