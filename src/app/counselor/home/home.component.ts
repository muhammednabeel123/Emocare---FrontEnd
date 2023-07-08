import { Component, OnInit } from '@angular/core';
import { CounselorService } from '../counselor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  message:any
  appointments: any[] = [];
  constructor(private counselorService : CounselorService,private router: Router){}

  ngOnInit(): void {
    this.getAppointments()
    this.counselorService.getCounselor().subscribe((res:any)=>{console.log(res);
    },(err)=>{
      this.message = 'you are no authenticated'})
     
    }

    
  getAppointments(){

    
    this.counselorService.getAppointment().subscribe((res:any)=>{
      this.appointments = res;}, (err)=>{
        this.message = 'you are no authenticated'})
       
      
  
  }

  startAppointment(appointmentId: string): void {
    console.log('Starting appointment:', appointmentId);
    this.router.navigate(['/counselor/cosulting', appointmentId]);

  }
  
}


