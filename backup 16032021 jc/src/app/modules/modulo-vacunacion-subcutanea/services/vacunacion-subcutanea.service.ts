import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { environment } from 'src/environments/environment';
import { AgujaModel } from '../models/aguja.model';
import { ProcesoSubCutaneaModel } from '../models/proceso-subcutanea.model';
import { IrregularidadModel } from '../models/irregularidad.model';
import { ProcesoDetalleSubCutaneaModel } from '../models/proceso-detalle-subcutanea';
import { TxVacunacionSubCutaneaModel } from '../models/tx-vacunacion-subcutanea.model';
import { IndiceEficienciaModel } from '../models/indice-eficiencia.model';

@Injectable({
  providedIn: 'root'
})
export class VacunacionSubcutaneaService {

  constructor(private http: HttpClient,
              private userContextService: UserContextService,
              private utilService: UtilService) { }

  private setAsignaValoresAuditabilidad<T>(data: any): T{
    data.regUsuario = this.userContextService.getIdUsuario();
    data.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    return data;
  }

  getAguja(value: AgujaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionAguja', value.descripcionAguja);
    return this.http.get<AgujaModel[]>
    (`${environment.url_api}Aguja/GetAll/`, { params: parametros });
  }

  setInsertAguja(value: AgujaModel) {
    value = this.setAsignaValoresAuditabilidad<AgujaModel>(value);
    const url = environment.url_api + 'Aguja/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateAguja(value: AgujaModel) {
    value = this.setAsignaValoresAuditabilidad<AgujaModel>(value);
    const url = environment.url_api + 'Aguja/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteAguja(value: AgujaModel) {
    value = this.setAsignaValoresAuditabilidad<AgujaModel>(value);
    const url = environment.url_api + 'Aguja/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getIrregularidad(value: IrregularidadModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionIrregularidad', value.descripcionIrregularidad);
    return this.http.get<IrregularidadModel[]>
    (`${environment.url_api}Irregularidad/GetAll/`, { params: parametros });
  }

  setInsertIrregularidad(value: IrregularidadModel) {
    value = this.setAsignaValoresAuditabilidad<IrregularidadModel>(value);
    const url = environment.url_api + 'Irregularidad/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateIrregularidad(value: IrregularidadModel) {
    value = this.setAsignaValoresAuditabilidad<IrregularidadModel>(value);
    const url = environment.url_api + 'Irregularidad/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteIrregularidad(value: IrregularidadModel) {
    value = this.setAsignaValoresAuditabilidad<IrregularidadModel>(value);
    const url = environment.url_api + 'Irregularidad/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getProcesoSubCutanea(value: ProcesoSubCutaneaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionProcesoSubCutanea', value.descripcionProcesoSubCutanea);
    return this.http.get<ProcesoSubCutaneaModel[]>
    (`${environment.url_api}ProcesoSubCutanea/GetAll/`, { params: parametros });
  }

  setInsertProcesoSubCutanea(value: ProcesoSubCutaneaModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoSubCutaneaModel>(value);
    const url = environment.url_api + 'ProcesoSubCutanea/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProcesoSubCutanea(value: ProcesoSubCutaneaModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoSubCutaneaModel>(value);
    const url = environment.url_api + 'ProcesoSubCutanea/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProcesoSubCutanea(value: ProcesoSubCutaneaModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoSubCutaneaModel>(value);
    const url = environment.url_api + 'ProcesoSubCutanea/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getProcesoDetalleSubCutanea(value: ProcesoDetalleSubCutaneaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idProcesoSubCutanea', value.idProcesoSubCutanea.toString());
    return this.http.get<ProcesoDetalleSubCutaneaModel[]>
    (`${environment.url_api}ProcesoDetalleSubCutanea/GetAll/`, { params: parametros });
  }

  setInsertProcesoDetalleSubCutanea(value: ProcesoDetalleSubCutaneaModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoDetalleSubCutaneaModel>(value);
    const url = environment.url_api + 'ProcesoDetalleSubCutanea/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateProcesoDetalleSubCutanea(value: ProcesoDetalleSubCutaneaModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoDetalleSubCutaneaModel>(value);
    const url = environment.url_api + 'ProcesoDetalleSubCutanea/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteProcesoDetalleSubCutanea(value: ProcesoDetalleSubCutaneaModel) {
    value = this.setAsignaValoresAuditabilidad<ProcesoDetalleSubCutaneaModel>(value);
    const url = environment.url_api + 'ProcesoDetalleSubCutanea/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getIndiceEficiencia(value: IndiceEficienciaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionIndiceEficiencia', value.descripcionIndiceEficiencia);
    return this.http.get<IndiceEficienciaModel[]>
    (`${environment.url_api}IndiceEficiencia/GetAll/`, { params: parametros });
  }
  // title:  Metodos para Vacunacion SubCutanea
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getTxVacunacionSubCutaneaPorFiltros(id: number, codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('idVacunacionSubCutanea', id.toString());
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utilService.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utilService.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxVacunacionSubCutaneaModel[]>
    (`${environment.url_api}TxVacunacionSubCutanea/GetAll/`, { params: parametros });
  }

  getTxVacunacionSubCutaneaPorId(id: number) {
    return this.http.get<TxVacunacionSubCutaneaModel>
    (`${environment.url_api}TxVacunacionSubCutanea/GetByIdTxVacunacionSubCutanea/${id}`);
  }

  getTxVacunacionSubCutaneaPorIdNew() {
    return this.http.get<TxVacunacionSubCutaneaModel>
    (`${environment.url_api}TxVacunacionSubCutanea/GetByDetalleNew`);
  }

  setInsertTxVacunacionSubCutanea(value: TxVacunacionSubCutaneaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSubCutanea/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxVacunacionSubCutanea(value: TxVacunacionSubCutaneaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSubCutanea/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxVacunacionSubCutanea(value: TxVacunacionSubCutaneaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.idUsuarioCierre = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSubCutanea/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxVacunacionSubCutanea(value: TxVacunacionSubCutaneaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxVacunacionSubCutanea/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxVacunacionSubCutanea(id: number) {
    return this.http.get
    (`${environment.url_api}TxVacunacionSubCutanea/GetGeneraPdfByIdTxVacunacionSpray/${id}`, { responseType: 'arraybuffer' });
  }
}
