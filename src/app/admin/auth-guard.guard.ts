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
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {

    const token = localStorage.getItem('Atoken');

    if (token) {
  
      return of(true);
    } else {
    
      this.router.navigate(['/admin']);
      return of(false);
    }
  }
}
