import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContextService } from '../services/user-context.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService {

  constructor(private userContextService: UserContextService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let updateReq: HttpRequest<any>;

    const user = this.userContextService.user$.getValue();

    if (user) {
      const TOKEN = localStorage.getItem('token');

      updateReq = req.clone(
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
          })
        }
      );
    } else {
      updateReq = req.clone(
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      );
    }

    return next.handle( updateReq ).pipe(
      catchError( this.mensajeError )
    );
  }

  mensajeError(error: HttpErrorResponse) {
      return throwError('Error');
  }
}
