import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { TipoExplotacionModel } from '../models/tipo-explotacion.model';
import { environment } from 'src/environments/environment.prod';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { SubTipoExplotacionModel } from '../models/sub-tipo-explotacion.model';
import { TxRegistroDocumentoModel } from '../models/tx-registro-documento.model';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { GoogleDriveFilesModel } from '../models/google-drive-files.model';

@Injectable({
  providedIn: 'root'
})
export class ExtranetService {

  constructor(private http: HttpClient,
              private userContextService: UserContextService,
              private utilService: UtilService) { }

  // title:  Metodos para Tipo Explotacion
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getTipoExplotacion(value: TipoExplotacionModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionTipoExplotacion', value.descripcionTipoExplotacion);
    return this.http.get<TipoExplotacionModel[]>
    (`${environment.url_api}TipoExplotacion/GetAll/`, { params: parametros });
  }

  getTipoExplotacionPorUsuario() {
    let parametros = new HttpParams();
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TipoExplotacionModel[]>
    (`${environment.url_api}TipoExplotacion/GetAllPorUsuario/`, { params: parametros });
  }

  setInsertTipoExplotacion(value: TipoExplotacionModel) {
    value = this.setAsignaValoresAuditabilidad<TipoExplotacionModel>(value);
    const url = environment.url_api + 'TipoExplotacion/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTipoExplotacion(value: TipoExplotacionModel) {
    value = this.setAsignaValoresAuditabilidad<TipoExplotacionModel>(value);
    const url = environment.url_api + 'TipoExplotacion/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTipoExplotacion(value: TipoExplotacionModel) {
    value = this.setAsignaValoresAuditabilidad<TipoExplotacionModel>(value);
    const url = environment.url_api + 'TipoExplotacion/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Sub Tipo Explotacion
  // Author: Luis Tasayco
  // Date:   02/09/2020
  getSubTipoExplotacion(value: SubTipoExplotacionModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idTipoExplotacion', value.idTipoExplotacion.toString());
    parametros = parametros.append('descripcionSubTipoExplotacion', value.descripcionSubTipoExplotacion);
    return this.http.get<SubTipoExplotacionModel[]>
    (`${environment.url_api}SubTipoExplotacion/GetAll/`, { params: parametros });
  }

  getSubTipoExplotacionPorUsuario(idTipoExplotacion: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idTipoExplotacion', idTipoExplotacion.toString());
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<SubTipoExplotacionModel[]>
    (`${environment.url_api}SubTipoExplotacion/GetAllPorUsuario/`, { params: parametros });
  }

  setInsertSubTipoExplotacion(value: SubTipoExplotacionModel) {
    value = this.setAsignaValoresAuditabilidad<SubTipoExplotacionModel>(value);
    const url = environment.url_api + 'SubTipoExplotacion/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateSubTipoExplotacion(value: SubTipoExplotacionModel) {
    value = this.setAsignaValoresAuditabilidad<SubTipoExplotacionModel>(value);
    const url = environment.url_api + 'SubTipoExplotacion/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteSubTipoExplotacion(value: SubTipoExplotacionModel) {
    value = this.setAsignaValoresAuditabilidad<SubTipoExplotacionModel>(value);
    const url = environment.url_api + 'SubTipoExplotacion/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Registro Documento
  // Author: Luis Tasayco
  // Date:   17/11/2020
  getTxRegistroDocumento(value: TxRegistroDocumentoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idSubTipoExplotacion', value.idSubTipoExplotacion.toString());
    parametros = parametros.append('codigoEmpresa', value.codigoEmpresa);
    parametros = parametros.append('codigoPlanta', value.codigoPlanta);
    parametros = parametros.append('fecInicio', this.utilService.fecha_AAAAMMDD(value.fecInicio));
    parametros = parametros.append('fecFin', this.utilService.fecha_AAAAMMDD(value.fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxRegistroDocumentoModel[]>
    (`${environment.url_api}TxRegistroDocumento/GetAll/`, { params: parametros });
  }

  getTxRegistroDocumentoId(id: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idDocumento', id.toString());
    return this.http.get<TxRegistroDocumentoModel[]>
    (`${environment.url_api}TxRegistroDocumento/GetByIdDocumento/${id}`);
  }

  getTxRegistroDocumentoDrive() {
   return this.http.get<TxRegistroDocumentoModel[]>
    (`${environment.url_api}TxRegistroDocumento/GetFileGoogleDrive`);
  }

  setInsertTxRegistroDocumento(value: string, filesToUpload: any[]) {
    let formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element: any) => {
      formData.append('archivo', element);
    });

    const url = environment.url_api + 'TxRegistroDocumento/Create';
    // const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        formData,
        {
          reportProgress: true,
          observe: 'events'
        }
    );
  }

  setInsertTxRegistroDocumentoList(value: string, filesToUpload: any[]) {
    let formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element: any) => {
      formData.append('archivo', element);
    });

    const url = environment.url_api + 'TxRegistroDocumento/CreateFiles';
    // const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        formData,
        {
          reportProgress: true,
          observe: 'events'
        }
    );
  }

  setUpdateTxRegistroDocumento(value: TxRegistroDocumentoModel) {
    value = this.setAsignaValoresAuditabilidad<TxRegistroDocumentoModel>(value);
    const url = environment.url_api + 'TxRegistroDocumento/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxRegistroDocumento(value: TxRegistroDocumentoModel) {
    value = this.setAsignaValoresAuditabilidad<TxRegistroDocumentoModel>(value);
    const url = environment.url_api + 'TxRegistroDocumento/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setUpdateStatusTxRegistroDocumento(value: TxRegistroDocumentoModel) {
    value = this.setAsignaValoresAuditabilidad<TxRegistroDocumentoModel>(value);
    const url = environment.url_api + 'TxRegistroDocumento/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  getDownloadTxRegistroDocumento(id: string) {
    return this.http.get
    (`${environment.url_api}TxRegistroDocumento/GetDownloadFile/${id}`,
    {responseType: 'blob',  observe: 'response', reportProgress: true });
  }

  getDownloadTxRegistroDocumentoByte(id: string) {
    return this.http.get
    (`${environment.url_api}TxRegistroDocumento/GetDownloadFileByte/${id}`,
    {responseType: 'arraybuffer',  observe: 'response', reportProgress: true });
  }

  getDownloadTxRegistroDocumentoBase64(id: string) {
    return this.http.get
    (`${environment.url_api}TxRegistroDocumento/GetDownloadFileBase64/${id}`);
  }

  private setAsignaValoresAuditabilidad<T>(data: any): T{
    data.regUsuario = this.userContextService.getIdUsuario();
    data.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    return data;
  }

  getAllEmpresaPorUsuario() {
    let id = Number(this.userContextService.getIdUsuario());
    return this.http.get<GoogleDriveFilesModel[]>
    (`${environment.url_api}TxRegistroDocumento/GetAllEmpresaPorUsuario/${id}`);
  }

  getGoogleDriveFilesPorId(id: string) {
    return this.http.get<GoogleDriveFilesModel[]>
    (`${environment.url_api}TxRegistroDocumento/GetGoogleDriveFilesPorId/${id}`);
  }

  getGetUrlFilePorId(id: string,permissionValue: string, userRule: string ) {
    return this.http.get<boolean>
    (`${environment.url_api}TxRegistroDocumento/GetUrlFilePorId/?id=${id}&permissionValue=${permissionValue}&userRule=${userRule}`);
  }
}
