import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.css']
})
export class BookingHomeComponent implements OnInit {
  counselors: any[] = [];
  Docters = '64c0fe419299d39550938fcb'; 
  Fitness = '64c2cb4faacd600d86b411cf'
  therapist = '64c2cbb5aacd600d86b411d2'
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 2; 

  message:any
  ngOnInit(): void {
    this.userService.getUser().subscribe((res:any)=>{
      
      Emitter.authEmitter.emit(true)
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }
   isClicked: string | null = null;

   constructor(private http:HttpClient, private userService:UserServiceService,private router: Router){}
   getServices(id: string) {
    this.userService.getServiceById(id)
      .subscribe(
        (response) => {
          this.counselors = response.filter((service: any) => !service.is_Blocked &&  service.is_Available );
          this.totalItems = this.counselors.length;
          this.isClicked = id === this.isClicked ? null : id; 
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
// onPageChange(pageNumber: number): void {
//   this.currentPage = pageNumber;
// }

BookId(id:any){
  console.log(id);
  this.router.navigate(['/slot',id]);
  
}
handleButtonClick(): void {
this.router.navigate(['/'])
}




}
