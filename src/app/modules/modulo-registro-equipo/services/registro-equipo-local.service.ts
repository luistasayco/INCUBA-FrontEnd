import { Injectable, OnDestroy } from '@angular/core';
import { ModeloModel } from '../models/modelo.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TxRegistroEquipoModel } from '../models/tx-registro-equipo.model';
import { EquipoModel } from '../../modulo-compartido/models/equipo.model';
import { MantenimientoPorModeloModel } from '../models/mantenimiento-por-modelo.model';
import { RepuestoPorModeloModel } from '../models/repuesto-por-modelo.model';
import { CondicionLimpiezaModel } from '../models/condicion-limpieza.model';
import { RequerimientoEquipoModel } from '../models/requerimiento-equipo.model';
import { Observable, from, Subscription, of } from 'rxjs';
import { concatMap, mergeMap } from 'rxjs/operators';
import { IObservableLocal } from '../../modulo-sincronizacion/interface/observable-local.interface';
import { TxRegistroEquipoDetalle1Model } from '../models/tx-registro-equipo-detalle1.model';
import { TxRegistroEquipoDetalle2Model } from '../models/tx-registro-equipo-detalle2.model';
import { TxRegistroEquipoDetalle6Model } from '../models/tx-registro-equipo-detalle6.model';
import { TxRegistroEquipoDetalle3Model } from '../models/tx-registro-equipo-detalle3.model';
import { TxRegistroEquipoDetalle4Model } from '../models/tx-registro-equipo-detalle4.model';
import { ConstantesTablasIDB } from 'src/app/constants/constantes-tablas-indexdb';


@Injectable({
  providedIn: 'root'
})
export class RegistroEquipoLocalService implements OnDestroy {
  lis$ = Subscription;
  newRegistroEquipo: TxRegistroEquipoModel;

  constructor(private dbService: NgxIndexedDBService) {
  }
  ngOnDestroy() {
  }

