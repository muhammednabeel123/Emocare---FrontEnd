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
  isDivDisabled: boolean = true;
  appointments: any[] = [];
  private appointmentsSubscription: Subscription | undefined;
  appointment: any;
  currentPage = 1;
  itemsPerPage = 3;
  name:string
  searchTerm: string = '';


  constructor(private userService: UserServiceService, private router: Router) {}

  performSearch() {
    // Filter the appointments based on the search term
    this.appointments = this.appointments.filter(appointment => 
      appointment.counselor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      appointment.service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

  ngOnInit(): void {
    this.getAppointments();
    this.userService.getUser().subscribe(
      (res: any) => {
       this.name = res.name
      },
      (err) => {
        this.message = 'You are not authenticated';
      }
    );
      this.performSearch();
  }

  ngOnDestroy(): void {
    if (this.appointmentsSubscription) {
      this.appointmentsSubscription.unsubscribe();
    }
  }

 getAppointments() {
  this.appointmentsSubscription = this.userService.getAppointment().subscribe(
    (res: any[]) => {
      Emitter.authEmitter.emit(true);

      if (res.length > 0) {
        this.appointments = res;
        this.updateButtonStatus();
        this.updateDivStatus();
        this.scheduleUpdate();
      } else {
        this.appointments = [];
      }

      // If a search term is provided, perform the search on the current appointments list
      if (this.searchTerm !== '') {
        this.performSearch();
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

  updateDivStatus() {
    const currentTime = Date.now();

    for (let i = 0; i < this.appointments.length; i++) {
      const appointment = this.appointments[i];
      const appointmentTime = new Date(appointment.consultingTime).getTime();

      if (currentTime <= appointmentTime) {
        appointment.isDivDisabled = false;
      } else {
        appointment.isDivDisabled = true;
      }
    }
  }

  isAppointmentTimePassed(): boolean {
    const appointmentTime = new Date(this.appointment.time); 
    const currentTime = new Date();

    return currentTime > appointmentTime;
  }



  scheduleUpdate() {
    const updateFn = () => {
      this.updateButtonStatus();
      requestAnimationFrame(updateFn);
    };

    requestAnimationFrame(updateFn);
  }

  startAppointment(appointmentId: string): void {
   
    this.router.navigate(['/video_consult', appointmentId]);
  }

  cancelAppointment(id: string): void {
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
        this.userService.cancelAppointment(id).subscribe(() => {
          Swal.fire('Appointment Canceled', 'Your appointment has been successfully canceled.', 'success');
          this.ngOnInit();
        });
      }
    });
  }
  

  get totalPages(): number {
    return Math.ceil(this.appointments.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }


  rescheduleAppointment(id:String,appointment_id:String): void {
    this.router.navigate(['/slot', id, 'time'], { queryParams: { optionalParam: appointment_id } });

  }



}



