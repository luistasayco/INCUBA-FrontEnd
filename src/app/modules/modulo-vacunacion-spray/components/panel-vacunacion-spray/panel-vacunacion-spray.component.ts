import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { TxVacunacionSprayModel } from '../../models/tx-vacunacion-spray.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { VacunacionSprayService } from '../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-panel-vacunacion-spray',
  templateUrl: './panel-vacunacion-spray.component.html',
  styleUrls: ['./panel-vacunacion-spray.component.css']
})
export class PanelVacunacionSprayComponent implements OnInit {

  // Titulo del componente
  titulo = 'Vacunación Spray';
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
  modeloItem: TxVacunacionSprayModel;
  listModelo: TxVacunacionSprayModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxVacunacionSprayModel = new TxVacunacionSprayModel();

  saveFiltros: any[];

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Vacunación Spray' },
      { label: 'Vacunación Spray', routerLink: ['module-sp/panel-vacunacion-spray'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { idVacunacionSpray: this.modeloItem.idVacunacionSpray,
        fecRegistroInicio: this.fecRegistroInicio,
        fecRegistroFin: this.fecRegistroFin,
        selectedEmpresa: this.selectedEmpresa
    });
    
    this.sessionService.setItem('filter-sp', this.saveFiltros);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxVacunacionSprayModel();

    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-sp')) {
      this.saveFiltros = this.sessionService.getItem('filter-sp');
      this.modeloItem.idVacunacionSpray = this.saveFiltros[0].idVacunacionSpray;
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
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-vacunacion-spray')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onLimpiarFiltros () {
    this.sessionService.removeItem('filter-sp');
    this.modeloItem.idVacunacionSpray = 0;
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
    // console.log(this.modeloItem.idVacunacionSpray );
    this.modeloItem.idVacunacionSpray = this.modeloItem.idVacunacionSpray === null ? 0 : this.modeloItem.idVacunacionSpray;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService
    .getTxVacunacionSprayPorFiltros(
      this.modeloItem.idVacunacionSpray,
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

  onConfirmCerrar(data: TxVacunacionSprayModel) {

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

  onToCerrar(data: TxVacunacionSprayModel) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    this.subscription$ = this.vacunacionSprayService.setUpdateStatusTxVacunacionSpray(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idVacunacionSpray === data.idVacunacionSpray).flgCerrado = true;
        this.listModelo.find(x => x.idVacunacionSpray === data.idVacunacionSpray).fecCierre = new Date();
        this.listModelo
        .find(x => x.idVacunacionSpray === data.idVacunacionSpray)
        .usuarioCierre = this.sessionService.getItemDecrypt('usuario');
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idVacunacionSpray === data.idVacunacionSpray).flgCerrado = false;
        this.listModelo.find(x => x.idVacunacionSpray === data.idVacunacionSpray).fecCierre = null;
        this.listModelo.find(x => x.idVacunacionSpray === data.idVacunacionSpray).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxVacunacionSprayModel) {
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

  onToEliminar(data: TxVacunacionSprayModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.setDeleteTxVacunacionSpray(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idVacunacionSpray !== data.idVacunacionSpray);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxVacunacionSprayModel) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.setPDFTxVacunacionSpray(modelo.idVacunacionSpray)
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
    this.router.navigate(['/main/module-sp/vacunacion-spray-create']);
  }

  onToUpdate(data: TxVacunacionSprayModel) {
    this.router.navigate(['/main/module-sp/vacunacion-spray-update', data.idVacunacionSpray]);
  }

  onDatosCierre(data: TxVacunacionSprayModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }

}
