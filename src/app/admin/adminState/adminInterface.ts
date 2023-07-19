export interface Appointment {
    completed: boolean;
    _id: string;
    user: string;
    counselor: string;
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
  