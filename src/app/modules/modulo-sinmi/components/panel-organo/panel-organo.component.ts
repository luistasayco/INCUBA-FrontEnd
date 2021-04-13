import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { OrganoModel } from '../../models/organo.model';
import { Subscription } from 'rxjs';
import { SinmiService } from '../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-organo',
  templateUrl: './panel-organo.component.html',
  styleUrls: ['./panel-organo.component.css']
})
export class PanelOrganoComponent implements OnInit, OnDestroy {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Organo';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: OrganoModel;
  listModelo: OrganoModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: OrganoModel; } = {};

  // Opcion Eliminar
  modeloEliminar: OrganoModel;

  subscription: Subscription;

  constructor(private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
                    { label: 'Organo', routerLink: ['module-sm/panel-organo'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Orden' }
    ];
    this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-organo')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcionOrgano: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.sinmiService.getOrgano(this.modeloFind)
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

  onRowEditInit(modelo: OrganoModel) {
    this.modelocloned[modelo.idOrgano] = {...modelo};
  }

  onRowEditSave(modelo: OrganoModel) {
    this.subscription = new Subscription();
    this.subscription = this.sinmiService.setUpdateOrgano(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idOrgano];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: OrganoModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idOrgano];
    delete this.modelocloned[modelo.idOrgano];
  }

  onToRowSelectDelete(modelo: OrganoModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-sm/create-organo']);
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
    this.subscription = this.sinmiService.setDeleteOrgano(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idOrgano !== this.modeloEliminar.idOrgano );
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
