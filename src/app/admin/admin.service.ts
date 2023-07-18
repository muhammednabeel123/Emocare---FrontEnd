import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { Appointment } from './adminState/adminInterface';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly url = environment.admin_api;
  
  constructor(private http: HttpClient) { }

//counselor section
  ViewCounselor(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/counselor`, { withCredentials: true }).pipe(
      map((response: any) => {
        const user = response.find((counselor: any) => counselor._id === id);
        return user;
      })
    );
  }


  getCounselor(): Observable<any> {

    return this.http.get<any>(`${this.url}/counselor`, { withCredentials: true }).pipe(
      map((response: any) => {
        const verifiedCounselors = response.filter((counselor: any) => counselor.is_verified=== true);
        return verifiedCounselors;
      })
    );
  }
  
 getCounselorById(id: any): Observable<any> {
  return this.http.get<any>(`${this.url}/counselor`, { withCredentials: true }).pipe(
    map((response: any) => {
      const verifiedCounselors = response.filter((counselor: any) => counselor.is_verified === true && counselor.service === id);
      return verifiedCounselors;
    })
  );
}


  getNewCounselor(): Observable<any>{
    return this.http.get<any>(`${this.url}/counselor`,{ withCredentials: true }).pipe(
      map((response: any) => {
        const verifiedCounselors = response.filter((counselor: any) => counselor.is_verified=== false);
        return verifiedCounselors;
      })
    );}

    AcceptCounselor(id: any): Observable<any> {
      return this.http.patch<any>(`${this.url}/accept-counselor`,{ id: id }, { withCredentials: true });
    }
    
    DeclineCounselor(id:any):Observable<any>{
      return this.http.delete<any>(`${this.url}/counselor/${id}`, { withCredentials: true });
    }

 
  login(data: any) {
    return this.http.post(`${this.url}/login`, data, { withCredentials: true });
  }

  //user section
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/customers`, { withCredentials: true });
  }

  blockUser(id: any): Observable<any> {
    return this.http.post(`${this.url}/block/${id}`, null, { withCredentials: true });
  }

  blockCounselor(id:any):Observable<any>{
    return this.http.post<any>(`${this.url}/block-Counselor/${id}`,{withCredentials: true })
  }
  unblockCounselor(id:any):Observable<any>{
    return this.http.post<any>(`${this.url}/unblock-Counselor/${id}`,{withCredentials: true })
  }

  // service section  
  addService(data:any):Observable<any>{
    return this.http.post<any>(`${this.url}/add-service`,data,{withCredentials: true })
  }
  getService():Observable<any>{
    return this.http.get<any>(`${this.url}/services`,{withCredentials: true })
  }

  getCookie():Observable<any>{ 
    return this.http.get<any>(`${this.url}/cookie`,{withCredentials: true })
  }

  Logout():Observable<any>{
    return this.http.post<any>(`${this.url}/logout`,{withCredentials: true })
  }

  getAppointment():Observable<any>{
    console.log("herasddsad");
    
    return this.http.get<Appointment>(`${this.url}/getAppointment`,{withCredentials:true})
  }

 
}
