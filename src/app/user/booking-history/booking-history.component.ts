import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user/user.service.service';
import { Component, OnInit } from '@angular/core';
import { Emitter } from '../emitters/emitter';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  

  currentPage = 1;
  itemsPerPage = 3;
  history:any
  constructor(private userService: UserServiceService, private router: Router) {}
  
  ngOnInit() {
    this.userService.getAppointmentHistory().subscribe((res)=>{
      this.history = res
      
      Emitter.authEmitter.emit(true)
      
    })
  }


  get totalPages(): number {
    return Math.ceil(this.history.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}
