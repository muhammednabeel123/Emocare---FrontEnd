import { RegisterResponse } from './interface/registerForm';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  
  ngOnInit(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      this.router.navigate(['/booking-home']);
    }
  }
  
  constructor(private http:HttpClient,private router:Router ){}
  token:any
  userId:any

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);

  age = new FormControl(false, Validators.requiredTrue);
  terms = new FormControl(false, Validators.requiredTrue);

  showAlert = false;
  alertMsg = 'Please! Your Account is being created.';
  alertColor = 'blue';

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    age: this.age,
    terms: this.terms
  });

  // register(): void {
  //   this.showAlert = true;
  //   this.alertMsg = 'Please! Your Account is being created.';
  //   this.alertColor = 'blue';
  //   this.http.post("http://localhost:5000/register",this.registerForm.value,{withCredentials:true}).subscribe((res)=>
  //     console.log(res),(err)=>{ 
  //       this.showAlert = true;
  //       this.alertMsg = err.error.message ;
  //       this.alertColor = 'red';
  //      })
    

  // }
  register(): void {
    this.showAlert = true;
    this.alertMsg = 'Please! Verify Your mail.';
    this.alertColor = 'blue';
    this.http.post<RegisterResponse>("http://localhost:5000/register", this.registerForm.value, { withCredentials: true })
      .subscribe((res: RegisterResponse) => {
        console.log(res, "this is response");
  
        this.token = res.token;
        console.log(this.token, "this is token");
  
        this.userId = res.userId;
        console.log(this.userId, "this is id");
  
        // Registration successful, do not call verifyEmail() here
      }, (err) => {
        this.showAlert = true;
        this.alertMsg = err.error.message;
        this.alertColor = 'red';
      });
  }
  
  
  
  
  updateButtonColor(): void {
    if (this.terms.value) {
      this.alertColor = 'red';
    } else {
      this.alertColor = 'blue';
    }
  }

 
}
