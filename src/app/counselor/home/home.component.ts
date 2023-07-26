import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CounselorService } from '../counselor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  message: any;
  appointments: any[] = [];
  private appointmentsSubscription: Subscription | undefined;
  private id:string
  private updateInterval: any;
  isAvailable:Boolean

  constructor(private counselorService: CounselorService, private router: Router) {}

  ngOnInit(): void {
  
    const token = localStorage.getItem('CToken');
    if (token) {
      this.getAppointments(token);
      this.counselorService.getCounselor(token).subscribe(
        (res: any) => {
          this.id= res._id
          this.isAvailable = res.is_Available
        },
        (err) => {
          this.message = 'You are not authenticated';
        }
      );
  
      this.scheduleUpdate();
    
    } else { 


  console.log('Token not found in localStorage');
}

   
  }

  ngOnDestroy(): void {
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }

    if (this.updateInterval) {
      cancelAnimationFrame(this.updateInterval);
    }
  }

  getAppointments(token:string) {
    this.appointmentsSubscription = this.counselorService.getAppointment(token).subscribe(
      (res: any[]) => {
        this.appointments = res;
        this.updateButtonStatus();
      },
      (err) => {
        this.message = 'You are not authenticated';
      }
    );
  }

  updateButtonStatus() {
    const currentTime = Date.now();

    for (let i = 0; i < this.appointments.length; i++) {
      const appointment = this.appointments[i];
      const appointmentTime = new Date(appointment.consultingTime).getTime();

      if (currentTime >= appointmentTime) {
        appointment.isButtonDisabled = false;
      } else {
        appointment.isButtonDisabled = false;
      }
    }
  }

  scheduleUpdate() {
    const updateFn = () => {
      this.updateButtonStatus();
      this.updateInterval = requestAnimationFrame(updateFn);
    };

    this.updateInterval = requestAnimationFrame(updateFn);
  }

  startAppointment(appointmentId: string): void {
    this.router.navigate(['/counselor/consulting',appointmentId]);
  }

  handleOffClick(): void {
    // Show a confirmation alert
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to set availability off?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes," proceed with setting availability off
        this.isAvailable = true;
        this.counselorService.isAvailableOff(this.id).subscribe(
          (res) => {
            console.log(res, 'thisdsadas');
            Swal.fire('Success', 'Availability set to off', 'success');
          },
          (error) => {
            console.error(error);
           Swal.fire('Error', 'Failed to set availability off', 'error');
          }
        );
    
        this.ngOnInit();
      }
    });
  }

  
 
  handleOnClick(): void {
    // Show a confirmation alert
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to set availability on?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.isAvailable = false;
        this.counselorService.isAvailableOn(this.id).subscribe(
          (res) => {
            console.log(res);
       
            Swal.fire('Success', 'Availability set to on', 'success');
          },
          (error) => {
        
            console.error(error);
         
            Swal.fire('Error', 'Failed to set availability on', 'error');
          }
        );
     
        this.ngOnInit();
      }
    });
  }

   
}










