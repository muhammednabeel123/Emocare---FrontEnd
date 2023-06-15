import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

    registerForm = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl(''),
      password : new FormControl('')

    })
}
