import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { OrganoModel } from '../models/organo.model';
import { environment } from 'src/environments/environment.prod';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { OrganoDetalleModel } from '../models/organo-detalle.model';
import { TxSINMIModel } from '../models/tx-sinmi.model';
import { TxSINMIDetalleModel } from '../models/tx-sinmi-detalle.model';
import { TxSINMIConsolidado } from '../models/tx-sinmi-consolidado.model';

@Injectable({
  providedIn: 'root'
})
export class SinmiService {

  constructor(private http: HttpClient,
              private userContextService: UserContextService,
              private utilService: UtilService) { }

  getOrgano(value: OrganoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionOrgano', value.descripcionOrgano);
    return this.http.get<OrganoModel[]>
    (`${environment.url_api}Organo/GetAll/`, { params: parametros });
  }

  setInsertOrgano(value: OrganoModel) {
    value = this.setAsignaValoresAuditabilidad<OrganoModel>(value);
    const url = environment.url_api + 'Organo/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateOrgano(value: OrganoModel) {
    value = this.setAsignaValoresAuditabilidad<OrganoModel>(value);
    const url = environment.url_api + 'Organo/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteOrgano(value: OrganoModel) {
    value = this.setAsignaValoresAuditabilidad<OrganoModel>(value);
    const url = environment.url_api + 'Organo/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getOrganoDetalle(value: OrganoDetalleModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idOrgano', value.idOrgano.toString());
    parametros = parametros.append('descripcionOrganoDetalle', value.descripcionOrganoDetalle);
    return this.http.get<OrganoDetalleModel[]>
    (`${environment.url_api}OrganoDetalle/GetAll/`, { params: parametros });
  }

  setInsertOrganoDetalle(value: OrganoDetalleModel) {
    value = this.setAsignaValoresAuditabilidad<OrganoDetalleModel>(value);
    const url = environment.url_api + 'OrganoDetalle/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateOrganoDetalle(value: OrganoDetalleModel) {
    value = this.setAsignaValoresAuditabilidad<OrganoDetalleModel>(value);
    const url = environment.url_api + 'OrganoDetalle/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteOrganoDetalle(value: OrganoDetalleModel) {
    value = this.setAsignaValoresAuditabilidad<OrganoDetalleModel>(value);
    const url = environment.url_api + 'OrganoDetalle/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

// title:  Metodos para TrExamen Fisico Pollito
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getTxSINMIPorFiltros(id: number, codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('idSINMI', id.toString());
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utilService.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utilService.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxSINMIModel[]>
    (`${environment.url_api}TxSINMI/GetAll/`, { params: parametros });
  }

  getTxSINMIDetalleNew() {
    return this.http.get<TxSINMIDetalleModel[]>
    (`${environment.url_api}TxSINMI/GetAllDetalleNew/`);
  }

  getTxSINMIPorId(id: number) {
    return this.http.get<TxSINMIModel>
    (`${environment.url_api}TxSINMI/GetByIdTxSINMI/${id}`);
  }

  setInsertTxSINMI(value: TxSINMIModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMI/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxSINMI(value: TxSINMIModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMI/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxSINMI(value: TxSINMIModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.idUsuarioCierre = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMI/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxSINMI(value: TxSINMIModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMI/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxSINMI(id: number) {
    return this.http.get
    (`${environment.url_api}TxSINMI/GetGeneraPdfByIdTxSINMI/${id}`, { responseType: 'arraybuffer' });
  }

  getTxSINMIConsolidadoPorFiltros(codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utilService.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utilService.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxSINMIConsolidado[]>
    (`${environment.url_api}TxSINMIConsolidado/GetAll/`, { params: parametros });
  }

  getTxSINMIConsolidadoPorCodigoEmpresa(codigoEmpresa: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    return this.http.get<TxSINMIModel[]>
    (`${environment.url_api}TxSINMI/GetByCodigoEmpresa/`, { params: parametros });
  }

  getTxSINMIConsolidadoPorId(id: number) {
    return this.http.get<TxSINMIConsolidado>
    (`${environment.url_api}TxSINMIConsolidado/GetByIdTxSINMIConsolidado/${id}`);
  }

  setInsertTxSINMIConsolidado(value: TxSINMIConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMIConsolidado/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxSINMIConsolidado(value: TxSINMIConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMIConsolidado/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxSINMIConsolidado(value: TxSINMIConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMIConsolidado/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxSINMIConsolidado(value: TxSINMIConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSINMIConsolidado/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxSINMIConsolidado(id: number, descripcionEmpresa: string) {
    return this.http.get
    (`${environment.url_api}TxSINMIConsolidado/GetGeneraPdfByIdTxSINMIConsolidado/?id=${id}&descripcionEmpresa=${descripcionEmpresa}`, { responseType: 'arraybuffer' });
  }

  private setAsignaValoresAuditabilidad<T>(data: any): T{
    data.regUsuario = this.userContextService.getIdUsuario();
    data.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    return data;
  }
}
