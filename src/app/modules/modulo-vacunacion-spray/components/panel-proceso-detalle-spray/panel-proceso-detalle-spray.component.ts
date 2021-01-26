import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { ProcesoDetalleSprayModel } from '../../models/proceso-detalle-spray.model';
import { Subscription } from 'rxjs';
import { SelectItem, ConfirmationService } from 'primeng';
import { VacunacionSprayService } from '../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { ProcesoSprayModel } from '../../models/proceso-spray.model';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-proceso-detalle-spray',
  templateUrl: './panel-proceso-detalle-spray.component.html',
  styleUrls: ['./panel-proceso-detalle-spray.component.css']
})
export class PanelProcesoDetalleSprayComponent implements OnInit {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Sub Tipo Explotación';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloFind: ProcesoDetalleSprayModel;
  listModelo: ProcesoDetalleSprayModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: ProcesoDetalleSprayModel; } = {};

  // Opcion Eliminar
  modeloEliminar: ProcesoDetalleSprayModel;

  subscription: Subscription;

  // Opciones de busqueda
  listItemProcesoSpray: SelectItem[];

  // Variables de dato seleccionado
  selectedProcesoSpray: any;

  constructor(private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Proceso Detalle Spray', routerLink: ['modulo-sp/panel-proceso-detalle-spray'] }
                ]);
              }

  ngOnInit() {
    this.selectedProcesoSpray = null;
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Valor' }
    ];
    this.getToObtieneProcesoSpray();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-proceso-detalle-spray')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  getToObtieneProcesoSpray() {
    let modeloTipoExplosion: ProcesoSprayModel = new ProcesoSprayModel();
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.getProcesoSpray(modeloTipoExplosion)
    .subscribe((data: ProcesoSprayModel[]) => {
      this.listItemProcesoSpray = [];
      for (let item of data) {
        this.listItemProcesoSpray.push({ label: item.descripcionProcesoSpray, value: item.idProcesoSpray });
      }
    });
  }

  onChangeProcesoSpray() {
    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    if (this.selectedProcesoSpray !== null) {
      this.modeloFind = {
        idProcesoSpray: this.selectedProcesoSpray.value,
        descripcionProcesoSpray: ''
      };
      this.subscription = new Subscription();
      this.subscription = this.vacunacionSprayService.getProcesoDetalleSpray(this.modeloFind)
      .subscribe(resp => {
        if (resp) {
            this.listModelo = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(error);
        }
      );
    }
  }

  onRowEditInit(modelo: ProcesoDetalleSprayModel) {
    this.modelocloned[modelo.idProcesoDetalleSpray] = {...modelo};
  }

  onRowEditSave(modelo: ProcesoDetalleSprayModel) {
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setUpdateProcesoDetalleSpray(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idProcesoDetalleSpray];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: ProcesoDetalleSprayModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idProcesoDetalleSpray];
    delete this.modelocloned[modelo.idProcesoDetalleSpray];
  }

  onToRowSelectDelete(modelo: ProcesoDetalleSprayModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    if (this.selectedProcesoSpray !== null) {
      this.router.navigate(['/main/module-sp/proceso-detalle-spray-create', this.selectedProcesoSpray.value]);
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

  onToDelete() {
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setDeleteProcesoDetalleSpray(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idProcesoDetalleSpray !== this.modeloEliminar.idProcesoDetalleSpray );
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
