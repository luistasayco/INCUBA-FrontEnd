import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxVacunacionSubCutaneaModel } from '../../../models/tx-vacunacion-subcutanea.model';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { ProcesoSubCutaneaModel } from '../../../models/proceso-subcutanea.model';
import { ProcesoDetalleSubCutaneaModel } from '../../../models/proceso-detalle-subcutanea';
import { IrregularidadModel } from '../../../models/irregularidad.model';
import { IndiceEficienciaModel } from '../../../models/indice-eficiencia.model';
import { Subscription } from 'rxjs';
import { TxVacunacionSubCutaneaControlEficienciaModel } from '../../../models/tx-vacunacion-subcutanea-control-eficiencia.model';
import { TxVacunacionSubCutaneayVacunaModel } from '../../../models/tx-vacunacion-subcutanea-vacuna.model';
import { TxVacunacionSubCutaneaDetalleModel } from '../../../models/tx-vacunacion-subcutanea-detalle.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { VacunacionSprayService } from '../../../../modulo-vacunacion-spray/services/vacunacion-spray.service';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../../../modulo-registro-equipo/services/registro-equipo.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { PlantaPorUsuarioModel } from '../../../../modulo-seguridad/models/planta-por-usuario';
import { VacunaModel } from '../../../../modulo-vacunacion-spray/models/vacuna.model';
import { AgujaModel } from '../../../models/aguja.model';
import { EquipoPorModeloModel } from '../../../../modulo-registro-equipo/models/equipo-por-modelo.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { TxVacunacionSubCutaneaIrregularidadModel } from '../../../models/tx-vacunacion-subcutanea-irregularidad.model';
import { TxVacunacionSubCutaneaMaquinaModel } from '../../../models/tx-vacunacion-subcutanea-maquina.model';
import { VacunacionSubcutaneaLocalService } from '../../../services/vacunacion-subcutanea-local.service';
import { VacunacionSprayLocalService } from '../../../../modulo-vacunacion-spray/services/vacunacion-spray-local.service';
import { CompartidoLocalService } from '../../../../modulo-compartido/services/compartido-local.service';
import { RegistroEquipoLocalService } from '../../../../modulo-registro-equipo/services/registro-equipo-local.service';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vacunacion-subcutanea-offline-create',
  templateUrl: './vacunacion-subcutanea-offline-create.component.html',
  styleUrls: ['./vacunacion-subcutanea-offline-create.component.css']
})
export class VacunacionSubcutaneaOfflineCreateComponent implements OnInit, OnDestroy {
  titulo = 'Vacunación SubCutánea';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemModelo: SelectItem[];
  listItemVacuna: SelectItem[];
  listItemAguja: SelectItem[];
  listItemEquipo: SelectItem[];

  modeloItem: TxVacunacionSubCutaneaModel = new TxVacunacionSubCutaneaModel();
  modeloEmpresa: EmpresaModel = new EmpresaModel();

  listProceso: ProcesoSubCutaneaModel[];
  listProcesoDetalle: ProcesoDetalleSubCutaneaModel[];
  listIrregularidad: IrregularidadModel[];
  listIndiceEficiencia: IndiceEficienciaModel[];

  columnasMaquina: any[];
  columnasVacuna: any[];
  columnasSeleccionarMaquina: any[];
  columnasResultado: any[];
  columnasIrregularidad: any[];
  columnasNuevoIrregularidad: any[];
  columnasControlEficiencia: any[];
  columnasPromedio: any[];

  selectEmpresa: any;
  selectedPlanta: any;
  selectSexo: any;
  selectVacuna: any;
  selectModelo: any;
  selectAguja: any;
  selectEquipo: any[];
  selectSeleccionMaquina: ProcesoSubCutaneaModel[];
  selectIrregularidad: IrregularidadModel[];
  selectNumeroAF: any;

  subscription$: Subscription;

  displaySave: boolean;

  rowGroupMetadata: any;

  displayVacuna: boolean;
  displayMaquina: boolean;
  displayIrregularidad: boolean;

  nombreVacuna: string;
  nombreVacunador: string;
  nombreVacunadorControlEficiencia: any;

  modeloControlEficiencia: TxVacunacionSubCutaneaControlEficienciaModel = new TxVacunacionSubCutaneaControlEficienciaModel();
  listControlEficienciaPromedio: TxVacunacionSubCutaneaControlEficienciaModel[];
  

  clonedVacuna: { [s: string]: TxVacunacionSubCutaneayVacunaModel; } = {};
  clonedProcesoDetalle: TxVacunacionSubCutaneaDetalleModel[] = [];

  displaySeleccionProceso: boolean;
  displayControlEficiencia: boolean;

