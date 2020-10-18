import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { ProcesoModel } from '../../models/proceso.model';
import { IMensajeResultadoApi } from 'src/app/modules/modulo-compartido/models/mensaje-resultado-api';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng';
import { Router } from '@angular/router';
import { ExamenFisicoPollitoService } from '../../services/examen-fisico-pollito.service';
import { ProcesoDetalleModel } from '../../models/proceso-detalle.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-proceso',
  templateUrl: './panel-proceso.component.html',
  styleUrls: ['./panel-proceso.component.css']
})
export class PanelProcesoComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Proceso';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: ProcesoModel;
  listModelo: ProcesoModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: ProcesoModel; } = {};

  // Opcion Eliminar
  modeloEliminar: ProcesoModel;

  //////////////////////////////////////////////////////////////////////////
  // Variables del detalle
  //////////////////////////////////////////////////////////////////////////
  // Titulo detalle del componente
  tituloDetalle: string;

  // Listar del Detalle
  modeloFindDetalle: ProcesoDetalleModel;
  modeloSelectDetalle: ProcesoDetalleModel = new ProcesoDetalleModel();
  listModeloDetalle: ProcesoDetalleModel[];

  columnasDetalle: any[];

  // Opcion Editar
  modeloclonedDetalle: { [s: string]: ProcesoDetalleModel; } = {};

  // Opcion Eliminar
  modeloEliminarDetalle: ProcesoDetalleModel;

  subscription: Subscription;

  constructor(private examenFisicoPollitoService: ExamenFisicoPollitoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Factor' },
      { header: 'Orden' }
    ];

    this.columnasDetalle = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Factor' },
      { header: 'Orden' }
    ];

    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcion: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.getProceso(this.modeloFind)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  // Al seleccionar un registro
  onRowSelect(event: any)
  {
    if (event !== null)
    {
      this.modeloSelectDetalle = event.data;
      this.tituloDetalle = this.titulo + ' [' + this.modeloSelectDetalle.descripcion + ']';
      this.onListarDetalle(this.modeloSelectDetalle.idProceso);
    }
  }

  // Al deseleccionar un registro
  onRowUnselect(event: any)
  {
    this.tituloDetalle = '';
    this.onListarDetalle(0);
    this.modeloSelectDetalle = new ProcesoDetalleModel();
  }

  onListarDetalle(id: number) {

    this.modeloFindDetalle = {idProceso: id};
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.getProcesoDetalle(this.modeloFindDetalle)
    .subscribe(resp => {
      if (resp) {
          this.listModeloDetalle = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onRowEditInit(modelo: ProcesoModel) {
    this.modelocloned[modelo.idProceso] = {...modelo};
  }

  onRowEditSave(modelo: ProcesoModel) {
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.setUpdateProceso(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idProceso];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: ProcesoModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idProceso];
    delete this.modelocloned[modelo.idProceso];
  }

  onRowEditInitDetalle(modelo: ProcesoDetalleModel) {
    this.modeloclonedDetalle[modelo.idProcesoDetalle] = {...modelo};
  }

  onRowEditSaveDetalle(modelo: ProcesoDetalleModel) {
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.setUpdateProcesoDetalle(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modeloclonedDetalle[modelo.idProcesoDetalle];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancelDetalle(modelo: ProcesoDetalleModel, index: number) {
    this.listModeloDetalle[index] = this.modeloclonedDetalle[modelo.idProcesoDetalle];
    delete this.modelocloned[modelo.idProcesoDetalle];
  }

  onToRowSelectDelete(modelo: ProcesoModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToRowSelectDeleteDetalle(modelo: ProcesoDetalleModel) {
    this.modeloEliminarDetalle = modelo;
    this.onConfirmDeleteDetalle();
  }

  onToCreate() {
    this.router.navigate(['/main/module-ef/create-proceso']);
  }

  onToCreateDeatlle() {
    if (this.modeloSelectDetalle.idProceso !== 0)
    {
      this.router.navigate(['/main/module-ef/create-proceso-detalle', this.modeloSelectDetalle.idProceso]);
    } else {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar un registro');
    }
  }

  onConfirmDelete() {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToDelete();
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onConfirmDeleteDetalle() {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToDeleteDetalle();
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToDelete() {
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.setDeleteProceso(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idProceso !== this.modeloEliminar.idProceso );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onToDeleteDetalle() {
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.setDeleteProcesoDetalle(this.modeloEliminarDetalle)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModeloDetalle =
      this.listModeloDetalle.filter(datafilter => datafilter.idProcesoDetalle !== this.modeloEliminarDetalle.idProcesoDetalle );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
