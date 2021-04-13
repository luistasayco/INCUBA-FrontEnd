import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
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
import { TxSINMIConsolidado } from '../../models/tx-sinmi-consolidado.model';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-panel-tx-sinmi-consolidado',
  templateUrl: './panel-tx-sinmi-consolidado.component.html',
  styleUrls: ['./panel-tx-sinmi-consolidado.component.css']
})
export class PanelTxSinmiConsolidadoComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Consolidado';
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
  modeloItem: TxSINMIConsolidado;
  listModelo: TxSINMIConsolidado[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxSINMIConsolidado = new TxSINMIConsolidado();

  saveFiltros: any[];
  data: any;
  options: any;
  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
      { label: 'SINMI - Consolidado', routerLink: ['module-sm/panel-tx-sinmi-consolidado'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { idSINMIConsolidado: this.modeloItem.idSINMIConsolidado,
        fecRegistroInicio: this.fecRegistroInicio,
        fecRegistroFin: this.fecRegistroFin,
        selectedEmpresa: this.selectedEmpresa
    });
    
    this.sessionService.setItem('filter-cs', this.saveFiltros);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxSINMIConsolidado();

    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-cs')) {
      this.saveFiltros = this.sessionService.getItem('filter-cs');
      this.modeloItem.idSINMIConsolidado = this.saveFiltros[0].idSINMIConsolidado;
      this.fecRegistroInicio = new Date(this.saveFiltros[0].fecRegistroInicio);
      this.fecRegistroFin = new Date(this.saveFiltros[0].fecRegistroFin);
      this.selectedEmpresa = this.saveFiltros[0].selectedEmpresa === undefined ? null : this.saveFiltros[0].selectedEmpresa ;
      this.onListar();
    }

    this.columnas = [
      { field: 'idSIMConsolidado', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'descripcionEmpresa', header: 'Empresa' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'observacion', header: 'Observación' },
      { field: 'usuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-sinmi-consolidado')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

 }

 onLimpiarFiltros () {
      this.sessionService.removeItem('filter-cs');
      this.modeloItem.idSINMIConsolidado = 0;
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
    this.modeloItem.idSINMIConsolidado = this.modeloItem.idSINMIConsolidado === null ? 0 : this.modeloItem.idSINMIConsolidado;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService
    .getTxSINMIConsolidadoPorFiltros(
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

  onConfirmCerrar(data: TxSINMIConsolidado) {

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

  onToCerrar(data: TxSINMIConsolidado) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    
    let usuario = this.sessionService.getItemDecrypt('usuario');
    let idUsuario = Number(this.sessionService.getItemDecrypt('idUsuario'));
    data.flgCerrado = true;
    data.idUsuarioCierre = idUsuario;
    data.usuarioCierre = usuario;
    this.subscription$ = this.sinmiService.setUpdateStatusTxSINMIConsolidado(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idSINMIConsolidado === data.idSINMIConsolidado).flgCerrado = true;
        this.listModelo.find(x => x.idSINMIConsolidado === data.idSINMIConsolidado).fecCierre = new Date();
        this.listModelo.find(x => x.idSINMIConsolidado === data.idSINMIConsolidado).usuarioCierre = usuario;
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idSINMIConsolidado === data.idSINMIConsolidado).flgCerrado = false;
        this.listModelo.find(x => x.idSINMIConsolidado === data.idSINMIConsolidado).fecCierre = null;
        this.listModelo.find(x => x.idSINMIConsolidado === data.idSINMIConsolidado).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxSINMIConsolidado) {
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

  onToEliminar(data: TxSINMIConsolidado) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.setDeleteTxSINMIConsolidado(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idSINMIConsolidado !== data.idSINMIConsolidado);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxSINMIConsolidado) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.setPDFTxSINMIConsolidado(modelo.idSINMIConsolidado, modelo.descripcionEmpresa)
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
    this.router.navigate(['/main/module-sm/tx-sinmi-create-consolidado']);
  }

  onToUpdate(data: TxSINMIConsolidado) {
    this.router.navigate(['/main/module-sm/tx-sinmi-update-consolidado', data.idSINMIConsolidado]);
  }

  onDatosCierre(data: TxSINMIConsolidado) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }
}
