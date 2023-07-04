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
selectedTime:any
slots: any[] = [];
date:any
amSlots: any[] = [];
pmSlots: any[] = [];
showAM: boolean = true;
showPM: boolean = false;
id:any
slotIndex:any

  ngOnInit(): void {
     this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
     
    this.User()
    this.services(this.id)
    this.getSlots();
    this.getDate()
  
   }
  constructor(private activatedRoute: ActivatedRoute,private userService : UserServiceService,private http:HttpClient, private router : Router ){}

  services(id: any) {
    this.userService.getServicer(id).subscribe((res: any) => {
      this.servicer = res

      
    });
  }
  getSlots() {
    this.http.get<any[]>('http://localhost:5000/slots')
      .subscribe(
        (response) => {
          console.log(response, "this is response");
  
          this.slots = response; 
          
        
          
          const amSlots = this.slots.filter(slot => {
            const startTime = moment(slot.startTime, 'hh:mm A');
            return !(slot.servicer === this.id) && startTime.format('A') === 'AM';
          });
          
  
          const pmSlots = this.slots.filter(slot => {
            const startTime = moment(slot.startTime, 'hh:mm A');
            return !(slot.servicer === this.id) && startTime.format('A') === 'PM';
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

  selectSlot(slot: any,id:any) {
    slot.selected = !slot.selected;
    // Perform actions with the selected slot
    console.log(id);
    
    console.log('Selected slot:', JSON.stringify(slot));
     this.selectedTime = slot;
   
  }
  bookSlot(slot: any) {
     this.slotIndex = this.slots.indexOf(slot);
 
     
    // this.http.post(`http://localhost:5000/book/${slotIndex}`, {})
    //   .subscribe(response => {
    //     console.log(response);
    //     this.getSlots();
    //   }, error => {
    //     console.error("Error booking slot:", error);
    //   });
  }
  
  submit(){
    console.log(this.id, "t", JSON.stringify(this.selectedTime));
    const encodedSelectedTime = btoa(JSON.stringify(this.selectedTime));

    this.router.navigate([`/slot/${this.id}/time/book/${this.slotIndex}`], { queryParams: { times: encodedSelectedTime } });
  }



}
