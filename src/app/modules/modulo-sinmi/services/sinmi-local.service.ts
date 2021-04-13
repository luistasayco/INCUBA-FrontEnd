import { Injectable } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';

@Injectable({
  providedIn: 'root'
})
export class SinmiLocalService {

  constructor(private dbService: NgxIndexedDBService, private sessionService: SessionService) { }

  getTxSINMI() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXSINMI);
  }

  getTxSINMIDetalleNew() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXSINMI_DETALLE_NEW);
  }

  getTxSINMIPorId(id: number) {
    return this.dbService.getByKey(ConstantesTablasIDB._TABLA_TXSINMI, id);
  }

  setInsertTxSINMI( data: any) {
    let usuario =  this.sessionService.getItemDecrypt('usuario');
    data. usuarioCreacion = usuario;
    return this.dbService.add(ConstantesTablasIDB._TABLA_TXSINMI, data);
  }

  setUpdateTxSINMI( data: any) {
    return this.dbService.update(ConstantesTablasIDB._TABLA_TXSINMI, data);
  }
  setDeleteTxSINMI( id: number) {
    return this.dbService.delete(ConstantesTablasIDB._TABLA_TXSINMI, id);
  }
}
