import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-slot-payment',
  templateUrl: './slot-payment.component.html',
  styleUrls: ['./slot-payment.component.css']
})
export class SlotPaymentComponent implements OnInit {
  constructor(private userService:UserServiceService,private activatedRoute: ActivatedRoute){}
  message:any
  servicer:any
  time:any
  ngOnInit(): void {   
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id,"this is id");
    this.activatedRoute.queryParamMap.subscribe(params => {
      const times = params.get('times');
      if (times !== null) {
         this.time = JSON.parse(atob(times));
  
        console.log('Times:', this.time);}});
    
    this.User()
    this.services(id)
}
  // bookSlot(slot: Slot) {
  //   this.http.post(`http://localhost:5000/book/${this.slots.indexOf(slot)}`, {})
  //     .subscribe(response => {
  //       console.log(response);
  //       this.getSlots();
  //     }, error => {
  //       console.error("thisssa",error);
  //     });
  // }

  services(id: any) {
    this.userService.getServicer(id).subscribe((res: any) => {
      this.servicer = res

      
    });
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
  
}

