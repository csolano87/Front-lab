import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  /* get token(): string {
    return localStorage.getItem('token') || '';
  }
 */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.IstokenExpired(token)) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        return throwError(() => new Error('Token Expirado'));
      }
      const headers = new HttpHeaders({ 'x-token': token });
      req = req.clone({
        headers,
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error);
      }),
    );
  }



  IstokenExpired(token: string): boolean {
    try {
      /*   console.log(`token`, token); */
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(`payload`, payload);

      const now = Math.floor(Date.now() / 1000);
      console.log(`now`, now);
      return payload.exp < now;
    } catch (error) {
      return true;
    }
  }
}
