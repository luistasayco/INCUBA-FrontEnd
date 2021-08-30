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
  
   getDashboardSINMIPorFiltro(value: ModeloDashboardSINMIPorFiltro){
    debugger;
    let parametros = new HttpParams();
    parametros = parametros.append('empresa',value.empresa);
    parametros = parametros.append('planta',value.planta);
    parametros = parametros.append('responsableInvetsa',value.responsableInvetsa.toString());
    parametros = parametros.append('responsableCompañia',value.responsableCompañia);
    parametros = parametros.append('tipoModulo',value.tipoModulo.toString());
    parametros = parametros.append('linea',value.linea.toString());
    parametros = parametros.append('edad',value.edad.toString());
    parametros = parametros.append('fechaInicio',this.utils.fecha_AAAAMMDD(value.fechaInicio));
    parametros = parametros.append('fechaFin',this.utils.fecha_AAAAMMDD(value.fechaFin));
    parametros = parametros.append('idDashboard',value.idDashboard.toString());
    parametros = parametros.append('idUsuario',value.idUsuario.toString());  
  
    return this.http.get<ModeloDashboardSINMI[]>
    (`${environment.url_api}DashboardSINMI/GetAll/`, { params: parametros });  
  }

  
}
