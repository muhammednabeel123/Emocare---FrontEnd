import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {

  constructor(private fireauth : AngularFireAuth,private router : Router) { }

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res =>{
      this.router.navigate(['/'])
      localStorage.setItem('userReg',JSON.stringify(res.user?.uid))
      
    },err=>{
      console.log("somethin went wrong");
      
    } )
  }
}
