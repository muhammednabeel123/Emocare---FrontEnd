import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
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
  }

  updateButtonColor(): void {
    if (this.terms.value) {
      this.alertColor = 'red';
    } else {
      this.alertColor = 'blue';
    }
  }
}
