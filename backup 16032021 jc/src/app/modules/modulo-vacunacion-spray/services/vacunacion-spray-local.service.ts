import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { SessionService } from '../../../services/session.service';


@Injectable({
  providedIn: 'root'
})
export class VacunacionSprayLocalService {

  constructor(private dbService: NgxIndexedDBService, private sessionService: SessionService) { }

  getTxVacunacionSpray() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY);
  }

  getTxVacunacionSprayPorId(id: number) {
    return this.dbService.getByKey(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY, id);
  }

  getTxVacunacionSprayNew() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAYNEW);
  }

  getVacuna() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSVACUNA);
  }

  getBoquilla() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSBOQUILLA);
  }

  getProcesoSpray() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSPROCESOSPRAY);
  }

  getEquipo() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTEQUIPO);
  }

  getProcesoDetalleSpray() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSPROCESODETALLESPRAY);
  }

  setInsertTxVacunacionSpray( data: any) {
    let usuario =  this.sessionService.getItemDecrypt('usuario');
    data. usuarioCreacion = usuario;
    return this.dbService.add(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY, data);
  }

  setUpdateTxVacunacionSpray( data: any) {
    return this.dbService.update(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY, data);
  }
  setDeleteTxVacunacionSpray( id: number) {
    return this.dbService.delete(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY, id);
  }
}
