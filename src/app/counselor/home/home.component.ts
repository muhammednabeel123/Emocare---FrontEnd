import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CounselorService } from '../counselor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  message: any;
  appointments: any[] = [];
  private appointmentsSubscription: Subscription | undefined;
  private updateInterval: any;

  constructor(private counselorService: CounselorService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointments();
    this.counselorService.getCounselor().subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        this.message = 'You are not authenticated';
      }
    );

    this.scheduleUpdate();
  }

  ngOnDestroy(): void {
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }

    if (this.updateInterval) {
      cancelAnimationFrame(this.updateInterval);
    }
  }

  getAppointments() {
    this.appointmentsSubscription = this.counselorService.getAppointment().subscribe(
      (res: any[]) => {
        console.log(res, 'these are the appointments');
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
    console.log('Starting appointment:', appointmentId);
    this.router.navigate(['/counselor/consulting', appointmentId]);
  }

  handleOffClick(): void {
    // Code to execute when the "OFF" label is clicked
    console.log('OFF label clicked');
  }
  
  handleOnClick(): void {
    // Code to execute when the "ON" label is clicked
    console.log('ON label clicked');
  }
   
}










