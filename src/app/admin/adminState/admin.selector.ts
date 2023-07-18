import { Appointment } from './adminInterface';
import { createSelector } from "@ngrx/store"
import { AppointmentState } from './adminState';


export const AppointmentRootSelector = (state:AppointmentState)=>state.allAppointment


export const selectAppointment  =  createSelector(
    AppointmentRootSelector,(allAppoitment:Appointment[])=>{
            return[...allAppoitment]
    }
)