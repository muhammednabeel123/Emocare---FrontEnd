import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Appointment } from './adminInterface';
import { Injectable } from "@angular/core";
import { AdminService } from '../admin.service';
import { AppointmentAPI, FetchAppointmentAPI } from './admin.action';
import { map, switchMap, tap } from 'rxjs';

@Injectable()

export class adminEffect {
     constructor(private actions$:Actions,private adminService:AdminService){}
     loadAllAppointments$ = createEffect(() =>
     this.actions$.pipe(
       ofType(AppointmentAPI),
       switchMap(() =>  { 
        return this.adminService.getAppointment().pipe(
        map((data) => FetchAppointmentAPI({ allAppointment:data }))
       )})
     )
   );
}