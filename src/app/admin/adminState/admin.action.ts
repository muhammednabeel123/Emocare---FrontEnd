import { createAction, props } from '@ngrx/store';
import { Appointment } from './adminInterface';

export const AppointmentAPI = createAction('[Appointment API] Invoke API ')
export const FetchAppointmentAPI = createAction('[Appointment API] fetch api success',props<{allAppointment:Appointment[]}>())

