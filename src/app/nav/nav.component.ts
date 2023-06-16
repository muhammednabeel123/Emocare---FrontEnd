import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from '../user/emitters/emitter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private http: HttpClient){}
  isMenuOpen: boolean = false;
  authenticated = false

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
}
logout():void{
  this.http.post('http://localhost:5000/logout',{},{withCredentials:true}).subscribe(() => this.authenticated = false)
}

  
}
