import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { DashboardModelPorCategoria, DashboardModel } from '../models/dashboard-model.model';
import { environment } from 'src/environments/environment';
import { UserContextService } from 'src/app/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
              private utils: UtilService,
              private userContextService: UserContextService) { }

  getDashboardPorCategoria(value: DashboardModelPorCategoria){
    //  debugger;
    let parametros = new HttpParams();
    parametros = parametros.append('dashboardCategory',value.dashboardCategory);

    return this.http.get<DashboardModel[]>
    (`${environment.url_api}Dashboard/GetAll/`, { params: parametros });
  }
}
