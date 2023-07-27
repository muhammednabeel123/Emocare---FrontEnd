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
  constructor(private userService: UserServiceService, private router: Router) {
    this.userService.getAppointmentHistory().subscribe((res)=>{
      Emitter.authEmitter.emit(true)
      this.history = res
      
       })
  }
  
  ngOnInit() {
    
  }


  get totalPages(): number {
  
    if (this.history) {
      return Math.ceil(this.history.length / this.itemsPerPage);
    }
    return 0;
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
