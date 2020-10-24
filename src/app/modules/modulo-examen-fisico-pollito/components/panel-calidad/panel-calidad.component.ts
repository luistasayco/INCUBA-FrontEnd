import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { CalidadModel } from '../../models/calidad.model';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng';
import { Router } from '@angular/router';
import { IMensajeResultadoApi } from 'src/app/modules/modulo-compartido/models/mensaje-resultado-api';
import { ExamenFisicoPollitoService } from '../../services/examen-fisico-pollito.service';
import { Subscription } from 'rxjs';
import { ButtonAcces } from '../../../../models/acceso-button';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';

@Component({
  selector: 'app-panel-calidad',
  templateUrl: './panel-calidad.component.html',
  styleUrls: ['./panel-calidad.component.css']
})
export class PanelCalidadComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Calidad';

  // Acceso a los botones
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: CalidadModel;
  listModelo: CalidadModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: CalidadModel; } = {};

  // Opcion Eliminar
  modeloEliminar: CalidadModel;

  subscription: Subscription;

  constructor(private examenFisicoPollitoService: ExamenFisicoPollitoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private menuDinamicoService: MenuDinamicoService) { }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Rango Inicio' },
      { header: 'Rango Fin' },
      { header: 'Color' }
    ];

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-calidad')
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
    this.subscription = this.examenFisicoPollitoService.getCalidad(this.modeloFind)
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

  onRowEditInit(modelo: CalidadModel) {
    this.modelocloned[modelo.idCalidad] = {...modelo};
  }

  onRowEditSave(modelo: CalidadModel) {
    this.subscription = new Subscription();
    this.subscription = this.examenFisicoPollitoService.setUpdateCalidad(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idCalidad];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: CalidadModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idCalidad];
    delete this.modelocloned[modelo.idCalidad];
  }

  onToRowSelectDelete(modelo: CalidadModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-ef/create-calidad']);
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
    this.subscription = this.examenFisicoPollitoService.setDeleteCalidad(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idCalidad !== this.modeloEliminar.idCalidad );
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
