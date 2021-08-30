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

    let data = null;

    if (this.sessionService.getItem('currentUser')) {
      data = this.sessionService.getItemDecrypt('currentUser');
    }

    if ( data != null)
    {
      this.user$.next(data);
    }
  }

  public getIdUsuario(): number {
    return Number(this.sessionService.getItemDecrypt('idUsuario'));
  }

  public getNombreCompletoUsuario(): string {
    return this.sessionService.getItemDecrypt('nombre');
  }

  public getEmail(): string {
    return this.sessionService.getItemDecrypt('email');
  }

  public getUsuario() {
    return this.sessionService.getItemDecrypt('usuario');
  }

  public getSociedad() {
    return this.sessionService.getItemDecrypt('DATABASESELECCIONADA');
  }

  public setUser(user: any)
  {
    this.sessionService.setItemEncrypt('currentUser', user);
    this.user$.next(user);
  }

  public logout()
  {
    this.sessionService.clear();
    // localStorage.removeItem('token');
    // this.user$.next(defaultUser);
    this.redirecciona();
  }

  private redirecciona() {
    this.router.navigate(['/login']);
  }
}
