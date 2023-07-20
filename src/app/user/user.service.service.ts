import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, map ,filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './userState/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly url = environment.user_api;

  constructor(private http:HttpClient) { }

  login(data:any):Observable<any>{  
    console.log(data);
    
    return this.http.post(`${this.url}/login`,data);
  }
  getUser():Observable<any>{
    return this.http.get<User>(`${this.url}/user`)
  }

  getServiceById(id:any):Observable<any>{
    return this.http.get(`${this.url}/services/${id}`)
  }

  getServicer(id: any): Observable<any> {
    return this.http.get(`${this.url}/servicer/${id}`, {
      withCredentials: true,
    }).pipe(
      filter((servicer: any) => {
        return !servicer.is_Blocked;
      })
    );
  }

  getDate():Observable<any>{
    return this.http.get(`${this.url}/date`)
  }

  checkout(index: any, servicer: any, userid: any, stripeToken: any, appointmentId?: any, wallet?: any): Observable<any> {
    const token = { stripeToken: stripeToken };
  
    let url = `${this.url}/book/${index}/${servicer}/${userid}`;
    if (appointmentId) {
      url += `?appointmentId=${appointmentId}`;
    }
  
  
    return this.http.post<any>(url, { token, wallet });
  }
  
  

  getAppointmentById(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.url}/appointments`).pipe(
      map((appointments: any[]) => appointments.find(appointment => appointment._id === id))
    );
  }

  getAppointment(): Observable<any> {
    const currentTime = new Date();
  
    return this.http.get(`${this.url}/appointments`).pipe(
      map((res: any) => {
        return res.filter((appointment: any) => {
          const consultTime = moment(appointment.consultingTime).add(50, 'minutes').toDate();
          if (!appointment.expired && !appointment.completed && !appointment.canceled) {
            return consultTime > currentTime;
          }
          return false;
        });
      })
    );
  }

  cancelAppointment(id:String):Observable<any>{
    
    return this.http.get(`${this.url}/cancel-appointments/${id}`)
  }

  getAppointmentHistory(): Observable<any> {
    return this.http.get(`${this.url}/appointments`)
      .pipe(
        map((response: any) => {
          const appointments: any[] = Object.values(response);
          return appointments.filter((appointment: any) => appointment.completed == true);
        })
      );
  } 

  editProfile(formData:any):Observable<any>{
      return this.http.patch(`${this.url}/edit-profile`,formData)

  }
  
  

}
