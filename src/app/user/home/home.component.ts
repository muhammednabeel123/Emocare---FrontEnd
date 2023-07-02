import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from '../emitters/emitter';
import { UserServiceService } from '../user.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  message:any
  constructor(private http:HttpClient,private userService:UserServiceService){}
  ngOnInit(): void {
    this.userService.getUser().subscribe((res:any)=>{
      
      Emitter.authEmitter.emit(true)
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }

}
