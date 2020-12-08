import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { TxExamenFisicoPollitoModel } from '../../../models/tx-examen-fisico-pollito';
import { TxExamenFisicoPollitoDetalleModel } from '../../../models/tx-examen-fisico-pollito-detalle';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { ExamenFisicoPollitoService } from '../../../services/examen-fisico-pollito.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TxExamenFisicoPollitoDetalleFotosModel } from '../../../models/tx-examen-fisico-pollito-fotos';

@Component({
  selector: 'app-tx-examen-fisico-pollito-update',
  templateUrl: './tx-examen-fisico-pollito-update.component.html',
  styleUrls: ['./tx-examen-fisico-pollito-update.component.css']
})
export class TxExamenFisicoPollitoUpdateComponent implements OnInit, OnDestroy {

  titulo = 'Examen Fisico Nro:';
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
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              private router: Router,
              private readonly route: ActivatedRoute) {
                this.breadcrumbService.setItems([
                  { label: 'Módulo Examen Físico' },
                  { label: 'Examen Físico del Pollito', routerLink: ['module-ef/panel-tx-examen-fisico-pollito'] },
                  { label: 'Actualizar'}
              ]);
              }

  ngOnInit(): void {
    // Obtenemos el Id para realizar la modificacion
    this.route.params.subscribe((params: Params) => {
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
    this.subscription$ = this.examenFisicoPollitoService.getTxExamenFisicoPollitoPorId(this.idExamenFisico)
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
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listDetalleFotos.push(itemImagen);
        } else {
          this.modeloItem.listDetalleFotos.push({
            idExamenFisicoDetalle: 0,
            idExamenFisico: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listDetalleFotos.push({
          idExamenFisicoDetalle: 0,
          idExamenFisico: 0,
          foto: x.imagen
        });
      }
    });
  }

  onGrabar() {

    this.modeloItem.listDetalleNew
    .map(x => {
      x.valor = Number(x.valor);
    });
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService.setUpdateTxExamenFisicoPollito(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.onBack();
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onBack() {
    this.router.navigate(['/main/module-ef/panel-tx-examen-fisico-pollito']);
  }
}
