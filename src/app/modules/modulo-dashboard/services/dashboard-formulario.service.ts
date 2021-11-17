import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModeloDashboardFormularioPorFiltro, ModeloDashboardFormulario } from '../models/modelo-dashboard-formulario.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardFormularioService {

  constructor(private http: HttpClient) { }

  getDashboardFormularioPorFiltro(value: ModeloDashboardFormularioPorFiltro){
    let parametros = new HttpParams();
    parametros = parametros.append('filtro', value.filtro.toString());
    parametros = parametros.append('planta', value.planta);

    return this.http.get<ModeloDashboardFormulario[]>
    (`${environment.url_api}DashboardFormulario/GetAll/`, { params: parametros }); 
  }
}
