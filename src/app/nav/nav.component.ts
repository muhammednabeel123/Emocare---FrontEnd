import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from '../user/emitters/emitter';
import { ActivatedRoute } from '@angular/router'; 
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router ){}
  isMenuOpen: boolean = false;
  authenticated = false
  showNavBar: boolean = true;


  toggleNavbar() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
ngOnInit(): void {
  Emitter.authEmitter.subscribe((auth:boolean)=>{
    
    this.authenticated = auth
    console.log(this.authenticated);
    
  })
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      const url: string = event.url;
    
      if (url.includes('/verify')) {
        this.showNavBar = false; 
      } else {
        this.showNavBar = true;
      }
    }
  });
}

logout(): void {
  this.http.post(`${environment.user_api}/logout`, {}, { withCredentials: true }).subscribe(
    () => {
      localStorage.removeItem('userToken');
      this.authenticated = false;
      this.router.navigate(['/']);
    },
    (err) => {
      console.log('Error during logout:', err);
      localStorage.removeItem('userToken');
      this.authenticated = false;
      this.router.navigate(['/']);
    }
  );
}



  
}
