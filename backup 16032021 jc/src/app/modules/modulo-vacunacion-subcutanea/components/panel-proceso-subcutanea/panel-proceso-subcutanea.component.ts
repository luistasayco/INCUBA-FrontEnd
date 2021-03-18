import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { ProcesoSubCutaneaModel } from '../../models/proceso-subcutanea.model';
import { Subscription } from 'rxjs';
import { VacunacionSubcutaneaService } from '../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-proceso-subcutanea',
  templateUrl: './panel-proceso-subcutanea.component.html',
  styleUrls: ['./panel-proceso-subcutanea.component.css']
})
export class PanelProcesoSubcutaneaComponent implements OnInit {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Proceso SubCutanea';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: ProcesoSubCutaneaModel;
  listModelo: ProcesoSubCutaneaModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: ProcesoSubCutaneaModel; } = {};

  // Opcion Eliminar
  modeloEliminar: ProcesoSubCutaneaModel;

  subscription: Subscription;

  constructor(private modeloService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación SubCutanea' },
                    { label: 'Proceso SubCutanea', routerLink: ['module-su/panel-proceso-subcutanea'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Valor' }
    ];
    this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-proceso-subcutanea')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcionProcesoSubCutanea: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.modeloService.getProcesoSubCutanea(this.modeloFind)
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

  onRowEditInit(modelo: ProcesoSubCutaneaModel) {
    this.modelocloned[modelo.idProcesoSubCutanea] = {...modelo};
  }

  onRowEditSave(modelo: ProcesoSubCutaneaModel) {
    this.subscription = new Subscription();
    this.subscription = this.modeloService.setUpdateProcesoSubCutanea(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idProcesoSubCutanea];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: ProcesoSubCutaneaModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idProcesoSubCutanea];
    delete this.modelocloned[modelo.idProcesoSubCutanea];
  }

  onToRowSelectDelete(modelo: ProcesoSubCutaneaModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-su/proceso-subcutanea-create']);
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
    this.subscription = this.modeloService.setDeleteProcesoSubCutanea(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idProcesoSubCutanea !== this.modeloEliminar.idProcesoSubCutanea );
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