  modeloclonedControlEficiencia: { [s: string]: TxVacunacionSubCutaneaControlEficienciaModel; } = {};
  displayControles: boolean;
  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private vacunacionSubcutaneaLocalService: VacunacionSubcutaneaLocalService,
              private vacunacionSprayLocalService: VacunacionSprayLocalService,
              private router: Router,
              private compartidoLocalService: CompartidoLocalService,
              // private seguridadService: SeguridadService,
              private userContextService: UserContextService,
              // private compartidoService: CompartidoService,
              private registroEquipoLocalService: RegistroEquipoLocalService,
              private utilService: UtilService) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Subcutánea - Offline' },
        { label: this.titulo, routerLink: ['module-su/panel-vacunacion-subcutanea-offline'] },
        { label: 'Nuevo'}
    ]);
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "Unsaved modifications";
      return event;
   });
  }

  ngOnInit(): void {
    this.selectSeleccionMaquina = [];
    this.selectIrregularidad = [];
    this.selectVacuna = null;

    this.selectEmpresa = null;
    this.selectedPlanta = null;
    this.selectModelo = null;
    this.selectEquipo = [];
    this.nombreVacunadorControlEficiencia = null;
    this.listControlEficienciaPromedio = [];

    this.nombreVacuna = '';
    this.columnasMaquina = [
      { header: 'Aguja' },
      { header: 'N° máquinas' },
      { header: 'Modelo/Marca' },
      { header: 'Codigo AF' }
    ];
    this.columnasVacuna = [
      { header: 'Vacuna' },
      { header: 'Nombre Vacuna' }
    ];

    this.columnasSeleccionarMaquina = [
      {header: 'Codigo', field: 'idProcesoSubCutanea'},
      {header: 'Descripción', field: 'descripcionProcesoSubCutanea'}
    ]

    this.columnasResultado = [
      { header: 'Descripción' },
      { header: 'Valor Esperado' },
      { header: 'Valor Obtenido' }
    ];

    this.columnasIrregularidad = [
      { header: 'Descripción'},
      { header: 'Codigo AF'},
      { header: 'Ausencia de Irregularidad'},
      { header: 'Valor'}
    ];

    this.columnasNuevoIrregularidad = [
      {header: 'Codigo', field: 'idIrregularidad'},
      {header: 'Descripción', field: 'descripcionIrregularidad'}
    ];

    this.columnasControlEficiencia = [
      { header: 'Vacunador'},
      { header: 'Cantidad Inicial'},
      { header: 'Cantidad Final'},
      { header: 'Vac./Hora'},
      { header: 'Puntaje Productividad'},
      { header: 'Controlados'},
      { header: 'Sin Vacunar'},
      { header: 'Heridos'},
      { header: 'Mojados'},
      { header: 'Mala Posición'},
      { header: 'Vac. Correctamente'},
      { header: '% de Eficiencia'},
      { header: 'Puntaje de Eficiencia'}
    ];

    this.columnasPromedio = [
      { header: 'Vacunador'},
      { header: 'Vac./Hora'},
      { header: 'Puntaje Productividad'},
      { header: 'Controlados'},
      { header: 'Sin Vacunar'},
      { header: 'Heridos'},
      { header: 'Mojados'},
      { header: 'Mala Posición'},
      { header: 'Vac. Correctamente'},
      { header: '% de Eficiencia'},
      { header: 'Puntaje de Eficiencia'}
    ];

    this.getToObtieneEmpresa();
    this.getToObtieneVacuna();
    this.getToObtieneModelo();
    this.getToObtieneAguja();
    this.getToObtieneProceso();
    this.getToObtieneIrregularidad();
    this.getToObtieneIndiceEficiencia();

    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.getTxVacunacionSubcutaneaPorIdNew()
    .subscribe((data: TxVacunacionSubCutaneaModel[]) => {
      
      this.modeloItem = data[0];
      this.modeloItem.responsableInvetsa = this.userContextService.getNombreCompletoUsuario();
      this.modeloItem.emailFrom = this.userContextService.getEmail();
      this.modeloItem.listarTxVacunacionSubCutaneaVacuna = [];
      this.modeloItem.listarTxVacunacionSubCutaneaMaquina = [];
      this.modeloItem.listarTxVacunacionSubCutaneaFotos = [];
      this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia = [];
      this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad = [];
      this.modeloItem.listarTxVacunacionSubCutaneaPromedio = [];
      this.clonedProcesoDetalle = [...this.modeloItem.listarTxVacunacionSubCutaneaDetalle];
      this.updateRowGroupMetaData();
    });

  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  getToObtieneEmpresa() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoLocalService.getEmpresa()
    .subscribe((data: EmpresaModel[]) => {
      this.listItemEmpresa = [];
      for (let item of data) {
        this.listItemEmpresa.push({ label: item.descripcion, value: item.codigoEmpresa });
      }
      });
  }

  getOnChangeEmpresa() {
    if (this.selectEmpresa !== null) {
      this.getToObtienePlantaPorEmpresa(this.selectEmpresa.value);
    } else {
      this.listItemPlanta = [];
    }
  }

  getToObtienePlantaPorEmpresa(value: string) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoLocalService.getPlantaPorEmpresa()
    .subscribe((data: PlantaModel[]) => {
      let dataFilter = [...data].filter(x => x.codigoEmpresa === value);
      this.listItemPlanta = [];
      for (let item of dataFilter) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
    });
  }

  getToObtieneVacuna() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayLocalService.getVacuna()
    .subscribe((data: VacunaModel[]) => {
      this.listItemVacuna = [];
      for (let item of data) {
        this.listItemVacuna.push({ label: item.descripcionVacuna, value: item.idVacuna });
      }
      });
  }

  getToObtieneAguja() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.getAguja()
    .subscribe((data: AgujaModel[]) => {
      this.listItemAguja = [];
      for (let item of data) {
        this.listItemAguja.push({ label: item.descripcionAguja, value: item.idAguja });
      }
    });
  }

  getToObtieneIndiceEficiencia() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.getIndiceEficiencia()
    .subscribe((data: IndiceEficienciaModel[]) => {
      this.listIndiceEficiencia = [];
      this.listIndiceEficiencia = data;
    });
  }

  getToObtieneProceso() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.getProcesoSubCutanea()
    .subscribe((data: ProcesoSubCutaneaModel[]) => {
      this.listProceso = [];
      this.listProceso = [...data].filter(x => x.valor > 0);
    });
  }

  getToObtieneIrregularidad() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.getIrregularidad()
    .subscribe((data: IrregularidadModel[]) => {
      this.listIrregularidad = [];
      this.listIrregularidad = [...data];
    });
  }

  getToObtieneAF() {

    if (!this.selectEmpresa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Empresa');
      return;
    }
    if (!this.selectedPlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Planta');
      return;
    }

    if (!this.selectModelo) {
      return;
    }

    let modeloEquipoPorModelo: EquipoPorModeloModel = new EquipoPorModeloModel();
    modeloEquipoPorModelo.codigoEmpresa = this.selectEmpresa === null ? '' : this.selectEmpresa.value;
    modeloEquipoPorModelo.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    modeloEquipoPorModelo.codigoModelo = this.selectModelo === null ? '' : this.selectModelo.value;

    if (modeloEquipoPorModelo.codigoEmpresa === '' && modeloEquipoPorModelo.codigoPlanta === '' && modeloEquipoPorModelo.codigoModelo === '') {
      return;
    }
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayLocalService.getEquipo()
    .subscribe((data: EquipoPorModeloModel[]) => {
      this.listItemEquipo = [];

      let clonedData = [...data].filter(xFila => 
        xFila.codigoEmpresa === modeloEquipoPorModelo.codigoEmpresa &&
        xFila.codigoPlanta === modeloEquipoPorModelo.codigoPlanta &&
        xFila.codigoModelo === modeloEquipoPorModelo.codigoModelo 
      );

      for (let item of clonedData) {
        this.listItemEquipo.push({ label: item.codigoEquipo, value: item.codigoEquipo });
      }
    });
  }

  getToObtieneModelo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoLocalService.getModeloLocal()
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.codigoModelo });
      }
    });
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.modeloItem.listarTxVacunacionSubCutaneaDetalle) {
      for (let i = 0; i < this.modeloItem.listarTxVacunacionSubCutaneaDetalle.length; i++) {
        let rowData = this.modeloItem.listarTxVacunacionSubCutaneaDetalle[i];
        let brand = rowData.descripcionProcesoSubCutanea;
        if (i === 0) {
            this.rowGroupMetadata[brand] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.modeloItem.listarTxVacunacionSubCutaneaDetalle[i - 1];
          let previousRowGroup = previousRowData.descripcionProcesoSubCutanea;
          if ( brand === previousRowGroup )
            this.rowGroupMetadata[brand].size++;
          else
            this.rowGroupMetadata[brand] = { index: i, size: 1 };
        }
      }
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listarTxVacunacionSubCutaneaFotos = [];
    event.forEach(x => {
      this.modeloItem.listarTxVacunacionSubCutaneaFotos.push({
        idVacunacionSubCutaneaDetalle: 0,
        idVacunacionSubCutanea: 0,
        foto: x.imagen
      });
    });
  }

  onGrabarMaquina() {
    if (this.selectEquipo.length > 0 ) {
      this.selectEquipo.forEach(data => {
        this.modeloItem.listarTxVacunacionSubCutaneaMaquina.push(
          {
            idVacunacionSubCutaneaMaquina: 0,
            idVacunacionSubCutanea:0,
            idAguja: this.selectAguja.value,
            descripcionAguja: this.selectAguja.label,
            nroMaquinas: this.selectEquipo.length,
            codigoModelo: this.selectModelo.value,
            descripcionModelo: this.selectModelo.label,
            codigoEquipo: data
          });
      });
    }
    this.selectModelo = null;
    this.selectAguja = null;
    this.selectEquipo = null;
    this.displayMaquina = false;
  }

  onGrabarVacuna() {
    if (this.selectVacuna !== null) {
      this.modeloItem.listarTxVacunacionSubCutaneaVacuna.push(
        {
          idVacunacionSubCutaneaVacuna: 0,
          idVacunacionSubCutanea:0,
          idVacuna: this.selectVacuna.value,
          descripcionVacuna: this.selectVacuna.label,
          nombreVacuna: this.nombreVacuna
        });
    }
    this.selectVacuna = null;
    this.nombreVacuna = '';
    this.displayVacuna = false;
  }
  onGrabarSeleccionMaquina() {

    let cloneDataDetalleOriginal = [...this.clonedProcesoDetalle];
    let clonedDataResultado = [...this.modeloItem.listarTxVacunacionSubCutaneaResultado];
    let clonedListProcesoOriginal = [...this.listProceso];
    

    clonedDataResultado.forEach(x => {
      x.nroProcesoAcumulado = 0;
    });

    // console.log('clonedDataResultado', clonedDataResultado);
    if (this.selectSeleccionMaquina.length === 0) {
      let cloneDataDetalle2 = [...cloneDataDetalleOriginal];
      this.listProceso.forEach(x => {
        cloneDataDetalle2 = [...cloneDataDetalle2].filter(y => y.idProcesoSubCutanea !== x.idProcesoSubCutanea)
      });
      this.modeloItem.listarTxVacunacionSubCutaneaDetalle = [...cloneDataDetalle2];
      this.modeloItem.listarTxVacunacionSubCutaneaResultado = clonedDataResultado;
      this.updateRowGroupMetaData();
    } else {

      this.selectSeleccionMaquina.forEach(x => {
        clonedListProcesoOriginal = [...clonedListProcesoOriginal].filter(xx => xx.idProcesoSubCutanea !== x.idProcesoSubCutanea);

        let existeRegistroResultado = [...clonedDataResultado].filter(xFilaResultado => xFilaResultado.idProcesoAgrupador === x.idProcesoAgrupador).length;
        if (existeRegistroResultado>0) {
          clonedDataResultado.find(xFilaResultado => xFilaResultado.idProcesoAgrupador === x.idProcesoAgrupador).nroProcesoAcumulado += 1;
        }
        
      });

      this.modeloItem.listarTxVacunacionSubCutaneaResultado = clonedDataResultado;
      let cloneDataDetalleSeleccionado = [...cloneDataDetalleOriginal];

      clonedListProcesoOriginal.forEach(x => {
        cloneDataDetalleSeleccionado = [...cloneDataDetalleSeleccionado].filter(y => y.idProcesoSubCutanea !== x.idProcesoSubCutanea)
      });

      this.modeloItem.listarTxVacunacionSubCutaneaDetalle = [...cloneDataDetalleSeleccionado];
      this.updateRowGroupMetaData();
    }
    
    this.displaySeleccionProceso = false;
  }


  onCalcularPuntaje() {

    this.listControlEficienciaPromedio = [];
    this.modeloItem.listarTxVacunacionSubCutaneaPromedio = [];
    let clonedDetalleCalcular = [...this.modeloItem.listarTxVacunacionSubCutaneaDetalle];
    let clonedResultadoCalcular = [...this.modeloItem.listarTxVacunacionSubCutaneaResultado];
    let valorAsumar = 0.00;

    clonedResultadoCalcular.map(z => z.valorObtenido = 0);

    clonedDetalleCalcular.forEach( xfila => {
      valorAsumar = xfila.valorProcesoDetalleSubCutanea;
      if (xfila.valorProcesoSubCutanea > 0) {
        if (xfila.valor) {
          clonedResultadoCalcular.find(xitem => xitem.idProcesoAgrupador === xfila.idProcesoAgrupador).valorObtenido += valorAsumar;
        }
      }
    });
    this.modeloItem.listarTxVacunacionSubCutaneaResultado = [...clonedResultadoCalcular];

    let clonedResultadoFilanCalcular = [...this.modeloItem.listarTxVacunacionSubCutaneaResultado];
    clonedResultadoFilanCalcular.forEach(xFila => {
      if (xFila.nroProcesoAcumulado > 0 ) {
        clonedResultadoFilanCalcular.find(xitem => xitem.idProcesoAgrupador === xFila.idProcesoAgrupador).valorObtenido = this.utilService.onRedondearDecimal(xFila.valorObtenido/ xFila.nroProcesoAcumulado,2);
      } else {
        clonedResultadoFilanCalcular.find(xitem => xitem.idProcesoAgrupador === xFila.idProcesoAgrupador).valorObtenido = 0;
      }
    });

    this.modeloItem.listarTxVacunacionSubCutaneaResultado = [...clonedResultadoFilanCalcular];

    if (this.modeloItem.flgPorcentajeViabilidad) {
      this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador ===2).valorObtenido = 0.5;
    }

    // Calculamos puntaje Final de Irregularidad

    let IrregularidadPuntajeFinal: any[]
    IrregularidadPuntajeFinal =[];

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.forEach(xFila => {
      let dataIrregularidad = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(yFila => yFila.nombreVacunador === xFila.nombreVacunador);
      let puntejaPorVacunador = 0;
      dataIrregularidad.forEach(zFila => {
        puntejaPorVacunador += zFila.valor
      });
        
      IrregularidadPuntajeFinal.push({nombreVacunado: xFila.nombreVacunador, puntaje: puntejaPorVacunador});
    });

    let counIrregularidadPorVacunado = IrregularidadPuntajeFinal.length;
    let totalIrregularidadPorVacunador = 0;
    if (IrregularidadPuntajeFinal.length > 0) {
      IrregularidadPuntajeFinal.forEach(xFila => {
        totalIrregularidadPorVacunador += xFila.puntaje;
      });

      this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador === 3).valorObtenido = totalIrregularidadPorVacunador/ counIrregularidadPorVacunado;

    } else {
      this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador === 3).valorObtenido = 0;
    }


    

    let sumarControldeEficiencia: TxVacunacionSubCutaneaControlEficienciaModel = new TxVacunacionSubCutaneaControlEficienciaModel();
    let promedioControldeEficiencia: TxVacunacionSubCutaneaControlEficienciaModel = new TxVacunacionSubCutaneaControlEficienciaModel();

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.forEach(xFila => {
      sumarControldeEficiencia.idVacunacionSubCutaneaDetalle = 0,
      sumarControldeEficiencia.idVacunacionSubCutanea = 0,
      sumarControldeEficiencia.nombreVacunador = 'Sumatoria',
      sumarControldeEficiencia.vacunadoPorHora += xFila.vacunadoPorHora;
      sumarControldeEficiencia.puntajeProductividad += xFila.puntajeProductividad;
      sumarControldeEficiencia.controlados += xFila.controlados;
      sumarControldeEficiencia.sinVacunar += xFila.sinVacunar;
      sumarControldeEficiencia.heridos += xFila.heridos;
      sumarControldeEficiencia.mojados += xFila.mojados;
      sumarControldeEficiencia.malaPosicion += xFila.malaPosicion;
      sumarControldeEficiencia.vacunadoCorrectos += xFila.vacunadoCorrectos;
      sumarControldeEficiencia.porcentajeEficiencia += xFila.porcentajeEficiencia;
      sumarControldeEficiencia.puntajeEficiencia += xFila.puntajeEficiencia;
    });

    let countLineasControlEficiencia: number = 0;
    countLineasControlEficiencia = this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.length;

    promedioControldeEficiencia.idVacunacionSubCutaneaDetalle = 0;
    promedioControldeEficiencia.idVacunacionSubCutanea = 0;
    promedioControldeEficiencia.nombreVacunador = 'Promedio';
    promedioControldeEficiencia.vacunadoPorHora = sumarControldeEficiencia.vacunadoPorHora / countLineasControlEficiencia;
    promedioControldeEficiencia.puntajeProductividad = sumarControldeEficiencia.puntajeProductividad / countLineasControlEficiencia;
    promedioControldeEficiencia.controlados = sumarControldeEficiencia.controlados / countLineasControlEficiencia;
    promedioControldeEficiencia.sinVacunar = sumarControldeEficiencia.sinVacunar / countLineasControlEficiencia;
    promedioControldeEficiencia.heridos = sumarControldeEficiencia.heridos / countLineasControlEficiencia;
    promedioControldeEficiencia.mojados = sumarControldeEficiencia.mojados / countLineasControlEficiencia;
    promedioControldeEficiencia.malaPosicion = sumarControldeEficiencia.malaPosicion / countLineasControlEficiencia;
    promedioControldeEficiencia.vacunadoCorrectos = sumarControldeEficiencia.vacunadoCorrectos / countLineasControlEficiencia;
    promedioControldeEficiencia.porcentajeEficiencia = sumarControldeEficiencia.porcentajeEficiencia / countLineasControlEficiencia;
    promedioControldeEficiencia.puntajeEficiencia = sumarControldeEficiencia.puntajeEficiencia / countLineasControlEficiencia;
    
    let valorInicio = 0;
    let valorFin = 0;

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.map(xFila => {
      //cambio
      if(isNaN(promedioControldeEficiencia.porcentajeEficiencia)) promedioControldeEficiencia.porcentajeEficiencia = 0;
      //•	-10% del promedio de Vacunados hora 1punto
      debugger;
      valorInicio = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.1);
      // valorFin = promedioControldeEficiencia.vacunadoPorHora + (promedioControldeEficiencia.vacunadoPorHora * 0.5);
      // valorFin = promedioControldeEficiencia.vacunadoPorHora + (promedioControldeEficiencia.vacunadoPorHora * 0.5);

      // if (xFila.vacunadoPorHora >= valorInicio && xFila.vacunadoPorHora <= valorFin) {
      //   xFila.puntajeProductividad = 1;
      // }

      if (xFila.vacunadoPorHora >= valorInicio) {
        xFila.puntajeProductividad = 1;
      }
      //•	Entre -10 a -20% del promedio 0.5 puntos
      valorInicio = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.2);
      valorFin = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.1);

      if (xFila.vacunadoPorHora >= valorInicio && xFila.vacunadoPorHora <= valorFin) {
        xFila.puntajeProductividad = 0.5;
      }
      //•	21% a más por debajo de la media 0 puntos
      // valorInicio = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0);
      valorInicio = 0;
      valorFin = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.20);

      if (xFila.vacunadoPorHora < valorFin) {
        xFila.puntajeProductividad = 0;
      }

    });

    sumarControldeEficiencia.puntajeProductividad = 0;

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.forEach(xFila => {
      sumarControldeEficiencia.puntajeProductividad += xFila.puntajeProductividad;
    });

    promedioControldeEficiencia.puntajeProductividad = 0;

    this.listControlEficienciaPromedio.push(sumarControldeEficiencia);
    promedioControldeEficiencia.puntajeProductividad = sumarControldeEficiencia.puntajeProductividad / countLineasControlEficiencia;
    this.listControlEficienciaPromedio.push(promedioControldeEficiencia);

    promedioControldeEficiencia.puntajeEficiencia = 0;

    this.listIndiceEficiencia.forEach(xFilaEficiencia => {
      if (promedioControldeEficiencia.porcentajeEficiencia >= xFilaEficiencia.rangoInicial && promedioControldeEficiencia.porcentajeEficiencia <= xFilaEficiencia.rangoFinal) {
        promedioControldeEficiencia.puntajeEficiencia = sumarControldeEficiencia.puntajeEficiencia / countLineasControlEficiencia;
      }
    });

    this.listControlEficienciaPromedio.forEach(xFila => {
      this.modeloItem.listarTxVacunacionSubCutaneaPromedio.push({
        idVacunacionSubCutaneaDetalle: 0,
        idVacunacionSubCutanea: 0,
        nombreVacunador: xFila.nombreVacunador,
        vacunadoPorHora: this.onConvertDecimales(xFila.vacunadoPorHora,1),
        puntajeProductividad: this.onConvertDecimales(xFila.puntajeProductividad,1),
        controlados: this.onConvertDecimales(xFila.controlados,1),
        sinVacunar: this.onConvertDecimales(xFila.sinVacunar,1),
        heridos: this.onConvertDecimales(xFila.heridos,1),
        mojados: this.onConvertDecimales(xFila.mojados,1),
        malaPosicion: this.onConvertDecimales(xFila.malaPosicion,1),
        vacunadoCorrectos: this.onConvertDecimales(xFila.vacunadoCorrectos,1),
        porcentajeEficiencia:this.onConvertDecimales( xFila.porcentajeEficiencia,1),
        puntajeEficiencia: this.onConvertDecimales(xFila.puntajeEficiencia,1)
      });
    });

    this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador === 4).valorObtenido = this.onConvertDecimales(promedioControldeEficiencia.puntajeEficiencia,1);
    this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador === 5).valorObtenido = this.onConvertDecimales(promedioControldeEficiencia.puntajeProductividad,1);

  }

  onConvertDecimales(valor: number, decimales: number) : number {
    let dato = Number(valor.toFixed(decimales));

    return dato;
  }

  onToRowSelectDeleteVacunaMaquina(data : TxVacunacionSubCutaneaMaquinaModel) {
    // clonar los equipo del la boquilla seleccionada
    let clonedListMaquina = [...this.modeloItem.listarTxVacunacionSubCutaneaMaquina]
    .filter(filter => filter.idAguja === data.idAguja )
    .filter(filter => filter.codigoEquipo !== data.codigoEquipo);

    let clonedListBoquillaNoseleccionado = [...this.modeloItem.listarTxVacunacionSubCutaneaMaquina]
    .filter(filter => filter.idAguja !== data.idAguja )

    this.modeloItem.listarTxVacunacionSubCutaneaMaquina = clonedListBoquillaNoseleccionado;

    clonedListMaquina.forEach (adds => {
      this.modeloItem.listarTxVacunacionSubCutaneaMaquina.push(adds);
    });
  }

  onToRowSelectDeleteVacuna(data: TxVacunacionSubCutaneayVacunaModel) {
    let clonedListVacuna = [...this.modeloItem.listarTxVacunacionSubCutaneaVacuna]
    .filter(filter => filter.nombreVacuna !== data.nombreVacuna );

    this.modeloItem.listarTxVacunacionSubCutaneaVacuna = clonedListVacuna;
  }

  onVisibleMaquina() {
    this.displaySeleccionProceso = !this.displaySeleccionProceso;
    this.selectSeleccionMaquina = null;
  }
  onDisplayIrregularidad() {
    this.displayIrregularidad =!this.displayIrregularidad;
    this.selectIrregularidad = this.listIrregularidad;
    this.nombreVacunador = '';
    this.selectNumeroAF = null;
  }
  
  onGrabarIrregularidad() {


    let vclonedIrregularidad = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad];

    // Validar si existe el vacunador
    let existeVacunador = vclonedIrregularidad.filter(xFila => xFila.nombreVacunador === this.nombreVacunador).length;

    if (existeVacunador > 0) {
      let existeVacunadorAF = vclonedIrregularidad.filter(xFila => xFila.nombreVacunador === this.nombreVacunador && xFila.codigoEquipo === this.selectNumeroAF.value).length;
      
      if (existeVacunadorAF === 0) {
        this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'No se puede adicionar el mismo Vacunador con dos AF diferentes');
        return;
      }
    }
    
    if (this.selectIrregularidad.length > 0 ) {

      this.selectIrregularidad.forEach(data => {
        
        vclonedIrregularidad.push(
          {
            idVacunacionSubCutaneaDetalle: 0,
            idVacunacionSubCutanea:0,
            nombreVacunador: this.nombreVacunador,
            codigoEquipo: this.selectNumeroAF.value,
            idIrregularidad: data.idIrregularidad,
            descripcionIrregularidad: data.descripcionIrregularidad,
            valor: data.valor,
            id:  `ID ${data.idIrregularidad} - ${this.nombreVacunador}` 
          });
      });

      this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad = [...vclonedIrregularidad];

      this.onGuardaVacunador();

    }

    this.selectIrregularidad = null;
    this.nombreVacunador = '';
    this.selectNumeroAF = null;
    this.displayIrregularidad = false;
  }

  onGuardaVacunador() {

    let encontroVacunador = [...this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.filter(xFila => xFila.nombreVacunador === this.nombreVacunador)].length;

    let vclonedVacunado = [...this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia];

    if (encontroVacunador === 0) {

      vclonedVacunado.push({
        idVacunacionSubCutaneaDetalle: 0,
        idVacunacionSubCutanea: 0,
        nombreVacunador: this.nombreVacunador,
        cantidadInicial: 0,
        cantidadFinal: 0,
        vacunadoPorHora: 0,
        puntajeProductividad: 0,
        controlados: 0,
        sinVacunar: 0,
        heridos: 0,
        mojados: 0,
        malaPosicion: 0,
        vacunadoCorrectos: 0,
        //Cambios
        porcentajeEficiencia: 0,
        puntajeEficiencia: 0
      });

      this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia = [...vclonedVacunado];

    }


  }

  onRowEditInit(data: TxVacunacionSubCutaneaControlEficienciaModel) {
    this.modeloclonedControlEficiencia[data.nombreVacunador] = {...data};
  }

  onRowEditSave(data: TxVacunacionSubCutaneaControlEficienciaModel) {

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.map(xFila => {
      xFila.vacunadoPorHora = xFila.cantidadFinal - xFila.cantidadInicial;
      xFila.vacunadoCorrectos = xFila.controlados - (xFila.sinVacunar + xFila.heridos + xFila.mojados + xFila.malaPosicion);
      xFila.porcentajeEficiencia = (xFila.vacunadoCorrectos / xFila.controlados) *100;

      //cambio
      if(isNaN(xFila.porcentajeEficiencia)) xFila.porcentajeEficiencia = 0;

      this.listIndiceEficiencia.forEach(xFilaEficiencia => {
        if (xFila.porcentajeEficiencia >= xFilaEficiencia.rangoInicial && xFila.porcentajeEficiencia <= xFilaEficiencia.rangoFinal) {
          xFila.puntajeEficiencia = xFilaEficiencia.puntaje;
        }
      });
    }); 

  }

  onRowEditCancel(data: TxVacunacionSubCutaneaControlEficienciaModel, i: number) {
    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia[i] = this.modeloclonedControlEficiencia[data.nombreVacunador];
    delete this.modeloclonedControlEficiencia[data.nombreVacunador];
  }

  onToRowSelectDeleteIrregularidad(index: number) {
    // let clonedNombreVacunadorSeleccionado = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(xFila => xFila.nombreVacunador === data.nombreVacunador);

    // let clonedNombreVacunadorSeleccionadoFinal = [...clonedNombreVacunadorSeleccionado].filter(xFila => xFila.idIrregularidad !== data.idIrregularidad);

    // let clonedDataIrregularidad = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(xFila => xFila.nombreVacunador !== data.nombreVacunador);

    // clonedNombreVacunadorSeleccionadoFinal.forEach(xData => {
    //   clonedDataIrregularidad.push(xData);
    // });

    // this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad = [...clonedDataIrregularidad];

    let irregularidad: TxVacunacionSubCutaneaIrregularidadModel = this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad[index];

    this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad.splice(+index, 1);

    // Validamos que no existe registro con el nombre del vacunador
    let clonedCountNombreVacunador = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(xFila => xFila.nombreVacunador === irregularidad.nombreVacunador).length;

    if (clonedCountNombreVacunador === 0) {
      let indexEficiencia = this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.findIndex(xFila => xFila.nombreVacunador === irregularidad.nombreVacunador);

      this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.splice(+indexEficiencia, 1);
    }
  }

  onToRowSelectDeleteControlIndiceEficiencia(index: number) {
    debugger

    var opcion = confirm("Seguro de eliminar?");//Linea agregada por LUIS
    if (opcion == true) {
      let nombreVacunador = this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia[index].nombreVacunador;
  
      //Eliminamos al vacunador
      this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.splice(+index, 1);
  
      let clonedCountNombreVacunador = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(xFila => xFila.nombreVacunador !== nombreVacunador);
  
      this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad = clonedCountNombreVacunador;
    }
  }
  
  onGrabarControlEficiencia() {
    if (!this.nombreVacunadorControlEficiencia) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Vacunador');
      return;
    }

    this.modeloControlEficiencia.nombreVacunador = this.nombreVacunadorControlEficiencia.value;

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.push(this.modeloControlEficiencia);

    this.nombreVacunadorControlEficiencia = null;
    this.modeloControlEficiencia = new TxVacunacionSubCutaneaControlEficienciaModel();
    this.displayControlEficiencia = false;
  }

  onGrabar() {
    if (!this.selectEmpresa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Empresa');
      return;
    }
    this.modeloItem.codigoEmpresa = this.selectEmpresa.value;
    this.modeloItem.descripcionEmpresa = this.selectEmpresa.label;
    if (!this.selectedPlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Planta');
      return;
    }
    this.modeloItem.codigoPlanta = this.selectedPlanta.value;
    this.modeloItem.descripcionPlanta = this.selectedPlanta.label;
    if (!this.modeloItem.firmaInvetsa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Firma Invetsa');
      return;
    }
    if (!this.modeloItem.firmaPlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Firma Planta');
      return;
    }
    if (!this.modeloItem.responsableIncubadora) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Responsable Incubación');
      return;
    }
    if (!this.modeloItem.responsableInvetsa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Responsable Invetsa');
      return;
    }
    if (!this.modeloItem.responsablePlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Responsable Planta');
      return;
    }
    if (!this.modeloItem.emailFrom) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Email Responsable Planta');
      return;
    }
    this.modeloItem.idVacunacionSubCutanea = 0;
    this.displaySave = true;
    this.modeloItem.fecCierre = null;
    this.modeloItem.fecRegistro = new Date();
    this.modeloItem.fecHoraRegistro =  new Date();
    this.modeloItem.flgCerrado = false;
    this.modeloItem.flgMigrado = false;
    if (this.modeloItem.flgPorcentajeViabilidad) {
      this.modeloItem.puntajePorcentajeViabilidad = 0.5;
    }

    this.onCalcularPuntaje();

    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.setInsertTxVacunacionSubcutanea(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.displaySave = false;
      this.onBack();
    },
      (error) => {
        this.displaySave = false;
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });

  }

  onBack() {
    this.router.navigate(['/main/module-su/panel-vacunacion-subcutanea-offline']);
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
}
