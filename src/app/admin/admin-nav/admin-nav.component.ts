import { Router } from '@angular/router';
import { AdminService } from './../admin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  constructor(private router:Router,private AdminService:AdminService ){}

  logout(){
    console.log("cookiis");
    
    this.AdminService.Logout().subscribe((res)=>console.log(res)
    ,(err)=>{console.log(err);
    })
  }
}