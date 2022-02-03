import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { BoquillaModel } from '../models/boquilla.model';
import { environment } from 'src/environments/environment';
import { VacunaModel } from '../models/vacuna.model';
import { ProcesoSprayModel } from '../models/proceso-spray.model';
import { ProcesoDetalleSprayModel } from '../models/proceso-detalle-spray.model';
import { TxVacunacionSprayModel } from '../models/tx-vacunacion-spray.model';

@Injectable({
  providedIn: 'root'
})
export class VacunacionSprayService {

  constructor(private http: HttpClient,
              private userContextService: UserContextService,
              private utilService: UtilService) { }

  // title:  Metodos para Boquilla
  // Author: Luis Tasayco
  // Date:   22/01/2021
  getBoquilla(value: BoquillaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionBoquilla', value.descripcionBoquilla);
    return this.http.get<BoquillaModel[]>
    (`${environment.url_api}Boquilla/GetAll/`, { params: parametros });
  }

  setInsertBoquilla(value: BoquillaModel) {
    value = this.setAsignaValoresAuditabilidad<BoquillaModel>(value);
    const url = environment.url_api + 'Boquilla/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateBoquilla(value: BoquillaModel) {
    value = this.setAsignaValoresAuditabilidad<BoquillaModel>(value);
    const url = environment.url_api + 'Boquilla/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteBoquilla(value: BoquillaModel) {
    value = this.setAsignaValoresAuditabilidad<BoquillaModel>(value);
    const url = environment.url_api + 'Boquilla/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getVacuna(value: VacunaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionVacuna', value.descripcionVacuna);
    return this.http.get<VacunaModel[]>
    (`${environment.url_api}Vacuna/GetAll/`, { params: parametros });
  }

  setInsertVacuna(value: VacunaModel) {
    value = this.setAsignaValoresAuditabilidad<VacunaModel>(value);
    const url = environment.url_api + 'Vacuna/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateVacuna(value: VacunaModel) {
    value = this.setAsignaValoresAuditabilidad<VacunaModel>(value);
    const url = environment.url_api + 'Vacuna/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteVacuna(value: VacunaModel) {
    value = this.setAsignaValoresAuditabilidad<VacunaModel>(value);
    const url = environment.url_api + 'Vacuna/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  private setAsignaValoresAuditabilidad<T>(data: any): T{
    data.regUsuario = this.userContextService.getIdUsuario();
    data.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    return data;
  }

  getProcesoSpray(value: ProcesoSprayModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionProcesoSpray', value.descripcionProcesoSpray);
    return this.http.get<ProcesoSprayModel[]>
    (`${environment.url_api}ProcesoSpray/GetAll/`, { params: parametros });
  }

  setInsertProcesoSpray(value: ProcesoSprayModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoSprayModel>(value);
    const url = environment.url_api + 'ProcesoSpray/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProcesoSpray(value: ProcesoSprayModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoSprayModel>(value);
    const url = environment.url_api + 'ProcesoSpray/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProcesoSpray(value: ProcesoSprayModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoSprayModel>(value);
    const url = environment.url_api + 'ProcesoSpray/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getProcesoDetalleSpray(value: ProcesoDetalleSprayModel) {
    let parametros = new HttpParams();

    parametros = parametros.append('idProcesoSpray', value.idProcesoSpray.toString());
    return this.http.get<ProcesoDetalleSprayModel[]>
    (`${environment.url_api}ProcesoDetalleSpray/GetAll/`, { params: parametros });
  }

  setInsertProcesoDetalleSpray(value: ProcesoDetalleSprayModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoDetalleSprayModel>(value);
    const url = environment.url_api + 'ProcesoDetalleSpray/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProcesoDetalleSpray(value: ProcesoDetalleSprayModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoDetalleSprayModel>(value);
    const url = environment.url_api + 'ProcesoDetalleSpray/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProcesoDetalleSpray(value: ProcesoDetalleSprayModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoDetalleSprayModel>(value);
    const url = environment.url_api + 'ProcesoDetalleSpray/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Vacunacion Spray
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getTxVacunacionSprayPorFiltros(id: number, codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('idVacunacionSpray', id.toString());
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utilService.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utilService.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxVacunacionSprayModel[]>
    (`${environment.url_api}TxVacunacionSpray/GetAll/`, { params: parametros });
  }

  getTxVacunacionSprayPorId(id: number) {
    return this.http.get<TxVacunacionSprayModel>
    (`${environment.url_api}TxVacunacionSpray/GetByIdTxVacunacionSpray/${id}`);
  }

  getTxVacunacionSprayPorIdNew() {
    return this.http.get<TxVacunacionSprayModel>
    (`${environment.url_api}TxVacunacionSpray/GetByDetalleNew`);
  }

  setInsertTxVacunacionSpray(value: TxVacunacionSprayModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSpray/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setInsertFromSyncTxVacunacionSpray(value: TxVacunacionSprayModel) {
    value.regUsuario = (value.regUsuario || undefined) ?? this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSpray/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxVacunacionSpray(value: TxVacunacionSprayModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSpray/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxVacunacionSpray(value: TxVacunacionSprayModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.idUsuarioCierre = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSpray/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxVacunacionSpray(value: TxVacunacionSprayModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSpray/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxVacunacionSpray(id: number) {
    return this.http.get
    (`${environment.url_api}TxVacunacionSpray/GetGeneraPdfByIdTxVacunacionSpray/${id}`, { responseType: 'arraybuffer' });
  }
}
