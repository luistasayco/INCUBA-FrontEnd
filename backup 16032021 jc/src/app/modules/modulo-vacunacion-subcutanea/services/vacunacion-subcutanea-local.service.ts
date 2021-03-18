import { Injectable } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';

@Injectable({
  providedIn: 'root'
})
export class VacunacionSubcutaneaLocalService {

  constructor(private dbService: NgxIndexedDBService, private sessionService: SessionService) { }

  getTxVacunacionSubcutanea() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA);
  }

  getAguja() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSAGUJA);
  }

  getIrregularidad() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSIRREGULARIDAD);
  }

  getIndiceEficiencia() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSINDICEEFICIENCIA);
  }

  getProcesoSubCutanea() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSPROCESOSUBCUTANEA);
  }

  getTxVacunacionSubcutaneaPorIdNew() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEANEW);
  }

  getTxVacunacionSubcutaneaPorId(id: number) {
    return this.dbService.getByKey(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA, id);
  }

  setInsertTxVacunacionSubcutanea( data: any) {
    let usuario =  this.sessionService.getItemDecrypt('usuario');
    data. usuarioCreacion = usuario;
    return this.dbService.add(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA, data);
  }

  setUpdateTxVacunacionSubcutanea( data: any) {
    return this.dbService.update(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA, data);
  }
  setDeleteTxVacunacionSubcutanea( id: number) {
    return this.dbService.delete(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA, id);
  }
}
