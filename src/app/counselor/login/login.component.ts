import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router : Router
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
    this.http.post("http://localhost:5000/counselor/login", this.LoginForm.value, { withCredentials: true })
      .subscribe(
        (res) => {
          console.log(res, "logged");
        },
        (err) => {
          console.log(err, "logged");
          this.showAlert = true;
          this.alertMsg = err.error.message;
          this.alertColor = 'red';
        }
      );
  }
  

}
