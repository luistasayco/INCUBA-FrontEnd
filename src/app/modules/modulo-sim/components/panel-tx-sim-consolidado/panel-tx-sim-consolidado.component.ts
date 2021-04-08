import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxSIMConsolidado } from '../../models/tx-sim-consolidado-model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SimService } from '../../services/sim.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-panel-tx-sim-consolidado',
  templateUrl: './panel-tx-sim-consolidado.component.html',
  styleUrls: ['./panel-tx-sim-consolidado.component.css']
})
export class PanelTxSimConsolidadoComponent implements OnInit, OnDestroy {

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
  modeloItem: TxSIMConsolidado;
  listModelo: TxSIMConsolidado[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxSIMConsolidado = new TxSIMConsolidado();

  saveFiltros: any[];
  data: any;
  options: any;
  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private simService: SimService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Sistema Integración Monitoreo' },
      { label: 'SIM - Consolidado', routerLink: ['module-si/panel-tx-sim-consolidado'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { idSIMConsolidado: this.modeloItem.idSIMConsolidado,
        fecRegistroInicio: this.fecRegistroInicio,
        fecRegistroFin: this.fecRegistroFin,
        selectedEmpresa: this.selectedEmpresa
    });
    
    this.sessionService.setItem('filter-co', this.saveFiltros);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.modeloItem = new TxSIMConsolidado();

    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;

    this.fecRegistroInicio = new Date();
    this.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-co')) {
      this.saveFiltros = this.sessionService.getItem('filter-co');
      this.modeloItem.idSIMConsolidado = this.saveFiltros[0].idSIMConsolidado;
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
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-sim-consolidado')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

    
  }

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     datalabels: {
  //       anchor: "end",
  //       align: "end",
  //       font: {
  //         size: 12
  //       }
  //     }
  //   }
  // };

  // public barChartLabels: Label[] = [
  //   "2006",
  //   "2007",
  //   "2008",
  //   "2009",
  //   "2010",
  //   "2011",
  //   "2012"
  // ];
  // public barChartType: ChartType = "bar";
  // public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" }
  // ];

  onLimpiarFiltros () {
      this.sessionService.removeItem('filter-co');
      this.modeloItem.idSIMConsolidado = 0;
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
    this.modeloItem.idSIMConsolidado = this.modeloItem.idSIMConsolidado === null ? 0 : this.modeloItem.idSIMConsolidado;
    this.modeloItem.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService
    .getTxSIMConsolidadoPorFiltros(
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

  onConfirmCerrar(data: TxSIMConsolidado) {

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

  onToCerrar(data: TxSIMConsolidado) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    
    let usuario = this.sessionService.getItemDecrypt('usuario');
    let idUsuario = Number(this.sessionService.getItemDecrypt('idUsuario'));
    data.flgCerrado = true;
    data.idUsuarioCierre = idUsuario;
    data.usuarioCierre = usuario;
    this.subscription$ = this.simService.setUpdateStatusTxSIMConsolidado(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idSIMConsolidado === data.idSIMConsolidado).flgCerrado = true;
        this.listModelo.find(x => x.idSIMConsolidado === data.idSIMConsolidado).fecCierre = new Date();
        this.listModelo.find(x => x.idSIMConsolidado === data.idSIMConsolidado).usuarioCierre = usuario;
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idSIMConsolidado === data.idSIMConsolidado).flgCerrado = false;
        this.listModelo.find(x => x.idSIMConsolidado === data.idSIMConsolidado).fecCierre = null;
        this.listModelo.find(x => x.idSIMConsolidado === data.idSIMConsolidado).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxSIMConsolidado) {
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

  onToEliminar(data: TxSIMConsolidado) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.setDeleteTxSIMConsolidado(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idSIMConsolidado !== data.idSIMConsolidado);
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: TxSIMConsolidado) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.setPDFTxSIMConsolidado(modelo.idSIMConsolidado, modelo.descripcionEmpresa)
    .subscribe((resp: any) => {
      saveAs(new Blob([resp], {type: 'application/pdf'}), modelo.nombreArchivo);
      this.displayDescarga = false;
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
        this.displayDescarga = false;
      });
    // var canvas = document.getElementById('barra');
    // var dataURL = canvas.toDataURL();
    // console.log(dataURL);
  }

  onToCreate() {
    this.router.navigate(['/main/module-si/tx-sim-create-consolidado']);
  }

  onToUpdate(data: TxSIMConsolidado) {
    this.router.navigate(['/main/module-si/tx-sim-update-consolidado', data.idSIMConsolidado]);
  }

  onDatosCierre(data: TxSIMConsolidado) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }

}
