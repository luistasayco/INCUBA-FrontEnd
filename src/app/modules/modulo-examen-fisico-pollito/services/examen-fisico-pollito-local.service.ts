import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { SessionService } from '../../../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenFisicoPollitoLocalService {

  constructor(private dbService: NgxIndexedDBService, private sessionService: SessionService) { }

  getCalidad() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTCALIDAD);
  }

  getExamenFisicoPollito() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO);
  }

  getExamenFisicoPollitoDetalleNew() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO_DETALLE);
  }

  getTxExamenFisicoPollitoPorId(id: number) {
    return this.dbService.getByKey(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO, id);
  }

  setInsertTxExamenFisicoPollito( data: any) {
    let usuario =  this.sessionService.getItemDecrypt('usuario');
    data. usuarioCreacion = usuario;
    return this.dbService.add(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO, data);
  }

  setUpdateTxExamenFisicoPollito( data: any) {
    return this.dbService.update(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO, data);
  }
  setDeleteTxExamenFisicoPollito( id: number) {
    return this.dbService.delete(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO, id);
  }
}
