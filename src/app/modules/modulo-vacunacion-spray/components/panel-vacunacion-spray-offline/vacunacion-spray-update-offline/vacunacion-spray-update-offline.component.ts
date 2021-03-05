import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { TxVacunacionSprayModel } from '../../../models/tx-vacunacion-spray.model';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { ProcesoSprayModel } from '../../../models/proceso-spray.model';
import { ProcesoDetalleSprayModel } from '../../../models/proceso-detalle-spray.model';
import { Subscription } from 'rxjs';
import { TxVacunacionSprayVacunaModel } from '../../../models/tx-vacunacion-spray-vacuna.model';
import { TxVacunacionSprayFotosModel } from '../../../models/tx-vacunacion-spray-fotos.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { VacunacionSprayLocalService } from '../../../services/vacunacion-spray-local.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'app-vacunacion-spray-update-offline',
  templateUrl: './vacunacion-spray-update-offline.component.html',
  styleUrls: ['./vacunacion-spray-update-offline.component.css']
})
export class VacunacionSprayUpdateOfflineComponent implements OnInit {
  titulo = 'Vacunación Spray - Offline';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloItem: TxVacunacionSprayModel = new TxVacunacionSprayModel();
  modeloEmpresa: EmpresaModel = new EmpresaModel();

  listProceso: ProcesoSprayModel[];
  listProcesoDetalle: ProcesoDetalleSprayModel[];

  columnasMaquina: any[];
  columnasVacuna: any[];
  columnasResultado: any[];

  subscription$: Subscription;

  displaySave: boolean;

  rowGroupMetadata: any;

  displayVacuna: boolean;
  displayMaquina: boolean;

  nombreVacuna: string;

  clonedVacuna: { [s: string]: TxVacunacionSprayVacunaModel; } = {};

  id: number;
  listIma: any[];
  cloneListImagen: TxVacunacionSprayFotosModel[] = [];
  displayControles: boolean;
  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private vacunacionSprayLocalService: VacunacionSprayLocalService,
              private router: Router,
              private route: ActivatedRoute) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Spray - Offline' },
        { label: this.titulo, routerLink: ['module-sp/panel-vacunacion-spray - Offline'] },
        { label: 'Actualizar'}
    ]);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.onObtieneVacunacionSprayPorId();
    });

    this.columnasMaquina = [
      { header: 'Máquina' },
      { header: 'N° máquinas' },
      { header: 'Modelo/Marca' },
      { header: 'Codigo AF' }
    ];
    this.columnasVacuna = [
      { header: 'Vacuna' },
      { header: 'Nombre Vacuna' }
    ];

    this.columnasResultado = [
      { header: 'Descripción' },
      { header: 'Valor Esperado' },
      { header: 'Valor Obtenido' }
    ];
  }

  onObtieneVacunacionSprayPorId () {
    let vId = Number(this.id);
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayLocalService.getTxVacunacionSprayPorId(vId)
    .subscribe((data: TxVacunacionSprayModel) => {
      this.modeloItem = data;
      if (!this.modeloItem.listarTxVacunacionSprayFotos) {
        this.cloneListImagen = [];
      } else {
        this.cloneListImagen = [...this.modeloItem.listarTxVacunacionSprayFotos];
      }
      this.updateRowGroupMetaData();
      this.listImagen();
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  getAsignaValoresVacunacionPorId() {

  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    

    if (this.modeloItem.listarTxVacunacionSprayDetalle) {
      for (let i = 0; i < this.modeloItem.listarTxVacunacionSprayDetalle.length; i++) {
        let rowData = this.modeloItem.listarTxVacunacionSprayDetalle[i];
        let brand = rowData.descripcionProcesoSpray;
        if (i === 0) {
            this.rowGroupMetadata[brand] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.modeloItem.listarTxVacunacionSprayDetalle[i - 1];
          let previousRowGroup = previousRowData.descripcionProcesoSpray;
          if ( brand === previousRowGroup )
            this.rowGroupMetadata[brand].size++;
          else
            this.rowGroupMetadata[brand] = { index: i, size: 1 };
        }
      }
    }
  }

  listImagen() {
    this.listIma = [];
    if(this.modeloItem.listarTxVacunacionSprayFotos) {
      if (this.modeloItem.listarTxVacunacionSprayFotos.length > 0 ) {
        this.modeloItem.listarTxVacunacionSprayFotos.forEach(x => {
          this.listIma.push({imagen: x.foto});
        });
      }
    }
    
  }

  listUpdate(event: any[]) {
    this.modeloItem.listarTxVacunacionSprayFotos = [];
    event.forEach(x => {
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listarTxVacunacionSprayFotos.push(itemImagen);
        } else {
          this.modeloItem.listarTxVacunacionSprayFotos.push({
            idVacunacionSprayDetalle: 0,
            idVacunacionSpray: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listarTxVacunacionSprayFotos.push({
          idVacunacionSprayDetalle: 0,
          idVacunacionSpray: 0,
          foto: x.imagen
        });
      }
    });
  }
  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
  onGrabar() {
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayLocalService.setUpdateTxVacunacionSpray(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.displaySave = false;
      this.onBack();
    },
      (error) => {
        this.displaySave = false;
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });

  }

  onBack() {
    this.router.navigate(['/main/module-sp/panel-vacunacion-spray-offline']);
  }

}
