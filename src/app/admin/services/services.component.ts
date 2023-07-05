import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  console.log(this.services$,"esdas");
  
}

services(){ this.adminService.getService().subscribe((res) => {this.services$ = res ,console.log(res);
})  }  

  addService(){
      this.router.navigate(['/admin/add-services'])
  }

  viewCounselor(id:any){
      

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
