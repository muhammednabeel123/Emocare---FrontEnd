import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/user/user.service.service';
import { CounselorService } from '../counselor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-nav',
  templateUrl: './c-nav.component.html',
  styleUrls: ['./c-nav.component.css']
})
export class CNavComponent {
  constructor(private http: HttpClient,private counselorService:CounselorService,private router : Router ){}
  isMenuOpen: boolean = false;
  authenticated = false
  showNavBar: boolean = true;


  toggleNavbar() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout(): void {
    this.counselorService.logOut().subscribe(() => {
      localStorage.removeItem('CToken');
      this.router.navigate(['/counselor']);
    });
  }
  
  

}
