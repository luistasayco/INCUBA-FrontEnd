import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SubTipoExplotacionModel } from '../../models/sub-tipo-explotacion.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { SelectItem } from 'primeng';
import { TipoExplotacionModel } from '../../models/tipo-explotacion.model';

@Component({
  selector: 'app-panel-sub-tipo-explotacion',
  templateUrl: './panel-sub-tipo-explotacion.component.html',
  styleUrls: ['./panel-sub-tipo-explotacion.component.css']
})
export class PanelSubTipoExplotacionComponent implements OnInit, OnDestroy {

  // Dar acceso a los botones se tiene que mejorar
  buttonAcces: ButtonAcces = new ButtonAcces();

  // Titulo del componente
  titulo = 'Sub Tipo Explotación';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloFind: SubTipoExplotacionModel;
  listModelo: SubTipoExplotacionModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: SubTipoExplotacionModel; } = {};

  // Opcion Eliminar
  modeloEliminar: SubTipoExplotacionModel;

  subscription: Subscription;

  // Opciones de busqueda
  listItemTipoExplotacion: SelectItem[];

  // Variables de dato seleccionado
  selectedTipoExplotacion: any;

  constructor(private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService) {
                this.breadcrumbService.setItems([
                    { label: 'Mod. Extranet' },
                    { label: 'Sub Tipo Explotación', routerLink: ['module-ex/panel-sub-tipo-explotacion'] }
                ]);
              }

  ngOnInit() {
    this.selectedTipoExplotacion = null;
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Nombre Documento' },
      { header: 'Req. Formato' },
      { header: 'Existe Digital' },
      { header: 'Para Cliente' },
      { header: 'Para Invetsa' }
    ];
    this.getToObtieneTipoExplotacion();
    // this.onListar();

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-sub-tipo-explotacion')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  getToObtieneTipoExplotacion() {
    let modeloTipoExplosion: TipoExplotacionModel = new TipoExplotacionModel();
    this.subscription = new Subscription();
    this.subscription = this.extranetService.getTipoExplotacion(modeloTipoExplosion)
    .subscribe((data: TipoExplotacionModel[]) => {
      this.listItemTipoExplotacion = [];
      for (let item of data) {
        this.listItemTipoExplotacion.push({ label: item.descripcionTipoExplotacion, value: item.idTipoExplotacion });
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
    if (this.selectedTipoExplotacion !== null) {
      this.modeloFind = {
        idTipoExplotacion: this.selectedTipoExplotacion.value,
        descripcionSubTipoExplotacion: ''
      };
      this.subscription = new Subscription();
      this.subscription = this.extranetService.getSubTipoExplotacion(this.modeloFind)
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

  onRowEditInit(modelo: SubTipoExplotacionModel) {
    this.modelocloned[modelo.idSubTipoExplotacion] = {...modelo};
  }

  onRowEditSave(modelo: SubTipoExplotacionModel) {
    this.subscription = new Subscription();
    this.subscription = this.extranetService.setUpdateSubTipoExplotacion(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idSubTipoExplotacion];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: SubTipoExplotacionModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idSubTipoExplotacion];
    delete this.modelocloned[modelo.idSubTipoExplotacion];
  }

  onToRowSelectDelete(modelo: SubTipoExplotacionModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    if (this.selectedTipoExplotacion !== null) {
      this.router.navigate(['/main/module-ex/sub-tipo-explotacion-create', this.selectedTipoExplotacion.value]);
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
    this.subscription = this.extranetService.setDeleteSubTipoExplotacion(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idSubTipoExplotacion !== this.modeloEliminar.idSubTipoExplotacion );
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
