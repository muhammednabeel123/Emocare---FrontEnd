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


}
