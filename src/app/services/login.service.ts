import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { environment } from '../../environments/environment.prod';
import { DataBaseModel } from '../modules/modulo-seguridad/models/data-base';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  autentica(login: LoginModel) {
    const url = environment.url_api_seguridad + 'Autenticar/Autenticar';
    const param: string = JSON.stringify(login);
    return this.http.post(
        url,
        param
    );
  }

  RecuperarPassword(login: LoginModel) {
    const url = environment.url_api_seguridad + 'Autenticar/RecuperarPassword';
    const param: string = JSON.stringify(login);
    return this.http.put(
        url,
        param
    );
  }

  getDataBaseAll() {
    return this.http.get<DataBaseModel[]>
    (`${environment.url_api_seguridad}DataBase/GetAll/`);
  }

}
