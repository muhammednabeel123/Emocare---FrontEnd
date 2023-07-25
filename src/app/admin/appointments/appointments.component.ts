import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appointment } from '../adminState/adminInterface';
import { AdminService } from '../admin.service';
import { AppointmentAPI } from '../adminState/admin.action';
import { selectAllAppointment, selectAppointment } from '../adminState/admin.selector';
import { map } from 'rxjs';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})



export class AppointmentsComponent implements OnDestroy {

  

  constructor(private store: Store<{ allAppointment: Appointment[] }>, private adminService: AdminService) {}
  appointments$:any
  searchQuery: string = '';
  ngOnInit() {
    this.store.dispatch(AppointmentAPI());
    this.appointments$ = this.store.pipe(select(selectAllAppointment));
  }
  searchAppointments() {
    const filteredAppointments$ = this.store.pipe(
      select(selectAllAppointment),
      map((appointments: Appointment[]) => {
        if (!this.searchQuery) {
          return appointments;
        } else {
          return appointments.filter(appointment =>
            (appointment.user?.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            appointment.counselor?.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
          );
        }
      })
    );

    this.appointments$ = filteredAppointments$;
  }
  
  ngOnDestroy(): void {
    
  }

}
