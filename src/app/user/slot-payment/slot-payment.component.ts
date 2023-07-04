import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-slot-payment',
  templateUrl: './slot-payment.component.html',
  styleUrls: ['./slot-payment.component.css']
})
export class SlotPaymentComponent implements OnInit {
  constructor(private userService:UserServiceService,private activatedRoute: ActivatedRoute,private http: HttpClient){}
  message:any
  servicer:any
  time:any
  index:any
  userid:any
  
  ngOnInit(): void {   
    const id = this.activatedRoute.snapshot.paramMap.get('id');
     this.index = this.activatedRoute.snapshot.paramMap.get('index');
      this.activatedRoute.queryParamMap.subscribe(params => {
      const times = params.get('times');
      if (times !== null) {
         this.time = JSON.parse(atob(times));
  
        console.log('Times:', this.time);}});
    
    this.User()
    this.services(id)
    
}
submit() {
  this.http.post(`http://localhost:5000/book/${this.index}/${this.servicer._id}/${this.userid}`, {})
    .subscribe(response => {
      console.log(response);
      Swal.fire('Success', 'Your appointment is successfully booked!', 'success');
    }, error => {
      console.error("Error booking slot:", error);
    });
}


  services(id: any) {
    this.userService.getServicer(id).subscribe((res: any) => {
      this.servicer = res

      
    });
  }
  User(){
    this.userService.getUser().subscribe((res:any)=>{
      this.userid = res._id
      console.log(res);
      
      Emitter.authEmitter.emit(true)
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }
  
}

