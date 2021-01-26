import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { ProcesoDetalleSprayModel } from '../../../modulo-vacunacion-spray/models/proceso-detalle-spray.model';
import { Subscription } from 'rxjs';
import { SelectItem, ConfirmationService } from 'primeng';
import { VacunacionSubcutaneaService } from '../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { ProcesoDetalleSubCutaneaModel } from '../../models/proceso-detalle-subcutanea';
import { ProcesoSubCutaneaModel } from '../../models/proceso-subcutanea.model';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-proceso-detalle-subcutanea',
  templateUrl: './panel-proceso-detalle-subcutanea.component.html',
  styleUrls: ['./panel-proceso-detalle-subcutanea.component.css']
})
export class PanelProcesoDetalleSubcutaneaComponent implements OnInit {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Proceso Detalle SubCutanea';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloFind: ProcesoDetalleSubCutaneaModel;
  listModelo: ProcesoDetalleSubCutaneaModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: ProcesoDetalleSubCutaneaModel; } = {};

  // Opcion Eliminar
  modeloEliminar: ProcesoDetalleSubCutaneaModel;

  subscription: Subscription;

  // Opciones de busqueda
  listItemProcesoSubCutanea: SelectItem[];

  // Variables de dato seleccionado
  selectedProcesoSubCutanea: any;

  constructor(private modeloService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Proceso SubCutanea' },
                    { label: 'Proceso Detalle SubCutanea', routerLink: ['module-su/panel-proceso-detalle-subcutanea'] }
                ]);
              }

  ngOnInit() {
    this.selectedProcesoSubCutanea = null;
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Valor' }
    ];
    this.getToObtieneTipoExplotacion();
    // this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-proceso-detalle-subcutanea')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  getToObtieneTipoExplotacion() {
    let modeloTipoExplosion: ProcesoSubCutaneaModel = new ProcesoSubCutaneaModel();
    this.subscription = new Subscription();
    this.subscription = this.modeloService.getProcesoSubCutanea(modeloTipoExplosion)
    .subscribe((data: ProcesoSubCutaneaModel[]) => {
      this.listItemProcesoSubCutanea = [];
      for (let item of data) {
        this.listItemProcesoSubCutanea.push({ label: item.descripcionProcesoSubCutanea, value: item.idProcesoSubCutanea });
      }
    });
  }

  onChangePrcesoSubCutanea() {
    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    if (this.selectedProcesoSubCutanea !== null) {
      this.modeloFind = {
        idProcesoSubCutanea: this.selectedProcesoSubCutanea.value,
        descripcionProcesoSubCutanea: ''
      };
      this.subscription = new Subscription();
      this.subscription = this.modeloService.getProcesoDetalleSubCutanea(this.modeloFind)
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

  onRowEditInit(modelo: ProcesoDetalleSubCutaneaModel) {
    this.modelocloned[modelo.idProcesoDetalleSubCutanea] = {...modelo};
  }

  onRowEditSave(modelo: ProcesoDetalleSubCutaneaModel) {
    this.subscription = new Subscription();
    this.subscription = this.modeloService.setUpdateProcesoDetalleSubCutanea(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idProcesoDetalleSubCutanea];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: ProcesoDetalleSubCutaneaModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idProcesoDetalleSubCutanea];
    delete this.modelocloned[modelo.idProcesoDetalleSubCutanea];
  }

  onToRowSelectDelete(modelo: ProcesoDetalleSubCutaneaModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    if (this.selectedProcesoSubCutanea !== null) {
      this.router.navigate(['/main/module-su/proceso-detalle-subcutanea-create', this.selectedProcesoSubCutanea.value]);
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
    this.subscription = this.modeloService.setDeleteProcesoDetalleSubCutanea(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idProcesoDetalleSubCutanea !== this.modeloEliminar.idProcesoDetalleSubCutanea );
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
