import { AdminService } from './../admin.service';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appointment } from '../adminState/adminInterface';
import { AppointmentAPI } from '../adminState/admin.action';
import { selectAllAppointment, selectAppointment } from '../adminState/admin.selector';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnDestroy {
  

  constructor(private store: Store<{ allAppointment: Appointment[] }>, private adminService: AdminService) {}
  appointments$:any
  appointment?: Appointment;
  completedAppointmentsCount!: number
  user:number
  admin:any
  length:number
  

  ngOnInit() {

    this.store.dispatch(AppointmentAPI());
    this.appointments$ = this.store.pipe(select(selectAllAppointment));

    

    this.adminService.getCompletedAppointmentsCount().subscribe(length => {this.completedAppointmentsCount = length });
    
    this.adminService.getRevenue().subscribe((res)=>{ this.admin = res})

    this.adminService.getCounselor().subscribe(response => { this.length = response.length,console.log(response.length);
     });

    this.adminService.getUsers().subscribe(response => { this.user = response.length});


    
  }
  
        
  

  ngOnDestroy(): void {
    
  }


}
