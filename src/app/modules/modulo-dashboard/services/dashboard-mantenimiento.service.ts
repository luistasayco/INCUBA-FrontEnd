import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { UserContextService } from '../../../services/user-context.service';
import { DashboardMantenimientoPorFiltro, DashboardMantenimiento } from '../models/dashboard-mantenimiento-por-filtro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardMantenimientoService {

  constructor(private http: HttpClient,
              private utils: UtilService,
              private userContextService: UserContextService) {}
  
  getDashboardMantenimientoPorFiltro(value: DashboardMantenimientoPorFiltro){
    debugger;
    let parametros = new HttpParams();
    parametros = parametros.append('fechaInicio', this.utils.fecha_AAAAMMDD(value.fechaInicio));
    parametros = parametros.append('fechaFin', this.utils.fecha_AAAAMMDD(value.fechaFin));
    parametros = parametros.append('tecnico', value.tecnico.toString());
    parametros = parametros.append('idDashboard', value.idDashboard.toString());
    parametros = parametros.append('empresa',value.empresa);
    parametros = parametros.append('modelo',value.modelo);
    parametros = parametros.append('equipo',value.equipo);
  
    return this.http.get<DashboardMantenimiento[]>
    (`${environment.url_api}DashboardMantenimiento/GetAll/`, { params: parametros });
  }

}
