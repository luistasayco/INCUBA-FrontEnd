import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { environment } from 'src/environments/environment';
import { ModeloDashboardSINMIPorFiltro, ModeloDashboardSINMI } from '../models/modelo-dashboard-sinmi.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardSINMIService {

  constructor(private http: HttpClient,
              private utils: UtilService) { }
  
   getDashboardSINMIPorFiltro(value: any){
    debugger;
    let parametros = new HttpParams();
    parametros = parametros.append('empresa',JSON.stringify(value.empresa));
    parametros = parametros.append('planta',JSON.stringify(value.planta));
    parametros = parametros.append('responsableInvetsa',JSON.stringify(value.responsableInvetsa));
    parametros = parametros.append('responsableCompania',JSON.stringify(value.responsableCompania));
    parametros = parametros.append('linea',JSON.stringify(value.linea));
    parametros = parametros.append('edad',JSON.stringify(value.edad));
    parametros = parametros.append('tipoModulo',value.tipoModulo.toString());
    parametros = parametros.append('fechaInicio',this.utils.fecha_AAAAMMDD(value.fechaInicio));
    parametros = parametros.append('fechaFin',this.utils.fecha_AAAAMMDD(value.fechaFin));
    parametros = parametros.append('idDashboard',value.idDashboard.toString());
    parametros = parametros.append('idUsuario',value.idUsuario.toString());  
    return this.http.get<ModeloDashboardSINMI[]>
    (`${environment.url_api}DashboardSINMI/GetAll/`, { params: parametros });  
  }
}
