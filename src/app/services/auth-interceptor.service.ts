// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      let clonedRequest = req;

      // clonedRequest = req.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // Send the modified request
      next.handle(clonedRequest).subscribe(
        (event) => observer.next(event),
        (error) => observer.error(error),
        () => observer.complete()
      );
    });
  }
}
