import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Observable, map ,filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User,UserLogin,CounselorView,getAllService,getServicer, MyApiResponse, Appointment, CancelAppointmentResponse } from './userState/user.interface';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  app: FirebaseApp;
  auth: Auth;
  storage: FirebaseStorage;

  private readonly url = environment.user_api;
  constructor(private http:HttpClient ) { this.app = initializeApp(environment.firebase)}

  login(data:UserLogin):Observable<UserLogin>{   
    return this.http.post(`${this.url}/login`,data,{withCredentials:true});
  }

  getUser():Observable<any>{
    return this.http.get<User>(`${this.url}/user`,{withCredentials:true})
  }

  getServiceById(id:string | undefined ):Observable<CounselorView[]>{
    return this.http.get<CounselorView[]>(`${this.url}/services/${id}`,{withCredentials:true})
  }

  getServicer(id: string | null): Observable<getServicer> {
    return this.http.get<getServicer>(`${this.url}/servicer/${id}`, {
      withCredentials: true,
    }).pipe(
      map((data: getServicer | null) => {
        if (data && data.is_verified && !data.is_Blocked && data.is_Available === true) {
          return data;
        } else {
          throw new Error('Service not available.');
        }
      })
    );
  }

  getAllServices(): Observable<getAllService[]> {
    return this.http.get<getAllService[]>(`${this.url}/allservices`, {withCredentials: true,});
  }

  getDate(): Observable<any> {
    return this.http.get(`${this.url}/date`, { withCredentials: true });
  }
  
  checkout(index:String | number , servicer: String | number, userid: String | number, stripeToken: String | number, appointmentId?: String | number | undefined | null, wallet?: String  | number | undefined | null): Observable<any> {
    
    const token = { stripeToken: stripeToken };
  
    let url = `${this.url}/book/${index}/${servicer}/${userid}`;
    if (appointmentId) {
      url += `?appointmentId=${appointmentId}`;
    }
  
  
    return this.http.post<any>(url, { token, wallet });
  }
  
  

  getAppointmentById(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.url}/appointments`,{withCredentials:true}).pipe(
      map((appointments: any[]) => appointments.find(appointment => appointment._id === id))
    );
  }

  getAppointment(): Observable<Appointment[]> {
    const currentTime = new Date();
  
    return this.http.get(`${this.url}/appointments`, { withCredentials: true }).pipe(
      tap((res: any) => {
        console.log('Response from getAppointment:');
      }),
      map((res: Appointment[]) => {
        return res.filter((appointment: Appointment) => {
          const consultTime = moment(appointment.consultingTime).add(50, 'minutes').toDate();
          if (!appointment.expired && !appointment.completed && !appointment.canceled) {
            return consultTime > currentTime;;
          }
          return false;
        });
      })
    );
  }

  cancelAppointment(id: string): Observable<CancelAppointmentResponse> {
    return this.http.get(`${this.url}/cancel-appointments/${id}`, { withCredentials: true })
  }

  getAppointmentHistory(): Observable<any> {
    return this.http.get(`${this.url}/appointments`, { withCredentials: true }).pipe(
      tap((res: any) => {
        console.log('Response from getAppointmentHistory:', res);
      }),
      map((response: any) => {
        const appointments: any[] = Object.values(response);
        return appointments.filter((appointment: any) => appointment.completed == true);
      })
    );
  }

  editProfile(formData:any):Observable<any>{
      return this.http.patch(`${this.url}/edit-profile`,formData,{withCredentials:true})

  }


   // Sign in with Google
   GoogleAuth() {
    
    const provider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
    return this.AuthLogin(provider)
      .then((res: any) => {
        return res.accessToken
      });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    const app = initializeApp(environment.firebase)
    
    const auth = getAuth(app);
    auth.languageCode = 'it';
    
    return signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      return result.user
    })
    .catch((error) => {
     console.log(error,"errsr");
     
    });
  }

  googleSignIN(data:any): Observable<any> {
    return this.http.post(`${this.url}/googleLog`,data,{withCredentials:true})
  }
  
  

}
