import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { TxExamenFisicoPollitoModel } from '../../../models/tx-examen-fisico-pollito';
import { TxExamenFisicoPollitoDetalleModel } from '../../../models/tx-examen-fisico-pollito-detalle';
import { Subscription } from 'rxjs';
import { TxExamenFisicoPollitoDetalleFotosModel } from '../../../models/tx-examen-fisico-pollito-fotos';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { ExamenFisicoPollitoLocalService } from '../../../services/examen-fisico-pollito-local.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tx-examen-fisico-pollito-offline-update',
  templateUrl: './tx-examen-fisico-pollito-offline-update.component.html',
  styleUrls: ['./tx-examen-fisico-pollito-offline-update.component.css']
})
export class TxExamenFisicoPollitoOfflineUpdateComponent implements OnInit, OnDestroy {

  titulo = 'Examen Físico Nro:';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloItem: TxExamenFisicoPollitoModel = new TxExamenFisicoPollitoModel();

  listTxExamenFisicoPollitoDetalle: TxExamenFisicoPollitoDetalleModel[];
  listTxExamenFisicoPollitoDetalleGenerado: TxExamenFisicoPollitoDetalleModel[];

  columnas: any[];

  subscription$: Subscription;

  idExamenFisico: number;

  // Lista de imagenes
  listIma: any[];
  cloneListImagen: TxExamenFisicoPollitoDetalleFotosModel[] = [];

  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private examenFisicoPollitoLocalService: ExamenFisicoPollitoLocalService,
              private router: Router,
              private readonly route: ActivatedRoute) {
                this.breadcrumbService.setItems([
                  { label: 'Módulo Examen Físico' },
                  { label: 'Examen Físico (Offline)', routerLink: ['module-ef/panel-tx-examen-fisico-pollito-offline'] },
                  { label: 'Actualizar'}
              ]);
              }

  ngOnInit(): void {

    // Obtenemos el Id para realizar la modificacion
    this.subscription$ = new Subscription();
    this.subscription$ = this.route.params.subscribe((params: Params) => {
      this.idExamenFisico = params.id;
      this.onExamenFisicoPorId();
    });

    this.columnas = [
      { header: 'Nro' },
      { header: 'Proceso' },
      { header: 'Factor' }
    ];
  }

  onExamenFisicoPorId() {
    this.subscription$ = new Subscription();
    this.idExamenFisico = Number(this.idExamenFisico);
    this.subscription$ = this.examenFisicoPollitoLocalService.getTxExamenFisicoPollitoPorId(this.idExamenFisico)
    .subscribe((data: TxExamenFisicoPollitoModel) => {
      this.modeloItem = data;
      this.cloneListImagen = [...this.modeloItem.listDetalleFotos];
      this.listImagen();
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  listImagen() {
    this.listIma = [];
    if (this.modeloItem.listDetalleFotos.length > 0 ) {
      this.modeloItem.listDetalleFotos.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listDetalleFotos = [];
    event.forEach(x => {
      this.modeloItem.listDetalleFotos.push({
        idExamenFisicoDetalle: 0,
        idExamenFisico: 0,
        foto: x.imagen
      });
    });
  }

  onGrabar() {

    this.modeloItem.listDetalleNew
    .map(x => {
      x.valor = Number(x.valor);
    });
    this.modeloItem.flgEnModificacion = false;

    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoLocalService.setUpdateTxExamenFisicoPollito(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.onBack();
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onBack() {
    this.router.navigate(['/main/module-ef/panel-tx-examen-fisico-pollito-offline']);
  }
}
