import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SincronizacionService } from '../../services/sincronizacion.service';
import { CompartidoService } from '../../../modulo-compartido/services/compartido.service';
import { FunctionDBLocalService } from '../../../modulo-base-datos-local/services/function-dblocal.service';
import { RegistroEquipoService } from '../../../modulo-registro-equipo/services/registro-equipo.service';
import { ModeloModel } from '../../../modulo-registro-equipo/models/modelo.model';

@Component({
  selector: 'app-panel-sincronizacion',
  templateUrl: './panel-sincronizacion.component.html',
  styleUrls: ['./panel-sincronizacion.component.css']
})
export class PanelSincronizacionComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private compartidoService: CompartidoService,
              private registroEquipoService: RegistroEquipoService,
              private functionDBLocalService: FunctionDBLocalService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.onSetDataLocal( this.compartidoService.getEmpresa(), 'mstEmpresa');
    this.onSetDataLocal( this.compartidoService.getPlantaPorEmpresa(), 'mstPlanta');
    this.onSetDataLocal( this.registroEquipoService.getModelo(), 'mstModelo');
    this.onSetDataLocal( this.registroEquipoService.getCondicionLimpieza(), 'mstCondicionLimpieza');
    this.onSetDataLocal( this.registroEquipoService.getRequerimientoEquipo(), 'mstRequerimientoEquipo');
    this.onSetDataLocal( this.compartidoService.getEquipo(), 'mstEquipo');
    this.onSetDataLocal( this.compartidoService.getMantenimientoPorModelo(), 'mstMantenimientoPorModelo');
    this.onSetDataLocal( this.compartidoService.getRepuestoPorModelo(), 'mstRepuestoPorModelo');
  }

  onSetDataLocal(obv: any, nombre: string) {
    this.subscription = new Subscription();
    this.subscription = obv
    .subscribe(data => {
      this.functionDBLocalService.createEnDBLocalDesdeServidor(nombre, data);
    });
  }

  // onHttpconcatMap() {
  //   this.subscription = this.sincronizacionService.getSomethingFromAnAPI(this.ids)
  //   .subscribe(response => {
  //     console.log('ngOnInit', response);
  //     // this.functionDBLocalService.createEnDBLocalDesdeServidor('empresa', response);
  //   }, error => {
  //     console.error(error);
  //   });
  // }
}
