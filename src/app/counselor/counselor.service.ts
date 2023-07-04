import { Observable, map } from 'rxjs';
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

  getCounselor():Observable<any>{
    return this.http.get(`${this.url}/getCounselor`,{withCredentials:true})
    }

  logOut():Observable<any>{
    return this.http.post(`${this.url}/logout`,{},{withCredentials:true})
  }

  getAppointment(): Observable<any> {
    console.log("here");
  
    const currentTime = new Date();
  
    return this.http.get(`${this.url}/appointments`, { withCredentials: true }).pipe(
      map((res: any) => {
        return res.filter((appointment: any) => {
          const consultTime = moment(appointment.consultingTime).toDate();
          console.log(consultTime, "this is");
          console.log(consultTime, "here", currentTime);
  
          return consultTime > currentTime;
        });
      })
    );
  }
  

  }






