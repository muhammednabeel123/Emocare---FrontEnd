import { LoginResponse } from './../../user/user-signup/interface/message';

import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private adminService :AdminService, private router:Router){}

  ngOnInit(): void {
    this.adminService.getCookie().subscribe((res) => {
      console.log(res);
      if (res.isAuthenticated) {
        this.router.navigate(['/admin/dashboard']); // Redirect to another route if authenticated
      }
    });
  }
  
  showAlert = false;
  alertMsg = 'Please! You are beign logged.';
  alertColor = 'blue';


  credentials = {
    email: '',
    password:''
  }
  login(){
    this.showAlert = true;
    this.alertMsg = 'Please! Your beign logged';
    this.alertColor = 'blue';

    this.adminService.login(this.credentials).subscribe((res:any) => {
      if (res.message) {
     
        this.router.navigate(['/admin/dashboard']);
      } else {
        console.log("Invalid credentials.");
        this.showAlert = true;
        this.alertMsg = 'Invalid credentials';
        this.alertColor = 'red';
        this.router.navigate(['/admin']);
      }
    
        
    },(err) => {
      this.showAlert = true;
      this.alertMsg = err.message;
      this.alertColor = 'red'
    })
     
      
      }
      
    

  
    
    
  }



