import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { TxExamenFisicoPollitoModel } from '../../models/tx-examen-fisico-pollito';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { ExamenFisicoPollitoService } from '../../services/examen-fisico-pollito.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';

@Component({
  selector: 'app-panel-tx-examen-fisico-pollito',
  templateUrl: './panel-tx-examen-fisico-pollito.component.html',
  styleUrls: ['./panel-tx-examen-fisico-pollito.component.css']
})
export class PanelTxExamenFisicoPollitoComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Examen Fisico del Pollito';
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
  modeloItem: TxExamenFisicoPollitoModel;
  listModelo: TxExamenFisicoPollitoModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;

  modeloDatosCierre: TxExamenFisicoPollitoModel = new TxExamenFisicoPollitoModel();

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Examen Físico' },
      { label: 'Examen Físico del Pollito', routerLink: ['module-ef/panel-tx-examen-fisico-pollito'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.sessionService.setItemEncrypt('filter-ef-idExamenFisico', this.modeloItem.idExamenFisico);
    this.sessionService.setItemEncrypt('filter-ef-fecRegistroInicio', this.fecRegistroInicio);
    this.sessionService.setItemEncrypt('filter-ef-fecRegistroFin', this.fecRegistroFin);
    this.sessionService.setItemEncrypt('filter-ef-selectedEmpresa', this.selectedEmpresa);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxExamenFisicoPollitoModel();

    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-ef-idExamenFisico')) {
      this.modeloItem.idExamenFisico = this.sessionService.getItemDecrypt('filter-ef-idExamenFisico');
      this.fecRegistroInicio = new Date(this.sessionService.getItemDecrypt('filter-ef-fecRegistroInicio'));
      this.fecRegistroFin = new Date(this.sessionService.getItemDecrypt('filter-ef-fecRegistroFin'));
      if (this.sessionService.getItemDecrypt('filter-ef-selectedEmpresa') !== 'null') {
        this.selectedEmpresa = this.sessionService.getItemDecrypt('filter-ef-selectedEmpresa');
      }
      this.onListar();
    }

    this.columnas = [
      { field: 'idExamenFisico', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'calificacion', header: 'Calificacion' },
      { field: 'descripcionCalidad', header: 'Calidad' },
      { field: 'usuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-examen-fisico-pollito')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
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
    this.modeloItem.idExamenFisico = this.modeloItem.idExamenFisico === null ? 0 : this.modeloItem.idExamenFisico;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService
    .getTxExamenFisicoPollitoPorFiltros(
      this.modeloItem.idExamenFisico,
      this.modeloItem.codigoEmpresa,
      this.fecRegistroInicio,
      this.fecRegistroFin)
    .subscribe(resp => {
      if (resp) {
        console.log(resp);
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmCerrar(data: TxExamenFisicoPollitoModel) {

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

  onToCerrar(data: TxExamenFisicoPollitoModel) {
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    this.subscription$ = this.examenFisicoPollitoService.setUpdateStatusTxExamenFisicoPollito(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idExamenFisico === data.idExamenFisico).flgCerrado = true;
        this.listModelo.find(x => x.idExamenFisico === data.idExamenFisico).fecCierre = new Date();
        this.listModelo
        .find(x => x.idExamenFisico === data.idExamenFisico)
        .usuarioCierre = this.sessionService.getItemDecrypt('usuario');

        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.listModelo.find(x => x.idExamenFisico === data.idExamenFisico).flgCerrado = false;
        this.listModelo.find(x => x.idExamenFisico === data.idExamenFisico).fecCierre = null;
        this.listModelo.find(x => x.idExamenFisico === data.idExamenFisico).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxExamenFisicoPollitoModel) {
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

  onToEliminar(data: TxExamenFisicoPollitoModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService.setDeleteExamenFisicoPollito(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idExamenFisico !== data.idExamenFisico);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxExamenFisicoPollitoModel) {

    this.examenFisicoPollitoService.setPDFExamenFisicoPollito(modelo.idExamenFisico)
    .subscribe((resp: any) => {
      // let file = new window.Blob([resp], {type: 'application/pdf'});
      saveAs(new Blob([resp], {type: 'application/pdf'}), `ExamenFisico#${modelo.idExamenFisico.toString()}`);
      // let fileURL = window.URL.createObjectURL(file);
      // window.open(fileURL, '_blank');
    },
      (error) => {
        console.log('error', error);
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onToCreate() {
    this.router.navigate(['/main/module-ef/create-tx-examen-fisico-pollito']);
  }

  onToUpdate(data: TxExamenFisicoPollitoModel) {
    this.router.navigate(['/main/module-ef/update-tx-examen-fisico-pollito', data.idExamenFisico]);
  }

  onDatosCierre(data: TxExamenFisicoPollitoModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }
}
