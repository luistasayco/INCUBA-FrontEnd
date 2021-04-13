import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxSINMIModel } from '../../models/tx-sinmi.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SinmiService } from '../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../services/user-context.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-panel-tx-sinmi',
  templateUrl: './panel-tx-sinmi.component.html',
  styleUrls: ['./panel-tx-sinmi.component.css']
})
export class PanelTxSinmiComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Sistema Integral de Monitoreo Intestinal';
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
  modeloItem: TxSINMIModel;
  listModelo: TxSINMIModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxSINMIModel = new TxSINMIModel();

  saveFiltros: any[];

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService,
              private userContextService: UserContextService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
      { label: 'SINMI', routerLink: ['module-si/panel-tx-sinmi'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { idSINMI: this.modeloItem.idSINMI,
        fecRegistroInicio: this.fecRegistroInicio,
        fecRegistroFin: this.fecRegistroFin,
        selectedEmpresa: this.selectedEmpresa
    });
    
    this.sessionService.setItem('filter-sm', this.saveFiltros);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxSINMIModel();

    this.getToObtieneEmpresa();
    this.modeloItem.idSINMI = 0;
    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-sm')) {
      this.saveFiltros = this.sessionService.getItem('filter-sm');
      this.modeloItem.idSINMI = this.saveFiltros[0].idSINMI;
      this.fecRegistroInicio = new Date(this.saveFiltros[0].fecRegistroInicio);
      this.fecRegistroFin = new Date(this.saveFiltros[0].fecRegistroFin);
      this.selectedEmpresa = this.saveFiltros[0].selectedEmpresa === undefined ? null : this.saveFiltros[0].selectedEmpresa ;
      this.onListar();
    }

    this.columnas = [
      { field: 'idSINMI', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'granja', header: 'Granja' },
      { field: 'edad', header: 'Edad' },
      { field: 'motivoVisita', header: 'Motivo Visita' },
      { field: 'usuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-sinmi')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onLimpiarFiltros () {
      this.sessionService.removeItem('filter-sm');
      this.modeloItem.idSINMI = 0;
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

    console.log(this.modeloItem);
    this.modeloItem.idSINMI = this.modeloItem.idSINMI === null ? 0 : this.modeloItem.idSINMI;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService
    .getTxSINMIPorFiltros(
      this.modeloItem.idSINMI,
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

  onConfirmCerrar(data: TxSINMIModel) {

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

  onToCerrar(data: TxSINMIModel) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.fecCierre = new Date();
    this.subscription$ = this.sinmiService.setUpdateStatusTxSINMI(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idSINMI === data.idSINMI).flgCerrado = true;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).fecCierre = new Date();
        this.listModelo
        .find(x => x.idSINMI === data.idSINMI)
        .usuarioCierre = this.sessionService.getItemDecrypt('usuario');
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).flgCerrado = false;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).fecCierre = null;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).usuarioCierre = '';
        this.listModelo.find(x => x.idSINMI === data.idSINMI).idUsuarioCierre = 0;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxSINMIModel) {
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

  onToEliminar(data: TxSINMIModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.setDeleteTxSINMI(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idSINMI !== data.idSINMI);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxSINMIModel) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.setPDFTxSINMI(modelo.idSINMI)
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
    this.router.navigate(['/main/module-sm/tx-sinmi-create']);
  }

  onToUpdate(data: TxSINMIModel) {
    this.router.navigate(['/main/module-sm/tx-sinmi-update', data.idSINMI]);
  }

  onDatosCierre(data: TxSINMIModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }
}
