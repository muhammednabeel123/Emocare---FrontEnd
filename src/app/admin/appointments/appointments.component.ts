import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appointment } from '../adminState/adminInterface';
import { AdminService } from '../admin.service';
import { AppointmentAPI } from '../adminState/admin.action';
import { selectAppointment } from '../adminState/admin.selector';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnDestroy {

  constructor(private store: Store<{ allAppointment: Appointment[] }>, private adminService: AdminService) {}
  appointments$:any
  ngOnInit() {
    this.store.dispatch(AppointmentAPI());
    this.appointments$ = this.store.pipe(select(selectAppointment));
  }
  
  ngOnDestroy(): void {
    
  }

}
