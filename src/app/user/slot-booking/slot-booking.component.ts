import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent {
  



  constructor(private http: HttpClient,private userService : UserServiceService,private activatedRoute: ActivatedRoute,
    private router: Router ) {}
message:any
servicer:any
  ngOnInit() {
   
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.User()
    this.services(id)
  }

  services(id: any) {
    this.userService.getServicer(id).subscribe(
      (res: any) => {
        this.servicer = res;
        console.log(this.servicer);
      },
      (error: any) => {
        if (error.status === 500) {
          // Handle the 500 error and navigate to another page
          this.router.navigate(['/500']);
        } else {
          console.log('Other error occurred:', error);
        }
      }
    );
  }

  User(){
    this.userService.getUser().subscribe((res:any)=>{
      console.log(res);
      
      Emitter.authEmitter.emit(true)
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }

  bookingTime(id:any){
     this.router.navigate([`/slot/${id}/time`])
  }


 }
