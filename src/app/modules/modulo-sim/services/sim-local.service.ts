import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SessionService } from '../../../services/session.service';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';

@Injectable({
  providedIn: 'root'
})
export class SimLocalService {

  constructor(private dbService: NgxIndexedDBService, private sessionService: SessionService) { }

  getTxSIM() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXSIM);
  }

  getTxSIMPorId(id: number) {
    return this.dbService.getByKey(ConstantesTablasIDB._TABLA_TXSIM, id);
  }

  setInsertTxSIM( data: any) {
    let usuario =  this.sessionService.getItemDecrypt('usuario');
    data. usuarioCreacion = usuario;
    return this.dbService.add(ConstantesTablasIDB._TABLA_TXSIM, data);
  }

  setUpdateTxSIM( data: any) {
    return this.dbService.update(ConstantesTablasIDB._TABLA_TXSIM, data);
  }
  setDeleteTxSIM( id: number) {
    return this.dbService.delete(ConstantesTablasIDB._TABLA_TXSIM, id);
  }
}
