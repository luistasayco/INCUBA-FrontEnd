import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ProcesoModel } from '../models/proceso.model';
import { environment } from 'src/environments/environment';
import { CalidadModel } from '../models/calidad.model';
import { ProcesoDetalleModel } from '../models/proceso-detalle.model';
import { UserContextService } from '../../../services/user-context.service';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { TxExamenFisicoPollitoModel } from '../models/tx-examen-fisico-pollito';
import { TxExamenFisicoPollitoDetalleModelNew } from '../models/tx-examen-fisico-pollito-detalle-new';

@Injectable({
  providedIn: 'root'
})
export class ExamenFisicoPollitoService {

  constructor(private http: HttpClient, private userContextService: UserContextService, private utils: UtilService) {
   }

  // title:  Metodos para Proceso
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getProceso(value: ProcesoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);
    return this.http.get<ProcesoModel[]>
    (`${environment.url_api}Proceso/GetAll/`, { params: parametros });
  }

  setInsertProceso(value: ProcesoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Proceso/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProceso(value: ProcesoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Proceso/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProceso(value: ProcesoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Proceso/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Proceso Detalle
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getProcesoDetalle(value: ProcesoDetalleModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idProceso', value.idProceso.toString());
    return this.http.get<ProcesoDetalleModel[]>
    (`${environment.url_api}ProcesoDetalle/GetAll/`, { params: parametros });
  }

  setInsertProcesoDetalle(value: ProcesoDetalleModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'ProcesoDetalle/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProcesoDetalle(value: ProcesoDetalleModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'ProcesoDetalle/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProcesoDetalle(value: ProcesoDetalleModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'ProcesoDetalle/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Calidad
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getCalidad(value: CalidadModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcion', value.descripcion);
    return this.http.get<ProcesoModel[]>
    (`${environment.url_api}Calidad/GetAll/`, { params: parametros });
  }

  setInsertCalidad(value: CalidadModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Calidad/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateCalidad(value: CalidadModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Calidad/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteCalidad(value: CalidadModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'Calidad/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para TrExamen Fisico Pollito
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getTxExamenFisicoPollitoPorFiltros(id: number, codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('idExamenFisico', id.toString());
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utils.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utils.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxExamenFisicoPollitoModel[]>
    (`${environment.url_api}TxExamenFisicoPollito/GetAll/`, { params: parametros });
  }

  getTxExamenFisicoPollitoPorId(id: number) {
    return this.http.get<TxExamenFisicoPollitoModel>
    (`${environment.url_api}TxExamenFisicoPollito/GetByIdTxExamenFisicoPollito/${id}`);
  }

  getTxExamenFisicoPollitoPorIdNew() {
    return this.http.get<TxExamenFisicoPollitoModel>
    (`${environment.url_api}TxExamenFisicoPollito/GetByIdTxExamenFisicoPollitoNew`);
  }

  getTxExamenFisicoPollitoDetalleNew() {
    return this.http.get<TxExamenFisicoPollitoDetalleModelNew>
    (`${environment.url_api}TxExamenFisicoPollito/GetByDetalleNew`);
  }

  setInsertExamenFisicoPollito(value: TxExamenFisicoPollitoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxExamenFisicoPollito/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setInsertFromSyncExamenFisicoPollito(value: TxExamenFisicoPollitoModel) {
    value.regUsuario = (value.regUsuario || undefined) ?? this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxExamenFisicoPollito/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxExamenFisicoPollito(value: TxExamenFisicoPollitoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxExamenFisicoPollito/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxExamenFisicoPollito(value: TxExamenFisicoPollitoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.idUsuarioCierre = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxExamenFisicoPollito/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteExamenFisicoPollito(value: TxExamenFisicoPollitoModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxExamenFisicoPollito/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFExamenFisicoPollito(id: number) {
    return this.http.get
    (`${environment.url_api}TxExamenFisicoPollito/GetGeneraPdfByIdTxExamenFisicoPollito/${id}`, { responseType: 'arraybuffer' });
  }
}
