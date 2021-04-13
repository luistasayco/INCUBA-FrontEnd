import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { OrganoDetalleModel } from '../../models/organo-detalle.model';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng';
import { SinmiService } from '../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { OrganoModel } from '../../models/organo.model';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-organo-detalle',
  templateUrl: './panel-organo-detalle.component.html',
  styleUrls: ['./panel-organo-detalle.component.css']
})
export class PanelOrganoDetalleComponent implements OnInit, OnDestroy {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Organo Detalle';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloFind: OrganoDetalleModel;
  listModelo: OrganoDetalleModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: OrganoDetalleModel; } = {};

  // Opcion Eliminar
  modeloEliminar: OrganoDetalleModel;

  subscription: Subscription;

  // Opciones de busqueda
  listItemOrgano: SelectItem[];

  // Variables de dato seleccionado
  selectedOrgano: any;

  constructor(private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
                    { label: 'Organo Detalle', routerLink: ['module-sm/panel-organo-detalle'] }
                ]);
              }

  ngOnInit() {
    this.selectedOrgano = null;
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Score' },
      { header: 'Orden' }
    ];
    this.getToObtieneOrgano();
    // this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-organo-detalle')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  getToObtieneOrgano() {
    let modeloTipoExplosion: OrganoModel = new OrganoModel();
    this.subscription = new Subscription();
    this.subscription = this.sinmiService.getOrgano(modeloTipoExplosion)
    .subscribe((data: OrganoModel[]) => {
      this.listItemOrgano = [];
      for (let item of data) {
        this.listItemOrgano.push({ label: item.descripcionOrgano, value: item.idOrgano });
      }
    });
  }

  onChangeTipoExplotacion() {
    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    if (this.selectedOrgano !== null) {
      this.modeloFind = {
        idOrgano: this.selectedOrgano.value,
        descripcionOrganoDetalle: ''
      };
      this.subscription = new Subscription();
      this.subscription = this.sinmiService.getOrganoDetalle(this.modeloFind)
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

  onRowEditInit(modelo: OrganoDetalleModel) {
    this.modelocloned[modelo.idOrganoDetalle] = {...modelo};
  }

  onRowEditSave(modelo: OrganoDetalleModel) {
    this.subscription = new Subscription();
    this.subscription = this.sinmiService.setUpdateOrganoDetalle(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idOrganoDetalle];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: OrganoDetalleModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idOrganoDetalle];
    delete this.modelocloned[modelo.idOrganoDetalle];
  }

  onToRowSelectDelete(modelo: OrganoDetalleModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    if (this.selectedOrgano !== null) {
      this.router.navigate(['/main/module-sm/create-organo-detalle', this.selectedOrgano.value]);
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
    this.subscription = this.sinmiService.setDeleteOrganoDetalle(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idOrganoDetalle !== this.modeloEliminar.idOrganoDetalle );
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
