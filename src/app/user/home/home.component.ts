import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from '../emitters/emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message:any
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get('http://localhost:5000/user',{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.message = `Hi ${res.name}`
      Emitter.authEmitter.emit(true)
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }

}
