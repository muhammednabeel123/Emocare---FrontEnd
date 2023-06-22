import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly url = environment.admin_api
  constructor(private http : HttpClient) { }

  login(data:any){
    return this.http.post(`${this.url}/login`,data,{withCredentials:true})
  }

  getUsers(){
    return this.http.get(`${this.url}/customers`,{withCredentials:true})
  }
  blockUser(id:any){
    return this.http.patch(`${this.url}/block/${id}`,{withCredentials:true} )
  }

}
