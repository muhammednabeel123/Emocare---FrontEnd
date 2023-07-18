import { createReducer,on } from "@ngrx/store";
import { Appointment } from "./adminInterface";
import { FetchAppointmentAPI } from "./admin.action";
import { state } from "@angular/animations";


export const initialState:Appointment[] = []
  
const _AppointmentReducer =  createReducer(initialState,on(FetchAppointmentAPI,(state,{allAppointment})=>{return [...allAppointment]}))

export function AppointmentReducer(state:any,action:any){ return _AppointmentReducer(state,action)}