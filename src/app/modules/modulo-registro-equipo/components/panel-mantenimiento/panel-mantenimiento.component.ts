import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { MantenimientoModel } from '../../models/mantenimiento.model';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { IMensajeResultadoApi } from 'src/app/modules/modulo-compartido/models/mensaje-resultado-api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-panel-mantenimiento',
  templateUrl: './panel-mantenimiento.component.html',
  styleUrls: ['./panel-mantenimiento.component.css']
})
export class PanelMantenimientoComponent implements OnInit {

  // Titulo del componente
  titulo = 'Mantenimiento';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: MantenimientoModel;
  listModelo: MantenimientoModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: MantenimientoModel; } = {};

  // Opcion Eliminar
  modeloEliminar: MantenimientoModel;

  constructor(private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Mantenimiento', routerLink: ['module-re/panel-mantenimiento'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' }
    ];

    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcion: this.descripcionFind};
    this.registroEquipoService.getMantenimiento(this.modeloFind)
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

  onRowEditInit(modelo: MantenimientoModel) {
    this.modelocloned[modelo.idMantenimiento] = {...modelo};
  }

  onRowEditSave(modelo: MantenimientoModel) {
    this.registroEquipoService.setUpdateMantenimiento(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idMantenimiento];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: MantenimientoModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idMantenimiento];
    delete this.modelocloned[modelo.idMantenimiento];
  }

  onToRowSelectDelete(modelo: MantenimientoModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-re/create-mantenimiento']);
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
    this.registroEquipoService.setDeleteMantenimiento(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idMantenimiento !== this.modeloEliminar.idMantenimiento );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

}
