import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appointment } from '../adminState/adminInterface';
import { AppointmentAPI } from '../adminState/admin.action';
import { selectAppointment } from '../adminState/admin.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnDestroy {
  

  constructor(private store:Store<{allAppointment:Appointment[]}>){}
  appointments$:any
  appointment?: Appointment;
  data?: any;
  isLoading?: boolean;

  ngOnInit() {
    this.store.dispatch(AppointmentAPI())
    this.appointments$ = this.store.pipe(select(selectAppointment));

 
    
  }

  ngOnDestroy(): void {
    
  }


}
