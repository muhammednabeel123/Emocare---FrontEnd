import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Emitter } from '../emitters/emitter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import { MyApiResponse, getServicer } from '../userState/user.interface';




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

message:string
servicer:getServicer
selectedTime:any
slots: any[] = [];
date:Date
amSlots: any[] = [];
pmSlots: any[] = [];
showAM: boolean = true;
showPM: boolean = false;
id:string | null
slotIndex:any
optionalParam:String | null

constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, private http: HttpClient, private router: Router) {}



isAnySlotSelected(): boolean {
  return (
    (this.amSlots && this. amSlots.some(slot => slot.selected)) ||
    (this.pmSlots && this.pmSlots.some(slot => slot.selected))
  );
}

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
       this.optionalParam = queryParamMap.get('optionalParam');

    });
     
     this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
     
    this.User()
    this.services(this.id)
    this.getSlots();
    this.getDate()
  
   }
  

   services(id: string| null) {
    const servicerId: string | null = id !== undefined ? id : null;
    this.userService.getServicer(servicerId).subscribe(
      (res: getServicer) => {
        this.servicer = res;
       
      },
      (error) => {
        if (error.status === 500) {
          this.router.navigate(['/500']);
        } else {
          console.log('Other error occurred:', error);
        }
      }
    );
  }

  getSlots() {
    this.http.get<any[]>(`${environment.user_api}/slots`)
      .subscribe(
        (response) => {
        
  
          this.slots = response; 
          
  
          const amSlots = this.slots.filter(slot => {
            const startTime = moment(slot.startTime, 'hh:mm A');
            const currentTime = moment();
            if (startTime.isBefore(currentTime)) {
              slot.expired = true; 
            }
            return !(slot.servicer === this.id) && startTime.format('A') === 'AM';
          });
          
  
          const pmSlots = this.slots.filter(slot => {
            const startTime = moment(slot.startTime, 'hh:mm A');
            
            const currentTime = moment();
            if (startTime.isBefore(currentTime)) {
              slot.expired = true; 
            }
          
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
  
  
  
  

  User(){this.userService.getUser()}

  getDate() {this.userService.getDate().subscribe((res) => {this.date = res.date});}

  toggleAM() {
    this.showAM = !this.showAM;
    this.showPM = false;
  }
  
  togglePM() {
    this.showPM = !this.showPM;
    this.showAM = false;
  }

  selectSlot(slot: any,id:string | undefined) {
    slot.selected = !slot.selected;
    
    this.amSlots.forEach(s => (s.selected = false));
    this.pmSlots.forEach(s => (s.selected = false));
    slot.selected = true;
    this.slotIndex = this.slots.indexOf(slot);
 
    console.log('Selected slot:', JSON.stringify(slot));
    this.selectedTime = slot;
   
  }
 
  
  submit(){
    const encodedSelectedTime = btoa(JSON.stringify(this.selectedTime));
    this.router.navigate([`/slot/${this.id}/time/book/${this.slotIndex}`], {
      queryParams: {
        times: encodedSelectedTime,
        optionalParam: this.optionalParam 
      }
    });
  }
  }



