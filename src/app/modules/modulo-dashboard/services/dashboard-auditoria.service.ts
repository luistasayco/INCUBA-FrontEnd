import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModeloDashboardAuditoriaPorFiltro, DashboardAuditoria } from '../models/modelo-dashboard-auditoria-por-filtro.model';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardAuditoriaService {

  constructor(private http: HttpClient,
              private utils: UtilService) { }

  getDashboardAuditoriaPorFiltro(value: ModeloDashboardAuditoriaPorFiltro){
    debugger;
    let parametros = new HttpParams();
    parametros = parametros.append('empresa',value.empresa);
    parametros = parametros.append('planta',value.planta);
    parametros = parametros.append('responsableInvetsa',value.responsableInvetsa.toString());
    parametros = parametros.append('responsablePlanta',value.responsablePlanta);
    parametros = parametros.append('tipo',value.tipo.toString());
    parametros = parametros.append('lineaGenetica',value.lineaGenetica.toString());
    parametros = parametros.append('vacunador',value.vacunador);
    parametros = parametros.append('fechaInicio',this.utils.fecha_AAAAMMDD(value.fechaInicio));
    parametros = parametros.append('fechaFin',this.utils.fecha_AAAAMMDD(value.fechaFin));
    parametros = parametros.append('idDashboard',value.idDashboard.toString());
    parametros = parametros.append('idUsuario',value.idUsuario.toString());  
  
    return this.http.get<DashboardAuditoria[]>
    (`${environment.url_api}DashboardAuditoria/GetAll/`, { params: parametros });  
  }
}
