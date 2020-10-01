import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PerfilModel } from '../models/pefil.model';
import { environment } from 'src/environments/environment';
import { PersonaModel } from '../models/persona.model';
import { MenuModel } from '../models/menu.model';
import { OpcionModel } from '../models/opcion.model';
import { OpcionPorPerfilModel } from '../models/opcion-por-perfil';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  myHeader;

  constructor(private http: HttpClient) {
     this.myHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  // title:  Metodos para perfil
  // Author: Luis Tasayco
  // Date:   23/09/2020s
  getPerfil(value: PerfilModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionPerfil', value.descripcionPerfil);
    return this.http.get<PerfilModel[]>
    (`${environment.url_api_seguridad}Perfil/GetAll/`, { params: parametros, headers: this.myHeader });
  }

  setInsertPerfil(value: PerfilModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Perfil/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: this.myHeader }
    );
  }

  setUpdatePerfil(value: PerfilModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Perfil/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: this.myHeader }
    );
  }

  setDeletePerfil(value: PerfilModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Perfil/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: this.myHeader }
    );
  }

  // title:  Metodos para persona
  // Author: Luis Tasayco
  // Date:   23/09/2020
  getPersona(value: PersonaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombre', value.nombre);

    return this.http.get<PersonaModel[]>
    (`${environment.url_api_seguridad}Persona/GetAll/`, { params: parametros, headers: this.myHeader });
  }
  getPersonaPorId(id: number) {
    return this.http.get<PersonaModel>
    (`${environment.url_api_seguridad}Persona/GetbyIdPersona/${id}`, {headers: this.myHeader});
  }
  setInsertPersona(value: PersonaModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Persona/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: this.myHeader }
    );
  }
  setUpdatePersona(value: PersonaModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Persona/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: this.myHeader }
    );
  }
  setDeletePersona(value: PersonaModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Persona/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: this.myHeader }
    );
  }

  // title:  Metodos para Menu
  // Author: Luis Tasayco
  // Date:   25/09/2020
  getMenuAll() {
    return this.http.get<MenuModel[]>
    (`${environment.url_api_seguridad}Menu/GetAll/`, {headers: this.myHeader});
  }
  setInsertMenu(value: MenuModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Menu/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: this.myHeader }
    );
  }
  setUpdateMenu(value: MenuModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Menu/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: this.myHeader }
    );
  }

  // title:  Metodos para Opcion
  // Author: Luis Tasayco
  // Date:   23/09/2020
  getOpcion(idMenu: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idMenu', idMenu.toString());

    return this.http.get<OpcionModel[]>
    (`${environment.url_api_seguridad}Opcion/GetAll/`, { params: parametros, headers: this.myHeader });
  }
  setInsertOpcion(value: OpcionModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Opcion/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: this.myHeader }
    );
  }
  setUpdateOpcion(value: OpcionModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Opcion/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: this.myHeader }
    );
  }
  setDeleteOpcion(value: OpcionModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api_seguridad + 'Opcion/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: this.myHeader }
    );
  }

  // title:  Metodos para Opcion por Perfil
  // Author: Luis Tasayco
  // Date:   23/09/2020
  getSeleccionadoOpcionPorPerfil(idMenu: number, idPerfil: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idMenu', idMenu.toString());
    parametros = parametros.append('idPerfil', idPerfil.toString());

    return this.http.get<OpcionPorPerfilModel[]>
    (`${environment.url_api_seguridad}OpcionPorPerfil/GetAllSeleccionado/`, { params: parametros, headers: this.myHeader });
  }
  getPorSeleccionarOpcionPorPerfil(idMenu: number, idPerfil: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idMenu', idMenu.toString());
    parametros = parametros.append('idPerfil', idPerfil.toString());

    return this.http.get<OpcionPorPerfilModel[]>
    (`${environment.url_api_seguridad}OpcionPorPerfil/GetAllPorSeleccionar/`, { params: parametros, headers: this.myHeader });
  }
  setInsertOpcionPorPerfil(value: OpcionPorPerfilModel[]) {
    const url = environment.url_api_seguridad + 'OpcionPorPerfil/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: this.myHeader }
    );
  }
  setDeleteOpcionPorPerfil(value: OpcionPorPerfilModel[]) {
    const url = environment.url_api_seguridad + 'OpcionPorPerfil/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: this.myHeader }
    );
  }
}
