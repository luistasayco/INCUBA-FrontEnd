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
import { UserContextService } from '../../../services/user-context.service';
import { variableGlobal } from '../../../interface/variable-global.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroEquipoService {

  constructor(private http: HttpClient,
              private utils: UtilService,
              private userContextService: UserContextService) {}

  // title:  Metodos para Mantenimiento
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getMantenimiento(value?: MantenimientoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value ? value.descripcion : '');

    return this.http.get<MantenimientoModel[]>
    (`${environment.url_api}Mantenimiento/GetAll/`, { params: parametros });
  }

  setInsertMantenimiento(value: MantenimientoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Mantenimiento/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateMantenimiento(value: MantenimientoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Mantenimiento/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteMantenimiento(value: MantenimientoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Mantenimiento/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Condicion de Limpieza
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getCondicionLimpieza(value?: CondicionLimpiezaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value ? value.descripcion : '');

    return this.http.get<CondicionLimpiezaModel[]>
    (`${environment.url_api}CondicionLimpieza/GetAll/`, { params: parametros });
  }

  setInsertCondicionLimpieza(value: CondicionLimpiezaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'CondicionLimpieza/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateCondicionLimpieza(value: CondicionLimpiezaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'CondicionLimpieza/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteCondicionLimpieza(value: CondicionLimpiezaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'CondicionLimpieza/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

 // title:  Metodos para Condicion de Limpieza
  // Author: Luis Tasayco
  // Date:   09/09/2020
  getRequerimientoEquipo(value?: RequerimientoEquipoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value ? value.descripcion : '');

    return this.http.get<RequerimientoEquipoModel[]>
    (`${environment.url_api}RequerimientoEquipo/GetAll/`, { params: parametros });
  }

  setInsertRequerimientoEquipo(value: RequerimientoEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'RequerimientoEquipo/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateRequerimientoEquipo(value: RequerimientoEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'RequerimientoEquipo/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteRequerimientoEquipo(value: RequerimientoEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'RequerimientoEquipo/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Modelo
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getModelo(value?: ModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value ? value.descripcion : '');

    return this.http.get<ModeloModel[]>
    (`${environment.url_api}Modelo/GetAll/`, { params: parametros });
  }

  // title:  Metodos de equipo
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getEquipoSeleccionados(value: EquipoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('codigoModelo', value.codigoModelo);

    return this.http.get<EquipoPorModeloModel[]>
    (`${environment.url_api}EquipoPorModelo/GetAllSeleccionado/`, { params: parametros });
  }

  // title:  Metodos de mantenimiento
  // Author: Luis Tasayco
  // Date:   08/09/2020
  getMantenimientoSeleccionados(value: MantenimientoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoModelo', value.codigoModelo);

    return this.http.get<MantenimientoPorModeloModel[]>
    (`${environment.url_api}MantenimientoPorModelo/GetAllSeleccionado/`, { params: parametros });
  }

  getMantenimientoPorSeleccionar(value: MantenimientoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoModelo', value.codigoModelo);

    return this.http.get<MantenimientoPorModeloModel[]>
    (`${environment.url_api}MantenimientoPorModelo/GetAllPorSeleccionar/`, { params: parametros });
  }

  setInsertMantenimientoPorModelo(value: MantenimientoPorModeloModel[]) {
    value.map(dato => {
      dato.regUsuario = this.userContextService.getIdUsuario(),
      dato.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo
      return dato;
    });
    const url = environment.url_api + 'MantenimientoPorModelo/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setDeleteMantenimientoPorModelo(value: MantenimientoPorModeloModel[]) {
    value.map(dato => {
      dato.regUsuario = this.userContextService.getIdUsuario(),
      dato.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo
      return dato;
    });
    const url = environment.url_api + 'MantenimientoPorModelo/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

   // title:  Metodos de Repuesto
  // Author: Luis Tasayco
  // Date:   08/09/2020
  getRepuestoSeleccionados(value: RepuestoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoModelo', value.codigoModelo);

    return this.http.get<RepuestoPorModeloModel[]>
    (`${environment.url_api}RepuestoPorModelo/GetAllSeleccionado/`, { params: parametros });
  }

  getRepuestoPorSeleccionar(value: RepuestoPorModeloModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoModelo', value.codigoModelo);

    return this.http.get<RepuestoPorModeloModel[]>
    (`${environment.url_api}RepuestoPorModelo/GetAllPorSeleccionar/`, { params: parametros });
  }

  setInsertRepuestoPorModelo(value: RepuestoPorModeloModel[]) {
    value.map(dato => {
      dato.regUsuario = this.userContextService.getIdUsuario(),
      dato.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo
      return dato;
    });
    const url = environment.url_api + 'RepuestoPorModelo/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setDeleteRepuestoPorModelo(value: RepuestoPorModeloModel[]) {
    value.map(dato => {
      dato.regUsuario = this.userContextService.getIdUsuario(),
      dato.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo
      return dato;
    });
    const url = environment.url_api + 'RepuestoPorModelo/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos de Repuesto
  // Author: Luis Tasayco
  // Date:   08/09/2020
  getTxRegistroEquipo(value: TxRegistroEquipoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('codigoModelo', value.codigoModelo);
    parametros = parametros.append('fecRegistroInicio', this.utils.fecha_AAAAMMDD(value.fecRegistroInicio));
    parametros = parametros.append('fecRegistroFin', this.utils.fecha_AAAAMMDD(value.fecRegistroFin));
    parametros = parametros.append('idRegistroEquipo', value.idRegistroEquipo.toString());
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());

    return this.http.get<TxRegistroEquipoModel[]>
    (`${environment.url_api}TxRegistroEquipo/GetAll/`, { params: parametros });
  }

  getTxRegistroEquipoNewItem(codigoEmpresa: string, codigoPlanta: string, codigoModelo: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('codigoPlanta', codigoPlanta);
    parametros = parametros.append('codigoModelo', codigoModelo);

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
    return this.http.get<TxRegistroEquipoModel>
    (`${environment.url_api}TxRegistroEquipo/GetByIdTxRegistroEquipo/${id}`);
  }

  setInsertTxRegistroEquipo(value: TxRegistroEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxRegistroEquipo/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxRegistroEquipo(value: TxRegistroEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxRegistroEquipo/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxRegistroEquipo(value: TxRegistroEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxRegistroEquipo/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxRegistroEquipo(value: TxRegistroEquipoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxRegistroEquipo/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxRegistroEquipo(id: number) {
    return this.http.get
    (`${environment.url_api}TxRegistroEquipo/GetGeneraPdfByIdTxRegistroEquipo/${id}`, { responseType: 'arraybuffer' });
  }

  getCarsSmall() {
    return this.http.get<any>('assets/demo/data/cars-small.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

}
