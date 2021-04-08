import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { Subscription } from 'rxjs';
import { TxSIMModel } from '../../models/tx-sim.model';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { SimService } from '../../services/sim.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';
import { UserContextService } from '../../../../services/user-context.service';

@Component({
  selector: 'app-panel-tx-sim',
  templateUrl: './panel-tx-sim.component.html',
  styleUrls: ['./panel-tx-sim.component.css']
})
export class PanelTxSimComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Sistema Integrado Monitoreo';
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
  modeloItem: TxSIMModel;
  listModelo: TxSIMModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxSIMModel = new TxSIMModel();

  saveFiltros: any[];

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private simService: SimService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService,
              private userContextService: UserContextService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Sistema Integración Monitoreo' },
      { label: 'SIM', routerLink: ['module-si/panel-tx-sim'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { idSIM: this.modeloItem.idSIM,
        fecRegistroInicio: this.fecRegistroInicio,
        fecRegistroFin: this.fecRegistroFin,
        selectedEmpresa: this.selectedEmpresa
    });
    
    this.sessionService.setItem('filter-si', this.saveFiltros);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxSIMModel();

    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-si')) {
      this.saveFiltros = this.sessionService.getItem('filter-si');
      this.modeloItem.idSIM = this.saveFiltros[0].idSIM;
      this.fecRegistroInicio = new Date(this.saveFiltros[0].fecRegistroInicio);
      this.fecRegistroFin = new Date(this.saveFiltros[0].fecRegistroFin);
      this.selectedEmpresa = this.saveFiltros[0].selectedEmpresa === undefined ? null : this.saveFiltros[0].selectedEmpresa ;
      this.onListar();
    }

    this.columnas = [
      { field: 'idExamenFisico', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'granja', header: 'Granja' },
      { field: 'edad', header: 'Edad' },
      { field: 'zona', header: 'Zona' },
      { field: 'usuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-sim')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onLimpiarFiltros () {
      this.sessionService.removeItem('filter-si');
      this.modeloItem.idSIM = 0;
      this.fecRegistroInicio = new Date();
      this.fecRegistroFin = new Date();
      this.selectedEmpresa = null;
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
    this.modeloItem.idSIM = this.modeloItem.idSIM === null ? 0 : this.modeloItem.idSIM;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService
    .getTxSIMPorFiltros(
      this.modeloItem.idSIM,
      this.modeloItem.codigoEmpresa,
      this.fecRegistroInicio,
      this.fecRegistroFin)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
          console.log('this.listModelo', this.listModelo);
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmCerrar(data: TxSIMModel) {

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

  onToCerrar(data: TxSIMModel) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.fecCierre = new Date();
    this.subscription$ = this.simService.setUpdateStatusTxSIM(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idSIM === data.idSIM).flgCerrado = true;
        this.listModelo.find(x => x.idSIM === data.idSIM).fecCierre = new Date();
        this.listModelo
        .find(x => x.idSIM === data.idSIM)
        .usuarioCierre = this.sessionService.getItemDecrypt('usuario');
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idSIM === data.idSIM).flgCerrado = false;
        this.listModelo.find(x => x.idSIM === data.idSIM).fecCierre = null;
        this.listModelo.find(x => x.idSIM === data.idSIM).usuarioCierre = '';
        this.listModelo.find(x => x.idSIM === data.idSIM).idUsuarioCierre = 0;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxSIMModel) {
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

  onToEliminar(data: TxSIMModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.setDeleteTxSIM(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idSIM !== data.idSIM);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxSIMModel) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.setPDFTxSIM(modelo.idSIM)
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
    this.router.navigate(['/main/module-si/tx-sim-create']);
  }

  onToUpdate(data: TxSIMModel) {
    this.router.navigate(['/main/module-si/tx-sim-update', data.idSIM]);
  }

  onDatosCierre(data: TxSIMModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }
}
