import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services$:any
  currentPage = 1;
  itemsPerPage = 3;

  constructor( private router : Router,private adminService:AdminService){}

ngOnInit(): void {
  this.services()

  
}

services(){ this.adminService.getService().subscribe((res) => {this.services$ = res ,console.log(res);
})  }  

  addService(){
      this.router.navigate(['/admin/add-services'])
  }

  ListCounselor(id: string) {
    // Show the confirmation dialog
    Swal.fire({
      title: 'List Service  ',
      text: 'Are you sure you want to list the counselor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, list it!'
    }).then((result) => {
      // If the user confirms, call the listing service
      if (result.isConfirmed) {
        this.adminService.ListingService(id).subscribe(
          (res) => {
            // Show success message if the response is successful
            Swal.fire({
              title: 'Success!',
              text: 'Service listed successfully.',
              icon: 'success'
            });
            this.ngOnInit()
          },
          (error) => {
            console.error(error);
            // Show error message if the response is unsuccessful
            Swal.fire({
              title: 'Error!',
              text: 'Failed to list the counselor.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  
  unListCounselor(id: string) {
    // Show the confirmation dialog
    Swal.fire({
      title: 'Unlist Service',
      text: 'Are you sure you want to unlist the Service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unlist it!'
    }).then((result) => {
      // If the user confirms, call the unlisting service
      if (result.isConfirmed) {
        this.adminService.unListingService(id).subscribe(
          (res) => {
            // Show success message if the response is successful
            Swal.fire({
              title: 'Success!',
              text: 'Counselor unlisted successfully.',
              icon: 'success'
            });
       this.ngOnInit()
          },
          (error) => {
            console.error(error);
            // Show error message if the response is unsuccessful
            Swal.fire({
              title: 'Error!',
              text: 'Failed to unlist the Service.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  
  
  get totalPages(): number {
    return Math.ceil(this.services$.length / this.itemsPerPage);
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
