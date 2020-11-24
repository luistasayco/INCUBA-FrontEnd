import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { TipoExplotacionModel } from '../../models/tipo-explotacion.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-tipo-explotacion',
  templateUrl: './panel-tipo-explotacion.component.html',
  styleUrls: ['./panel-tipo-explotacion.component.css']
})
export class PanelTipoExplotacionComponent implements OnInit, OnDestroy {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Tipo Explotación';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: TipoExplotacionModel;
  listModelo: TipoExplotacionModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: TipoExplotacionModel; } = {};

  // Opcion Eliminar
  modeloEliminar: TipoExplotacionModel;

  subscription: Subscription;

  constructor(private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Mod. Extranet' },
                    { label: 'Tipo Explotación', routerLink: ['module-ex/panel-tipo-explotacion'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' }
    ];
    this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-tipo-explotacion')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcionTipoExplotacion: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.extranetService.getTipoExplotacion(this.modeloFind)
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

  onRowEditInit(modelo: TipoExplotacionModel) {
    this.modelocloned[modelo.idTipoExplotacion] = {...modelo};
  }

  onRowEditSave(modelo: TipoExplotacionModel) {
    this.subscription = new Subscription();
    this.subscription = this.extranetService.setUpdateTipoExplotacion(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idTipoExplotacion];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: TipoExplotacionModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idTipoExplotacion];
    delete this.modelocloned[modelo.idTipoExplotacion];
  }

  onToRowSelectDelete(modelo: TipoExplotacionModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/module-ex/tipo-explotacion-create']);
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
    this.subscription = this.extranetService.setDeleteTipoExplotacion(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idTipoExplotacion !== this.modeloEliminar.idTipoExplotacion );
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
