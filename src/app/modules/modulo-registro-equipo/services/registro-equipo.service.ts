import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MantenimientoModel } from '../models/mantenimiento.model';
import { environment } from 'src/environments/environment';
import { CondicionLimpiezaModel } from '../models/condicion-limpieza.model';
import { ModeloModel } from '../models/modelo.model';
import { EquipoPorModeloModel } from '../models/equipo-por-modelo.model';
import { MantenimientoPorModeloModel } from '../models/mantenimiento-por-modelo.model';
import { RepuestoPorModeloModel } from '../models/repuesto-por-modelo.model';
import { RequerimientoEquipoModel } from '../models/requerimiento-equipo.model';
import { TxRegistroEquipoModel } from '../models/tx-registro-equipo.model';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { TxRegistroEquipoDetalle1Model } from '../models/tx-registro-equipo-detalle1.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroEquipoService {

  constructor(private http: HttpClient, private utils: UtilService) { }

  // title:  Metodos para Mantenimiento
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getMantenimiento(value: MantenimientoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);

    return this.http.get<MantenimientoModel[]>
    (`${environment.url_api}Mantenimiento/GetAll/`, { params: parametros });
  }

  setInsertMantenimiento(value: MantenimientoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Mantenimiento/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setUpdateMantenimiento(value: MantenimientoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Mantenimiento/Update';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteMantenimiento(value: MantenimientoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Mantenimiento/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

  // title:  Metodos para Condicion de Limpieza
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getCondicionLimpieza(value: CondicionLimpiezaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);

    return this.http.get<CondicionLimpiezaModel[]>
    (`${environment.url_api}CondicionLimpieza/GetAll/`, { params: parametros });
  }

  setInsertCondicionLimpieza(value: CondicionLimpiezaModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'CondicionLimpieza/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setUpdateCondicionLimpieza(value: CondicionLimpiezaModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'CondicionLimpieza/Update';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteCondicionLimpieza(value: CondicionLimpiezaModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'CondicionLimpieza/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

 // title:  Metodos para Condicion de Limpieza
  // Author: Luis Tasayco
  // Date:   09/09/2020
  getRequerimientoEquipo(value: RequerimientoEquipoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);

    return this.http.get<RequerimientoEquipoModel[]>
    (`${environment.url_api}RequerimientoEquipo/GetAll/`, { params: parametros });
  }

  setInsertRequerimientoEquipo(value: RequerimientoEquipoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'RequerimientoEquipo/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setUpdateRequerimientoEquipo(value: RequerimientoEquipoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'RequerimientoEquipo/Update';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteRequerimientoEquipo(value: RequerimientoEquipoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'RequerimientoEquipo/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

  // title:  Metodos para Modelo
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getModelo(value: ModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);

    return this.http.get<ModeloModel[]>
    (`${environment.url_api}Modelo/GetAll/`, { params: parametros });
  }

  setInsertModelo(value: ModeloModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Modelo/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setUpdateModelo(value: ModeloModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Modelo/Update';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteModelo(value: ModeloModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;
    const url = environment.url_api + 'Modelo/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

  // title:  Metodos de equipo
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getEquipoSeleccionados(value: EquipoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());

    return this.http.get<EquipoPorModeloModel[]>
    (`${environment.url_api}EquipoPorModelo/GetAllSeleccionado/`, { params: parametros });
  }

  getEquipoPorSeleccionar(value: EquipoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());

    return this.http.get<EquipoPorModeloModel[]>
    (`${environment.url_api}EquipoPorModelo/GetAllPorSeleccionar/`, { params: parametros });
  }

  setInsertEquipoPorModelo(value: EquipoPorModeloModel[]) {
    const url = environment.url_api + 'EquipoPorModelo/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteEquipoPorModelo(value: EquipoPorModeloModel[]) {
    const url = environment.url_api + 'EquipoPorModelo/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

  // title:  Metodos de mantenimiento
  // Author: Luis Tasayco
  // Date:   08/09/2020
  getMantenimientoSeleccionados(value: MantenimientoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());

    return this.http.get<MantenimientoPorModeloModel[]>
    (`${environment.url_api}MantenimientoPorModelo/GetAllSeleccionado/`, { params: parametros });
  }

  getMantenimientoPorSeleccionar(value: MantenimientoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());

    return this.http.get<MantenimientoPorModeloModel[]>
    (`${environment.url_api}MantenimientoPorModelo/GetAllPorSeleccionar/`, { params: parametros });
  }

  setInsertMantenimientoPorModelo(value: MantenimientoPorModeloModel[]) {
    const url = environment.url_api + 'MantenimientoPorModelo/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteMantenimientoPorModelo(value: MantenimientoPorModeloModel[]) {
    const url = environment.url_api + 'MantenimientoPorModelo/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

   // title:  Metodos de Repuesto
  // Author: Luis Tasayco
  // Date:   08/09/2020
  getRepuestoSeleccionados(value: RepuestoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());

    return this.http.get<RepuestoPorModeloModel[]>
    (`${environment.url_api}RepuestoPorModelo/GetAllSeleccionado/`, { params: parametros });
  }

  getRepuestoPorSeleccionar(value: RepuestoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());

    return this.http.get<RepuestoPorModeloModel[]>
    (`${environment.url_api}RepuestoPorModelo/GetAllPorSeleccionar/`, { params: parametros });
  }

  setInsertRepuestoPorModelo(value: RepuestoPorModeloModel[]) {
    const url = environment.url_api + 'RepuestoPorModelo/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  setDeleteRepuestoPorModelo(value: RepuestoPorModeloModel[]) {
    const url = environment.url_api + 'RepuestoPorModelo/Delete';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param,
        { headers: myHeader }
    );
  }

  // title:  Metodos de Repuesto
  // Author: Luis Tasayco
  // Date:   08/09/2020
  getTxRegistroEquipo(value: TxRegistroEquipoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('idModelo', value.idModelo.toString());
    parametros = parametros.append('fecRegistroInicio', this.utils.fecha_AAAAMMDD(value.fecRegistroInicio));
    parametros = parametros.append('fecRegistroFin', this.utils.fecha_AAAAMMDD(value.fecRegistroFin));
    parametros = parametros.append('idRegistroEquipo', value.idRegistroEquipo.toString());

    return this.http.get<TxRegistroEquipoModel[]>
    (`${environment.url_api}TxRegistroEquipo/GetAll/`, { params: parametros });
  }

  getTxRegistroEquipoNewItem(codigoEmpresa: string, codigoPlanta: string, idModelo: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('codigoPlanta', codigoPlanta);
    parametros = parametros.append('idModelo', idModelo.toString());

    return this.http.get<TxRegistroEquipoModel>
    (`${environment.url_api}TxRegistroEquipo/GetNewObject/`, { params: parametros });
  }

  getTxRegistroEquipoDetalle1PorFiltros(codigoEmpresa: string, codigoPlanta: string, idModelo: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('codigoPlanta', codigoPlanta);
    parametros = parametros.append('idModelo', idModelo.toString());

    return this.http.get<TxRegistroEquipoDetalle1Model[]>
    (`${environment.url_api}TxRegistroEquipoDetalle1/GetAll/`, { params: parametros });
  }

  getTxRegistroEquipoPorId(id: number) {
    // let parametros = new HttpParams();
    // parametros = parametros.append('codigoEidmpresa', codigoEmpresa);
    // parametros = parametros.append('codigoPlanta', codigoPlanta);
    // parametros = parametros.append('idModelo', idModelo.toString());

    return this.http.get<TxRegistroEquipoModel>
    (`${environment.url_api}TxRegistroEquipo/GetByIdTxRegistroEquipo/${id}`);
  }

  setInsertTxRegistroEquipo(value: TxRegistroEquipoModel) {
    value.regUsuario = environment.usuario;
    value.regEstacion = environment.estacion;

    console.log('this.modeloItem', value);

    const url = environment.url_api + 'TxRegistroEquipo/Create';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set( 'Content-Type', 'application/json');
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param,
        { headers: myHeader }
    );
  }

  getCarsSmall() {
    return this.http.get<any>('assets/demo/data/cars-small.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
}

}