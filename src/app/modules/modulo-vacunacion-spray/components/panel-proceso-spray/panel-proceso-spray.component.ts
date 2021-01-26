import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { ProcesoSprayModel } from '../../models/proceso-spray.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-proceso-spray',
  templateUrl: './panel-proceso-spray.component.html',
  styleUrls: ['./panel-proceso-spray.component.css']
})
export class PanelProcesoSprayComponent implements OnInit {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Proceso Spray';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: ProcesoSprayModel;
  listModelo: ProcesoSprayModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: ProcesoSprayModel; } = {};

  // Opcion Eliminar
  modeloEliminar: ProcesoSprayModel;

  subscription: Subscription;

  constructor(private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Proceso Spray', routerLink: ['module-sp/panel-proceso-spray'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' }
    ];
    this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-proceso-spray')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcionProcesoSpray: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.getProcesoSpray(this.modeloFind)
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

  onRowEditInit(modelo: ProcesoSprayModel) {
    this.modelocloned[modelo.idProcesoSpray] = {...modelo};
  }

  onRowEditSave(modelo: ProcesoSprayModel) {
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setUpdateProcesoSpray(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idProcesoSpray];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: ProcesoSprayModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idProcesoSpray];
    delete this.modelocloned[modelo.idProcesoSpray];
  }

  onToRowSelectDelete(modelo: ProcesoSprayModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-sp/proceso-spray-create']);
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
    this.subscription = this.vacunacionSprayService.setDeleteProcesoSpray(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idProcesoSpray !== this.modeloEliminar.idProcesoSpray );
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
