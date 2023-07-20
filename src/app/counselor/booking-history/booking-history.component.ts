import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { CounselorService } from '../counselor.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent {
  currentPage = 1;
  itemsPerPage = 3;
  history:any
  constructor(private counselorService: CounselorService, private router: Router) {}
  ngOnInit() {
    this.counselorService.getAppointmentHistory().subscribe((res)=>{
      this.history = res
      
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
