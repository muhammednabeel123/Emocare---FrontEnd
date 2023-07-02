import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Slot {
  startTime: string;
  endTime: string;
  booked: boolean;
  expired: boolean;
}
@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent {
  

  slots: Slot[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSlots();
  }

  getSlots() {
    this.http.get<any[]>('http://localhost:5000/slots')
    .subscribe(
      (response) => {
        this.slots = response.filter(slot => !slot.booked && !slot.expired);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  bookSlot(slot: Slot) {
    this.http.post(`http://localhost:5000/book/${this.slots.indexOf(slot)}`, {})
      .subscribe(response => {
        console.log(response);
        this.getSlots();
      }, error => {
        console.error("thisssa",error);
      });
  }
}
