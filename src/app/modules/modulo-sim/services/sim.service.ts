import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { UtilService } from '../../modulo-compartido/services/util.service';
import { TxSimUpdateComponent } from '../components/panel-tx-sim/tx-sim-update/tx-sim-update.component';
import { TxSIMModel } from '../models/tx-sim.model';
import { environment } from 'src/environments/environment';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { TxSIMConsolidado } from '../models/tx-sim-consolidado-model';

@Injectable({
  providedIn: 'root'
})
export class SimService {

  constructor(private http: HttpClient, private userContextService: UserContextService, private utils: UtilService) { }

  // title:  Metodos para TrExamen Fisico Pollito
  // Author: Luis Tasayco
  // Date:   04/09/2020
  getTxSIMPorFiltros(id: number, codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('idSIMS', id.toString());
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utils.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utils.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxSIMModel[]>
    (`${environment.url_api}TxSIM/GetAll/`, { params: parametros });
  }

  getTxSIMPorId(id: number) {
    return this.http.get<TxSIMModel>
    (`${environment.url_api}TxSIM/GetByIdTxSIM/${id}`);
  }

  setInsertTxSIM(value: TxSIMModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIM/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxSIM(value: TxSIMModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIM/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxSIM(value: TxSIMModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.idUsuarioCierre = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIM/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxSIM(value: TxSIMModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIM/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxSIM(id: number) {
    return this.http.get
    (`${environment.url_api}TxSIM/GetGeneraPdfByIdTxSIM/${id}`, { responseType: 'arraybuffer' });
  }

  getTxSIMConsolidadoPorFiltros(codigoEmpresa: string, fecInicio: Date, fecFin: Date) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    parametros = parametros.append('fecRegistroInicio', this.utils.fecha_AAAAMMDD(fecInicio));
    parametros = parametros.append('fecRegistroFin', this.utils.fecha_AAAAMMDD(fecFin));
    parametros = parametros.append('regUsuario', this.userContextService.getIdUsuario().toString());
    return this.http.get<TxSIMConsolidado[]>
    (`${environment.url_api}TxSIMConsolidado/GetAll/`, { params: parametros });
  }

  getTxSIMConsolidadoPorCodigoEmpresa(codigoEmpresa: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codigoEmpresa', codigoEmpresa);
    return this.http.get<TxSIMModel[]>
    (`${environment.url_api}TxSIM/GetByCodigoEmpresa/`, { params: parametros });
  }

  getTxSIMConsolidadoPorId(id: number) {
    return this.http.get<TxSIMConsolidado>
    (`${environment.url_api}TxSIMConsolidado/GetByIdTxSIMConsolidado/${id}`);
  }

  setInsertTxSIMConsolidado(value: TxSIMConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIMConsolidado/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateTxSIMConsolidado(value: TxSIMConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIMConsolidado/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdateStatusTxSIMConsolidado(value: TxSIMConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIMConsolidado/UpdateStatus';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeleteTxSIMConsolidado(value: TxSIMConsolidado) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api + 'TxSIMConsolidado/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  setPDFTxSIMConsolidado(id: number, descripcionEmpresa: string) {
    return this.http.get
    (`${environment.url_api}TxSIMConsolidado/GetGeneraPdfByIdTxSIMConsolidado/?id=${id}&descripcionEmpresa=${descripcionEmpresa}`, { responseType: 'arraybuffer' });
  }
}
