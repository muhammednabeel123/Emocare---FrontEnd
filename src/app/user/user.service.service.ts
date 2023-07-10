import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly url = environment.user_api;

  constructor(private http:HttpClient) { }

  login(data:any):Observable<any>{  
    console.log(data);
    
    return this.http.post(`${this.url}/login`,data, { withCredentials: true });
  }
  getUser():Observable<any>{
    return this.http.get(`${this.url}/user`,{withCredentials:true})
  }

  getServiceById(id:any):Observable<any>{
    return this.http.get(`${this.url}/services/${id}`,{withCredentials:true})
  }

  getServicer(id:any):Observable<any>{
    return this.http.get(`${this.url}/servicer/${id}`,{withCredentials:true})
  }

  getDate():Observable<any>{
    return this.http.get(`${this.url}/date`,{withCredentials:true})
  }

  checkout(index: any, servicer: any, userid: any, stripeToken: any, appointmentId?: any): Observable<any> {
    const token = { stripeToken: stripeToken };
    let url = `${this.url}/book/${index}/${servicer}/${userid}`;
    if (appointmentId) {
      const appointment_Id = appointmentId;
      url += '?appointmentId=' + encodeURIComponent(JSON.stringify(appointmentId));
    }
  
    return this.http.post<any>(url, token, { withCredentials: true });
  }
  
  

  getAppointmentById(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.url}/appointments`, { withCredentials: true }).pipe(
      map((appointments: any[]) => appointments.find(appointment => appointment._id === id))
    );
  }

  getAppointment(): Observable<any> {
    const currentTime = new Date();
  
    return this.http.get(`${this.url}/appointments`, { withCredentials: true }).pipe(
      map((res: any) => {
        return res.filter((appointment: any) => {
          const consultTime = moment(appointment.consultingTime).add(50, 'minutes').toDate();
          console.log(consultTime, "this is");
          console.log(consultTime, "here", currentTime);
  
          if (!appointment.expired && !appointment.completed) {
            return consultTime > currentTime;
          }
          return false;
        });
      })
    );
  }

  cancelAppointment(id:String):Observable<any>{
    console.log("resacef");
    
    return this.http.get(`${this.url}/cancel-appointments/${id}`, { withCredentials: true })
  }

}
