import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ProcesoModel } from '../models/proceso.model';
import { environment } from 'src/environments/environment';
import { CalidadModel } from '../models/calidad.model';
import { ProcesoDetalleModel } from '../models/proceso-detalle.model';

@Injectable({
  providedIn: 'root'
})
export class ExamenFisicoPollitoService {

  constructor(private http: HttpClient) { }

  // title:  Metodos para Proceso
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getProceso(value: ProcesoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);
    return this.http.get<ProcesoModel[]>
    (`${environment.url_api}Proceso/GetAll/`, { params: parametros });
  }

  setInsertProceso(value: ProcesoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Proceso/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProceso(value: ProcesoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Proceso/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProceso(value: ProcesoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Proceso/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Proceso Detalle
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getProcesoDetalle(value: ProcesoDetalleModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idProceso', value.idProceso.toString());
    return this.http.get<ProcesoDetalleModel[]>
    (`${environment.url_api}ProcesoDetalle/GetAll/`, { params: parametros });
  }

  setInsertProcesoDetalle(value: ProcesoDetalleModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'ProcesoDetalle/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProcesoDetalle(value: ProcesoDetalleModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'ProcesoDetalle/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProcesoDetalle(value: ProcesoDetalleModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'ProcesoDetalle/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Calidad
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getCalidad(value: CalidadModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);
    return this.http.get<ProcesoModel[]>
    (`${environment.url_api}Calidad/GetAll/`, { params: parametros });
  }

  setInsertCalidad(value: CalidadModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Calidad/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateCalidad(value: CalidadModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Calidad/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteCalidad(value: CalidadModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Calidad/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }
}
