import { Injectable } from '@angular/core';
import { EmpresaModel } from '../models/empresa.model';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlantaModel } from '../models/planta.model';
import { EquipoModel } from '../models/equipo.model';
import { RepuestoPorModeloModel } from '../../modulo-registro-equipo/models/repuesto-por-modelo.model';
import { MantenimientoPorModeloModel } from '../../modulo-registro-equipo/models/mantenimiento-por-modelo.model';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(private http: HttpClient) {}

  // title:  Metodos para Empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getEmpresa(value?: EmpresaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value ? value.descripcion : '');

    return this.http.get<EmpresaModel[]>
    (`${environment.url_api}Empresa/GetAll/`, { params: parametros });
  }

  // title:  Metodos para obtener planta por empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getPlantaPorEmpresa(value?: PlantaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value ? value.codigoEmpresa : '');

    return this.http.get<PlantaModel[]>
    (`${environment.url_api}Planta/GetAllPlantaPorEmpesa/`, { params: parametros });
  }

  // title:  Metodos para obtener planta por empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getEquipo(value?: EquipoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value ? value.codigoEmpresa : '');

    return this.http.get<PlantaModel[]>
    (`${environment.url_api}Equipo/GetAll/`, { params: parametros });
  }
  // title:  Metodos para obtener repuesto por modelo (all)
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getRepuestoPorModelo(value?: RepuestoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoModelo', value ? value.codigoModelo : '');

    return this.http.get<PlantaModel[]>
    (`${environment.url_api}RepuestoPorModelo/GetAll/`, { params: parametros });
  }

  getMantenimientoPorModelo(value?: MantenimientoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoModelo', value ? value.codigoModelo : '');

    return this.http.get<PlantaModel[]>
    (`${environment.url_api}MantenimientoPorModelo/GetAll/`, { params: parametros });
  }
}
