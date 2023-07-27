import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('userToken')
    if (token) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', token),withCredentials:true
      });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
