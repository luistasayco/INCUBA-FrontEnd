import { Injectable } from '@angular/core';
import { EmpresaModel } from '../models/empresa.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlantaModel } from '../models/planta.model';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(private http: HttpClient) { }

  // title:  Metodos para Empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getEmpresa(value: EmpresaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);

    return this.http.get<EmpresaModel[]>
    (`${environment.url_api}Empresa/GetAll/`, { params: parametros });
  }

  // title:  Metodos para obtener planta por empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getPlantaPorEmpresa(value: PlantaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);

    return this.http.get<PlantaModel[]>
    (`${environment.url_api}Planta/GetAllPlantaPorEmpesa/`, { params: parametros });
  }

}
