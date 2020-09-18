import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { CondicionLimpiezaModel } from '../../models/condicion-limpieza.model';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng';
import { Router } from '@angular/router';
import { IMensajeResultadoApi } from 'src/app/modules/modulo-compartido/models/mensaje-resultado-api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-panel-condicion-limpieza',
  templateUrl: './panel-condicion-limpieza.component.html',
  styleUrls: ['./panel-condicion-limpieza.component.css']
})
export class PanelCondicionLimpiezaComponent implements OnInit {

  // Titulo del componente
  titulo = 'Condición de Limpieza';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: CondicionLimpiezaModel;
  listModelo: CondicionLimpiezaModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: CondicionLimpiezaModel; } = {};

  // Opcion Eliminar
  modeloEliminar: CondicionLimpiezaModel;

  constructor(private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Condición de limpieza', routerLink: ['module-re/panel-condicion-limpieza'] }
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
    this.registroEquipoService.getCondicionLimpieza(this.modeloFind)
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

  onRowEditInit(modelo: CondicionLimpiezaModel) {
    this.modelocloned[modelo.idCondicionLimpieza] = {...modelo};
  }

  onRowEditSave(modelo: CondicionLimpiezaModel) {
    this.registroEquipoService.setUpdateCondicionLimpieza(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idCondicionLimpieza];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: CondicionLimpiezaModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idCondicionLimpieza];
    delete this.modelocloned[modelo.idCondicionLimpieza];
  }

  onToRowSelectDelete(modelo: CondicionLimpiezaModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-re/create-condicion-limpieza']);
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
    this.registroEquipoService.setDeleteCondicionLimpieza(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idCondicionLimpieza !== this.modeloEliminar.idCondicionLimpieza );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

}
