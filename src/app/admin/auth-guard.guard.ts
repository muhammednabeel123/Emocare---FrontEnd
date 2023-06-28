import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';



import { Observable,of  } from 'rxjs';
import { AdminService } from './admin.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private adminService:AdminService,private router : Router){}
  canActivate(): Observable<boolean> {
    return this.adminService.getCookie().pipe(
      map((res) => {
        console.log(res);
        if (res.isAuthenticated) {
          return true; 
          
        } else {
          this.router.navigate(['/admin']); 
          return false; 
        }
      }),
      catchError(() => {
     
        return of(false);
      })
    );
  }
  
  
}
