import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
