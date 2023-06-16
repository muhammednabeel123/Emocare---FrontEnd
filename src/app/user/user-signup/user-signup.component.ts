import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  constructor(private http:HttpClient,private router:Router,){}


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

  register(): void {
    this.showAlert = true;
    this.alertMsg = 'Please! Your Account is being created.';
    this.alertColor = 'blue';
    this.http.post("http://localhost:5000/register",this.registerForm.value,{withCredentials:true}).subscribe(()=>
      this.router.navigate(['/']),(err)=>{ 
        this.showAlert = true;
        this.alertMsg = err.error.message ;
        this.alertColor = 'red';
       })
    

  }

  updateButtonColor(): void {
    if (this.terms.value) {
      this.alertColor = 'red';
    } else {
      this.alertColor = 'blue';
    }
  }
}
