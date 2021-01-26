import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VacunaModel } from '../../models/vacuna.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { ButtonAcces } from '../../../../models/acceso-button';
import { ConfirmationService } from 'primeng';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-vacuna',
  templateUrl: './panel-vacuna.component.html',
  styleUrls: ['./panel-vacuna.component.css']
})
export class PanelVacunaComponent implements OnInit {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Vacuna';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: VacunaModel;
  listModelo: VacunaModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: VacunaModel; } = {};

  // Opcion Eliminar
  modeloEliminar: VacunaModel;

  subscription: Subscription;

  constructor(private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Vacuna', routerLink: ['module-sp/panel-vacuna'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' }
    ];
    this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-vacuna')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcionVacuna: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.getVacuna(this.modeloFind)
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

  onRowEditInit(modelo: VacunaModel) {
    this.modelocloned[modelo.idVacuna] = {...modelo};
  }

  onRowEditSave(modelo: VacunaModel) {
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setUpdateVacuna(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idVacuna];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: VacunaModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idVacuna];
    delete this.modelocloned[modelo.idVacuna];
  }

  onToRowSelectDelete(modelo: VacunaModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-sp/vacuna-create']);
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
    this.subscription = this.vacunacionSprayService.setDeleteVacuna(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idVacuna !== this.modeloEliminar.idVacuna );
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
