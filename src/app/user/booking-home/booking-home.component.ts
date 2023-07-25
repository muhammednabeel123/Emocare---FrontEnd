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
  Docters = '649842b7a6c9977f197ccfed'; 
  Fitness = '64983199fe52376aa4502fa0'
  therapist = '649833882629f63a73adab60'
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




}
