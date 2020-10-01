import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  autentica(login: LoginModel) {
    const url = environment.url_api_seguridad + 'Autenticar/Autenticar';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(login);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

}