  getModeloLocal() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTMODELO);
  }

  getTxRegistroEquipoNewItem(codigoEmpresa: string, codigoPlanta: string, codigoModelo: string) {
    this.newRegistroEquipo = new TxRegistroEquipoModel();

    this.newRegistroEquipo.idRegistroEquipo = 0;
    this.newRegistroEquipo.codigoEmpresa = codigoEmpresa;
    this.newRegistroEquipo.codigoPlanta = codigoPlanta;
    this.newRegistroEquipo.codigoModelo = codigoModelo;

    let item: IObservableLocal;
    let list: IObservableLocal[] = [];
    item = { observable: this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTEQUIPO), nombreTabla: 'equipo' };
    list.push(item);
    item = { observable: this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTMANTENIMIENTOPORMODELO), nombreTabla: 'mantenimiento' };
    list.push(item);
    item = { observable: this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTREPUESTOPORMODELO), nombreTabla: 'repuesto' };
    list.push(item);
    item = { observable: this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTCONDICIONLIMPIEZA), nombreTabla: 'limpieza' };
    list.push(item);
    item = { observable: this.dbService.getAll(ConstantesTablasIDB._TABLA_MSTREQUERIMIENTOEQUIPO), nombreTabla: 'requerimiento' };
    list.push(item);

    return from(list)
    .pipe(
      concatMap (id => id.observable)
    );
  }

  setMantenimientoPorModelo(lisEquipo: EquipoModel[], mantenimientoPorModelo: MantenimientoPorModeloModel[], codigoEmpresa: string, codigoPlanta: string, codigoModelo: string) {

    let txRegistroEquipoDetalle1: TxRegistroEquipoDetalle1Model[] = [];

    if (mantenimientoPorModelo) {

      let newMantenimientoPorModelo = [...mantenimientoPorModelo].filter(filModelo => filModelo.codigoModelo === codigoModelo);

      let newListEquipo = [...lisEquipo].filter(filModelo => filModelo.codigoEmpresa === codigoEmpresa &&  filModelo.codigoPlanta === codigoPlanta && filModelo.codigoModelo === codigoModelo);

      newMantenimientoPorModelo.forEach(fil => {

        newListEquipo.forEach(filequipo => {
          txRegistroEquipoDetalle1.push({
            idRegistroEquipoDetalle: 0,
            idRegistroEquipo: 0,
            idMantenimientoPorModelo: fil.idMantenimientoPorModelo,
            descripcion: fil.descripcion,
            codigoEquipo: filequipo.codigoEquipo,
            flgValor: true,
          });
        });
      });
    }

    return txRegistroEquipoDetalle1;
  }

  setRepuestoPorModelo(lisEquipo: EquipoModel[], repuestoPorModelo: RepuestoPorModeloModel[], codigoEmpresa: string, codigoPlanta: string, codigoModelo: string) {
    let txRegistroEquipoDetalle2: TxRegistroEquipoDetalle2Model[] = [];

    if (repuestoPorModelo) {

      let newRepuestoPorModelo = [...repuestoPorModelo]
      .filter(filModelo => filModelo.codigoModelo === codigoModelo &&
                           filModelo.flgPredeterminado === true &&
                           filModelo.flgAccesorio === false);

      let newListEquipo = [...lisEquipo].filter(filModelo => filModelo.codigoEmpresa === codigoEmpresa &&  filModelo.codigoPlanta === codigoPlanta && filModelo.codigoModelo === codigoModelo);

      newRepuestoPorModelo.forEach(fil => {

        newListEquipo.forEach(filequipo => {
          txRegistroEquipoDetalle2.push({
            idRegistroEquipoDetalle: 0,
            idRegistroEquipo: 0,
            idRepuestoPorModelo: fil.idRepuestoPorModelo,
            codigoRepuesto: fil.codigoRepuesto,
            descripcion: fil.descripcion,
            codigoEquipo: filequipo.codigoEquipo,
            flgValor: true,
            mp: '',
            rfc: ''
          });
        });
      });
    }

    return txRegistroEquipoDetalle2;
  }

  setRepuestoPorModeloNoPredeterminado(lisEquipo: EquipoModel[], repuestoPorModelo: RepuestoPorModeloModel[], codigoEmpresa: string, codigoPlanta: string, codigoModelo: string) {
    let txRegistroEquipoDetalle2NoPredeterminado: TxRegistroEquipoDetalle2Model[] = [];

    if (repuestoPorModelo) {

      let newRepuestoPorModelo = [...repuestoPorModelo]
      .filter(filModelo => filModelo.codigoModelo === codigoModelo &&
        filModelo.flgPredeterminado === false &&
        filModelo.flgAccesorio === false);
      let newListEquipo = [...lisEquipo].filter(filModelo => filModelo.codigoEmpresa === codigoEmpresa &&  filModelo.codigoPlanta === codigoPlanta && filModelo.codigoModelo === codigoModelo);
      newRepuestoPorModelo.forEach(fil => {

        newListEquipo.forEach(filequipo => {
          txRegistroEquipoDetalle2NoPredeterminado.push({
            idRegistroEquipoDetalle: 0,
            idRegistroEquipo: 0,
            idRepuestoPorModelo: fil.idRepuestoPorModelo,
            codigoRepuesto: fil.codigoRepuesto,
            descripcion: fil.descripcion,
            codigoEquipo: filequipo.codigoEquipo,
            flgValor: true,
            mp: '',
            rfc: ''
          });
        });
      });
    }

    return txRegistroEquipoDetalle2NoPredeterminado;
  }

  setCondicionLimpieza(condicionLimpieza: CondicionLimpiezaModel[]) {
    let txRegistroEquipoDetalle3: TxRegistroEquipoDetalle3Model[] = [];

    if (condicionLimpieza) {

      let newCondicionLimpieza = [...condicionLimpieza];

      newCondicionLimpieza.forEach(fil => {

        txRegistroEquipoDetalle3.push({
          idRegistroEquipoDetalle: 0,
          idRegistroEquipo: 0,
          idCondicionLimpieza: fil.idCondicionLimpieza,
          descripcion: fil.descripcion,
          flgValor: true
        });
      });
    }

    return txRegistroEquipoDetalle3;
  }

  setRequerimientoEquipo(requerimientoEquipo: RequerimientoEquipoModel[]) {
    let txRegistroEquipoDetalle4: TxRegistroEquipoDetalle4Model[] = [];

    if (requerimientoEquipo) {

      let newRequerimientoEquipo = [...requerimientoEquipo];

      newRequerimientoEquipo.forEach(fil => {

        txRegistroEquipoDetalle4.push({
          idRegistroEquipoDetalle: 0,
          idRegistroEquipo: 0,
          idRequerimientoEquipo: fil.idRequerimientoEquipo,
          descripcion: fil.descripcion,
          flgValor: true
        });
      });
    }

    return txRegistroEquipoDetalle4;
  }

  setAccesorios(accesorioPorModelo: RepuestoPorModeloModel[]) {
    let txRegistroEquipoDetalle6: TxRegistroEquipoDetalle6Model[] = [];

    if (accesorioPorModelo) {

      let newAccesorioPorModelo = [...accesorioPorModelo].filter(x => x.flgAccesorio === true);

      newAccesorioPorModelo.forEach(fil => {

        txRegistroEquipoDetalle6.push({
          idRegistroEquipoDetalle: 0,
          idRegistroEquipo: 0,
          codigoRepuesto: fil.codigoRepuesto,
          descripcion: fil.descripcion,
          stockActual: 0,
          cambioPorMantenimiento: 0,
          entregado: 0
        });
      });
    }

    return txRegistroEquipoDetalle6;
  }

  getTxRegistroEquipo() {
    return this.dbService.getAll(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO);
  }

  getTxRegistroEquipoPorId(id: number) {
    return this.dbService.getByKey(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, id);
  }

  setInsertTxRegistroEquipo( data: any) {
    return this.dbService.add(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, data);
  }

  setUpdateTxRegistroEquipo( data: any) {
    return this.dbService.update(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, data);
  }
  setDeleteTxRegistroEquipo( id: number) {
    return this.dbService.delete(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, id);
  }
}
