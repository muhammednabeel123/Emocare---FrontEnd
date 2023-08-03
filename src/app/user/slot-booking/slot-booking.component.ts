import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { getServicer } from '../userState/user.interface';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent {
constructor(private http: HttpClient,private userService : UserServiceService,private activatedRoute: ActivatedRoute,private router: Router ) {}


message:string
servicer:getServicer

ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.User()
    this.services(id)
  }

  services(id: string | null) {this.userService.getServicer(id).subscribe((res: getServicer) => {this.servicer = res },
      (error) => {if (error.status === 500) {this.router.navigate(['/500']); } else {
          console.log('Other error occurred:', error);
        }
      }
    );
  }

  User(){
    this.userService.getUser().subscribe((res:User)=>{   
    },(err)=>{
      this.message = 'you are no authenticated'
     
    })
  }

  bookingTime(id:string | undefined){
     this.router.navigate([`/slot/${id}/time`])
  }


 }
