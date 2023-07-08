import { Component } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { Router } from '@angular/router';
import { Emitter } from '../emitters/emitter';
import { interval } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  message:any
  isButtonDisabled: boolean = true;

  appointments: any[] = [];
  constructor(private  userService :UserServiceService,private router: Router){}

  ngOnInit(): void {
    this.getAppointments()
    this.userService.getUser().subscribe((res:any)=>{console.log(res);
    },(err)=>{
      this.message = 'you are no authenticated'})
     
    }

    
    getAppointments() {
      this.userService.getAppointment().subscribe((res: any[]) => {
        console.log(res, "these are the appointments");
        Emitter.authEmitter.emit(true);
    
        if (res.length > 0) {
          this.appointments = res;
    
          var currentTime = new Date();
          var isButtonDisabled = false;
    
          // Iterate over the appointments
          for (let i = 0; i < res.length; i++) {
            var appointmentTime = new Date(res[i].consultingTime);
    
            console.log("Current Time:", currentTime);
            console.log("Appointment Time:", appointmentTime);
    
            if (isNaN(appointmentTime.getTime()) || currentTime < appointmentTime) {
              isButtonDisabled = true; // Disable the button if any appointment is not eligible
              break; // Exit the loop
            }
          }
    
          this.isButtonDisabled = isButtonDisabled;
        } else {
          // Handle the case when no appointments are available
          this.appointments = [];
          this.isButtonDisabled = true; // Disable the button
        }
      }, (err) => {
        Emitter.authEmitter.emit(false);
        this.message = 'You are not authenticated';
      });
    }
    
    
    
    


  startAppointment(appointmentId: string): void {
    console.log('Starting appointment:', appointmentId);
    this.router.navigate(['/video_consult', appointmentId]);

  }
  
}


