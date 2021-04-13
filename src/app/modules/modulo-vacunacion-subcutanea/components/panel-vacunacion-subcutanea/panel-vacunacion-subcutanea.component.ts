import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { TxVacunacionSubCutaneaModel } from '../../models/tx-vacunacion-subcutanea.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { VacunacionSubcutaneaService } from '../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-panel-vacunacion-subcutanea',
  templateUrl: './panel-vacunacion-subcutanea.component.html',
  styleUrls: ['./panel-vacunacion-subcutanea.component.css']
})
export class PanelVacunacionSubcutaneaComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Vacunación SubCutánea';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  fecRegistroInicio: Date;
  fecRegistroFin: Date;

  // Variables de dato seleccionado
  selectedEmpresa: any;

  // Opcion Buscar
  modeloItem: TxVacunacionSubCutaneaModel;
  listModelo: TxVacunacionSubCutaneaModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxVacunacionSubCutaneaModel = new TxVacunacionSubCutaneaModel();

  saveFiltros: any[];

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private vacunacionSubcutaneaService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Vacunación SubCutánea' },
      { label: 'Vacunación SubCutánea', routerLink: ['module-su/panel-vacunacion-subcutanea'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { idVacunacionSubCutanea: this.modeloItem.idVacunacionSubCutanea,
        fecRegistroInicio: this.fecRegistroInicio,
        fecRegistroFin: this.fecRegistroFin,
        selectedEmpresa: this.selectedEmpresa
    });
    
    this.sessionService.setItem('filter-su', this.saveFiltros);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxVacunacionSubCutaneaModel();

    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-su')) {
      this.saveFiltros = this.sessionService.getItem('filter-su');
      this.modeloItem.idVacunacionSubCutanea = this.saveFiltros[0].idVacunacionSubCutanea;
      this.fecRegistroInicio = new Date(this.saveFiltros[0].fecRegistroInicio);
      this.fecRegistroFin = new Date(this.saveFiltros[0].fecRegistroFin);
      this.selectedEmpresa = this.saveFiltros[0].selectedEmpresa === undefined ? null : this.saveFiltros[0].selectedEmpresa ;
      this.onListar();
    }

    this.columnas = [
      { header: 'Nro' },
      { header: 'Fecha' },
      { header: 'Empresa' },
      { header: 'Planta' },
      { header: 'Unidad' },
      { header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-vacunacion-subcutanea')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onLimpiarFiltros () {
    this.sessionService.removeItem('filter-su');
    this.modeloItem.idVacunacionSubCutanea = 0;
    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();
    this.selectedEmpresa = null ;
  }

  onToBuscar() {
    this.onListar();
  }

  getToObtieneEmpresa() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.seguridadService.getEmpresaConAccesoPorUsuario()
    .subscribe((data: EmpresaPorUsuarioModel[]) => {
      this.listItemEmpresa = [];
      for (let item of data) {
        this.listItemEmpresa.push({ label: item.descripcionEmpresa, value: item.codigoEmpresa });
      }
    });
  }

  onListar() {
    // console.log(this.modeloItem.idVacunacionSubCutanea );
    this.modeloItem.idVacunacionSubCutanea = this.modeloItem.idVacunacionSubCutanea === null ? 0 : this.modeloItem.idVacunacionSubCutanea;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService
    .getTxVacunacionSubCutaneaPorFiltros(
      this.modeloItem.idVacunacionSubCutanea,
      this.modeloItem.codigoEmpresa,
      this.fecRegistroInicio,
      this.fecRegistroFin)
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

  onConfirmCerrar(data: TxVacunacionSubCutaneaModel) {

    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }

    this.confirmationService.confirm({
        message: this.globalConstants.subTitleCierre,
        header: this.globalConstants.titleCierre,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToCerrar(data);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToCerrar(data: TxVacunacionSubCutaneaModel) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    this.subscription$ = this.vacunacionSubcutaneaService.setUpdateStatusTxVacunacionSubCutanea(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idVacunacionSubCutanea === data.idVacunacionSubCutanea).flgCerrado = true;
        this.listModelo.find(x => x.idVacunacionSubCutanea === data.idVacunacionSubCutanea).fecCierre = new Date();
        this.listModelo
        .find(x => x.idVacunacionSubCutanea === data.idVacunacionSubCutanea)
        .usuarioCierre = this.sessionService.getItemDecrypt('usuario');
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idVacunacionSubCutanea === data.idVacunacionSubCutanea).flgCerrado = false;
        this.listModelo.find(x => x.idVacunacionSubCutanea === data.idVacunacionSubCutanea).fecCierre = null;
        this.listModelo.find(x => x.idVacunacionSubCutanea === data.idVacunacionSubCutanea).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxVacunacionSubCutaneaModel) {
    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToEliminar(data);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToEliminar(data: TxVacunacionSubCutaneaModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.setDeleteTxVacunacionSubCutanea(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idVacunacionSubCutanea !== data.idVacunacionSubCutanea);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxVacunacionSubCutaneaModel) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.setPDFTxVacunacionSubCutanea(modelo.idVacunacionSubCutanea)
    .subscribe((resp: any) => {
      saveAs(new Blob([resp], {type: 'application/pdf'}), modelo.nombreArchivo);
      this.displayDescarga = false;
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
        this.displayDescarga = false;
      });
  }

  onToCreate() {
    this.router.navigate(['/main/module-su/vacunacion-subcutanea-create']);
  }

  onToUpdate(data: TxVacunacionSubCutaneaModel) {
    this.router.navigate(['/main/module-su/vacunacion-subcutanea-update', data.idVacunacionSubCutanea]);
  }

  onDatosCierre(data: TxVacunacionSubCutaneaModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }
}
