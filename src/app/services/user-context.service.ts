import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ConstantesDataBase } from '../constants/constantes-db';

const defaultUser = null;

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  public user$ = new BehaviorSubject(defaultUser);

  constructor(private sessionService: SessionService, private router: Router) {
    let data = this.sessionService.getItem('currentUser');
    if ( data != null)
    {
      this.user$.next(data);
    }
  }

  public setUser(user: any)
  {
    this.sessionService.setItem('currentUser', user);
    this.user$.next(user);
  }

  public logout()
  {
    this.sessionService.clear();
    localStorage.removeItem('token');
    this.user$.next(defaultUser);
    this.redirecciona();
  }

  private redirecciona() {
    this.router.navigate(['/login']);
  }
}
