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

  getDashboardAuditoriaPorFiltro(value: any){
    debugger;
    let parametros = new HttpParams();
    parametros = parametros.append('planta', JSON.stringify(value.planta));
    parametros = parametros.append('responsableInvetsa',JSON.stringify(value.responsableInvetsa));
    parametros = parametros.append('responsablePlanta',JSON.stringify(value.responsablePlanta));
    parametros = parametros.append('lineaGenetica',JSON.stringify(value.lineaGenetica));
    parametros = parametros.append('vacunador',JSON.stringify(value.vacunador));

    parametros = parametros.append('tipo',value.tipo.toString());
    parametros = parametros.append('fechaInicio',this.utils.fecha_AAAAMMDD(value.fechaInicio));
    parametros = parametros.append('fechaFin',this.utils.fecha_AAAAMMDD(value.fechaFin));
    parametros = parametros.append('idDashboard',value.idDashboard.toString());
    parametros = parametros.append('idUsuario',value.idUsuario.toString());  
  
    return this.http.get<DashboardAuditoria[]>
    (`${environment.url_api}DashboardAuditoria/GetAll/`, { params: parametros });  
  }
}
