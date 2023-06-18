import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from '../user/emitters/emitter';
import { ActivatedRoute } from '@angular/router'; 
import { Router, NavigationEnd } from '@angular/router';


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
logout():void{
  this.http.post('http://localhost:5000/logout',{},{withCredentials:true}).subscribe(() => this.authenticated = false)
}

  
}
