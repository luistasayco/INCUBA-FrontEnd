import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { RequerimientoEquipoModel } from '../../models/requerimiento-equipo.model';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { ButtonAcces } from '../../../../models/acceso-button';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';

@Component({
  selector: 'app-panel-requerimiento-equipo',
  templateUrl: './panel-requerimiento-equipo.component.html',
  styleUrls: ['./panel-requerimiento-equipo.component.css']
})
export class PanelRequerimientoEquipoComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Requerimiento de equipo';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: RequerimientoEquipoModel;
  listModelo: RequerimientoEquipoModel[];

  // Columnas que se mostrara en la grilla ...
  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: RequerimientoEquipoModel; } = {};

  // Opcion Eliminar
  modeloEliminar: RequerimientoEquipoModel;

  subscription: Subscription;

  constructor(private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Registro Equipo' },
                    { label: 'Requerimiento equipo', routerLink: ['module-re/panel-requerimiento-equipo'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Orden' }
    ];

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-requerimiento-equipo')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcion: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.getRequerimientoEquipo(this.modeloFind)
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

  onRowEditInit(modelo: RequerimientoEquipoModel) {
    this.modelocloned[modelo.idRequerimientoEquipo] = {...modelo};
  }

  onRowEditSave(modelo: RequerimientoEquipoModel) {
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.setUpdateRequerimientoEquipo(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idRequerimientoEquipo];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: RequerimientoEquipoModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idRequerimientoEquipo];
    delete this.modelocloned[modelo.idRequerimientoEquipo];
  }

  onToRowSelectDelete(modelo: RequerimientoEquipoModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-re/create-requerimiento-equipo']);
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
    this.subscription = this.registroEquipoService.setDeleteRequerimientoEquipo(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter =>
        datafilter.idRequerimientoEquipo !== this.modeloEliminar.idRequerimientoEquipo );
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
