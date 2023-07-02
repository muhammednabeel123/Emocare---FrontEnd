import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Emitter } from '../emitters/emitter';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';




interface Slot {
  startTime: string;
  endTime: string;
  booked: boolean;
  expired: boolean;
}

@Component({
  selector: 'app-slot-time',
  templateUrl: './slot-time.component.html',
  styleUrls: ['./slot-time.component.css']
})
export class SlotTimeComponent implements OnInit {
  message:any
servicer:any
slots: any[] = [];
date:any
amSlots: any[] = [];
pmSlots: any[] = [];
showAM: boolean = true;
showPM: boolean = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.User()
    this.services(id)
    this.getSlots();
    this.getDate()
   }
  constructor(private activatedRoute: ActivatedRoute,private userService : UserServiceService,private http:HttpClient ){}

  services(id: any) {
    this.userService.getServicer(id).subscribe((res: any) => {
      this.servicer = res
      console.log(this.servicer);
      
    });
  }
  getSlots() {
    this.http.get<any[]>('http://localhost:5000/slots')
      .subscribe(
        (response) => {
          console.log(response, "this is response");
          
          const amSlots = response.filter(slot => {
            const startTime = moment(slot.startTime, 'hh:mm A');
            return !slot.booked && !slot.expired && startTime.format('A') === 'AM';
          });
          
          const pmSlots = response.filter(slot => {
            const startTime = moment(slot.startTime, 'hh:mm A');
            return !slot.booked && !slot.expired && startTime.format('A') === 'PM';
          });
          
          this.amSlots = amSlots;
          this.pmSlots = pmSlots;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  

  User(){
    this.userService.getUser().subscribe((res:any)=>{
      console.log(res);
      
      Emitter.authEmitter.emit(true)
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }

  getDate(){
    this.userService.getDate().subscribe((res) =>{  
        console.log(res);
        
      this.date = res.date
    })
    
  }
  toggleAM() {
    this.showAM = !this.showAM;
    this.showPM = false;
  }
  
  togglePM() {
    this.showPM = !this.showPM;
    this.showAM = false;
  }

}
