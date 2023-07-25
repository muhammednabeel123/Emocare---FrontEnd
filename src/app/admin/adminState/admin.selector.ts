import { Appointment } from './adminInterface';
import { createSelector } from "@ngrx/store"
import { AppointmentState } from './adminState';


export const AppointmentRootSelector = (state:AppointmentState)=>state.allAppointment


export const selectAppointment = createSelector(
    AppointmentRootSelector,
    (allAppoitment: Appointment[]) => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const currentAppointments = allAppoitment.filter((appointment) => {
      const appointmentDate = new Date(appointment.consultingTime);
      appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate.getTime() === currentDate.getTime();
      });
  
      return [...currentAppointments];
    }
  );
  
  export const selectAllAppointment  =  createSelector(
    AppointmentRootSelector,(allAppoitment:Appointment[])=>{
            return[...allAppoitment]
    }
)
