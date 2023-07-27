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
    const userToken = localStorage.getItem('CToken');
    if (userToken) {
      this.counselorService.getAppointmentHistory().subscribe(
        (res) => {
          this.history = res;
        },
        (error) => {
          console.error('Error fetching appointment history:', error);
        }
      );
    } else {
      console.error('User token not found in local storage.');
    }
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
