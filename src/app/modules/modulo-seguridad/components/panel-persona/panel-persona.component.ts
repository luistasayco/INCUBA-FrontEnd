import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { PersonaModel } from '../../models/persona.model';
import { SeguridadService } from '../../services/seguridad.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-persona',
  templateUrl: './panel-persona.component.html',
  styleUrls: ['./panel-persona.component.css']
})
export class PanelPersonaComponent implements OnInit {

  // Titulo del componente
  titulo = 'Usuario';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: PersonaModel;
  listModelo: PersonaModel[];

  columnas: any[];

  // Opcion Eliminar
  modeloEliminar: PersonaModel;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Usuario', routerLink: ['module-se/panel-persona'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Usuario' },
      { header: 'Apellidos y Nombres' },
      { header: 'Nro Documento' },
      { header: 'Activo' }
    ];

    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {nombre: this.descripcionFind};
    this.seguridadService.getPersona(this.modeloFind)
    .subscribe((resp: PersonaModel[]) => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectEdit(modelo: PersonaModel) {
    this.router.navigate(['/main/module-se/persona-update', modelo.idPersona]);
  }


  onToRowSelectDelete(modelo: PersonaModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-se/persona-create']);
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
    this.seguridadService.setDeletePersona(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idPersona !== this.modeloEliminar.idPersona );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }


}
