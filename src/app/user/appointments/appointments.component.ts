import { Component, OnDestroy } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { Router } from '@angular/router';
import { Emitter } from '../emitters/emitter';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnDestroy {
  message: any;
  isButtonDisabled: boolean = true;
  appointments: any[] = [];
  private appointmentsSubscription: Subscription | undefined;

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointments();
    this.userService.getUser().subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        this.message = 'You are not authenticated';
      }
    );
  }

  ngOnDestroy(): void {
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }
  }

  getAppointments() {
    this.appointmentsSubscription = this.userService.getAppointment().subscribe(
      (res: any[]) => {
        console.log(res, 'these are the appointments');
        Emitter.authEmitter.emit(true);

        if (res.length > 0) {
          this.appointments = res;
          this.updateButtonStatus();
          this.scheduleUpdate();
        } else {
          this.appointments = [];
        }
      },
      (err) => {
        Emitter.authEmitter.emit(false);
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
        appointment.isButtonDisabled = true;
      }
    }
  }

  scheduleUpdate() {
    const updateFn = () => {
      this.updateButtonStatus();
      requestAnimationFrame(updateFn);
    };

    requestAnimationFrame(updateFn);
  }

  startAppointment(appointmentId: string): void {
    console.log('Starting appointment:', appointmentId);
    this.router.navigate(['/video_consult', appointmentId]);
  }

  cancelAppointment(id:String): void {
    Swal.fire({
      title: 'Cancel Appointment',
      text: 'Are you sure you want to cancel the appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#6C757D',
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.cancelAppointment(id).subscribe((res)=>{
          console.log(res,"hey");
          
        })
     
      }
    });
  }

  rescheduleAppointment(id:String,appointment_id:String): void {
    this.router.navigate(['/slot', id, 'time'], { queryParams: { optionalParam: appointment_id } });

  }

}



