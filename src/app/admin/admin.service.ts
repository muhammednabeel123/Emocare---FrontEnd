import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly url = environment.admin_api;
  
  constructor(private http: HttpClient) { }

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


 
  login(data: any) {
    return this.http.post(`${this.url}/login`, data, { withCredentials: true });
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/customers`, { withCredentials: true });
  }

  blockUser(id: any) {
    return this.http.patch(`${this.url}/block/${id}`, { withCredentials: true });
  }

}
