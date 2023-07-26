import { Observable, map,tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class CounselorService {
  private readonly url = environment.counselor_api;

  
  constructor(private http: HttpClient) { }

  login(data:any):Observable<any>{  
    return this.http.post(`${this.url}/login`,data, { withCredentials: true });
  }

  getCounselor(token:string):Observable<any>{ 
    return this.http.get(`${this.url}/getCounselor/${token}`)
    }

  logOut():Observable<any>{
    return this.http.post(`${this.url}/logout`,{},{withCredentials:true})
  }

  getAppointment(token:string): Observable<any> {
    const currentTime = new Date();
  
    return this.http.get(`${this.url}/appointments/${token}`).pipe(
      map((res: any) => {
        return res.filter((appointment: any) => {
          const consultTime = moment(appointment.consultingTime).add(50, 'minutes').toDate();
          if (!appointment.expired && !appointment.completed && !appointment.canceled ) {
            return consultTime > currentTime;
          }
          return false;
    
        });
      })
    );
  }

  getAppointmentById(id: string | null ,token:string | null): Observable<any> {
    console.log("Fetching appointments from the server...");
  
    return this.http.get<any[]>(`${this.url}/appointments/${token}`).pipe(
      tap((appointments: any[]) => console.log("Appointments from the server:", appointments)),
      map((appointments: any[]) => appointments.find(appointment => appointment._id === id)),
      tap((filteredAppointment: any) => console.log("Filtered Appointment:", filteredAppointment))
    );
  }
  

  updateAppointment(id: any, duration?: any): Observable<any> {
    const url = `${this.url}/appointments/${id}`;
    const payload = { expired: true, completed: true, duration };
    return this.http.patch(url, payload,);
  }

  editProfile(formData:any,token:string|null):Observable<any>{
    formData.token = token;

    
    return this.http.patch(`${this.url}/edit-profile`,formData)}

    isAvailableOn(id: string): Observable<any> {
      const body = { id: id }; 
      return this.http.post<any>(`${this.url}/available`, body);
    }

   isAvailableOff(id: string):Observable<any>{
    const body = { id: id };
      return this.http.post<any>(`${this.url}/not-available`,body)
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

}

 





