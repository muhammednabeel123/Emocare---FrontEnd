export interface Appointment {
    completed: boolean;
    _id: string;
    user?: User;
    counselor: Counselor;
    service: string;
    booked: boolean;
    consultingTime: string;
    slotId: string;
    fee: number;
    payment_status: string;
    date: string;
    __v: number;
    canceled: boolean;
  }
  
  export interface User {
    name: string;
  }

 export interface Counselor {
    name: string;
  }
  
