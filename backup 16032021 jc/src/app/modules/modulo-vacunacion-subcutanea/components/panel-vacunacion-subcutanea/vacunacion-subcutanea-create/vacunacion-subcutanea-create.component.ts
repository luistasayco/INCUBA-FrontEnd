import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { ProcesoSubCutaneaModel } from '../../../models/proceso-subcutanea.model';
import { ProcesoDetalleSubCutaneaModel } from '../../../models/proceso-detalle-subcutanea';
import { Subscription } from 'rxjs';
import { TxVacunacionSubCutaneayVacunaModel } from '../../../models/tx-vacunacion-subcutanea-vacuna.model';
import { TxVacunacionSubCutaneaDetalleModel } from '../../../models/tx-vacunacion-subcutanea-detalle.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../../../modulo-registro-equipo/services/registro-equipo.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { TxVacunacionSubCutaneaModel } from '../../../models/tx-vacunacion-subcutanea.model';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { VacunaModel } from '../../../../modulo-vacunacion-spray/models/vacuna.model';
import { VacunacionSprayService } from '../../../../modulo-vacunacion-spray/services/vacunacion-spray.service';
import { AgujaModel } from '../../../models/aguja.model';
import { EquipoPorModeloModel } from '../../../../modulo-registro-equipo/models/equipo-por-modelo.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { TxVacunacionSubCutaneaMaquinaModel } from '../../../models/tx-vacunacion-subcutanea-maquina.model';
import { IrregularidadModel } from '../../../models/irregularidad.model';
import { TxVacunacionSubCutaneaIrregularidadModel } from '../../../models/tx-vacunacion-subcutanea-irregularidad.model';
import { TxVacunacionSubCutaneaControlEficienciaModel } from '../../../models/tx-vacunacion-subcutanea-control-eficiencia.model';
import { IndiceEficienciaModel } from '../../../models/indice-eficiencia.model';
import { TxVacunacionSubCutaneaResultadoModel } from '../../../models/tx-vacunacion-subcutanea-resultado.model';
import { PlantaPorUsuarioModel } from '../../../../modulo-seguridad/models/planta-por-usuario';

@Component({
  selector: 'app-vacunacion-subcutanea-create',
  templateUrl: './vacunacion-subcutanea-create.component.html',
  styleUrls: ['./vacunacion-subcutanea-create.component.css']
})
export class VacunacionSubcutaneaCreateComponent implements OnInit, OnDestroy {
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
              private vacunacionSubcutaneaService: VacunacionSubcutaneaService,
              private vacunacionSprayService: VacunacionSprayService,
              private router: Router,
              private seguridadService: SeguridadService,
              private userContextService: UserContextService,
              private compartidoService: CompartidoService,
              private registroEquipoService: RegistroEquipoService,
              private utilService: UtilService) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Subcutánea' },
        { label: this.titulo, routerLink: ['module-su/panel-vacunacion-subcutanea'] },
        { label: 'Nuevo'}
    ]);
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
      { header: 'Irregularidad'},
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
    this.subscription$ = this.vacunacionSubcutaneaService.getTxVacunacionSubCutaneaPorIdNew()
    .subscribe((data: TxVacunacionSubCutaneaModel) => {
      
      this.modeloItem = data;
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
    this.subscription$ = this.seguridadService.getEmpresaConAccesoPorUsuario()
    .subscribe((data: EmpresaPorUsuarioModel[]) => {
      this.listItemEmpresa = [];
      for (let item of data) {
        this.listItemEmpresa.push({ label: item.descripcionEmpresa, value: item.codigoEmpresa });
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
    this.subscription$ = this.seguridadService.getPlantaConAccesoPorUsuarioPorEmpresa(value)
    .subscribe((data: PlantaPorUsuarioModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcionPlanta, value: item.codigoPlanta });
      }
    });
  }

  getToObtieneVacuna() {
    let modeloVacuna: VacunaModel = {descripcionVacuna: ''}
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.getVacuna(modeloVacuna)
    .subscribe((data: VacunaModel[]) => {
      this.listItemVacuna = [];
      for (let item of data) {
        this.listItemVacuna.push({ label: item.descripcionVacuna, value: item.idVacuna });
      }
      });
  }

  getToObtieneAguja() {
    let modeloAguja: AgujaModel = new AgujaModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.getAguja(modeloAguja)
    .subscribe((data: AgujaModel[]) => {
      this.listItemAguja = [];
      for (let item of data) {
        this.listItemAguja.push({ label: item.descripcionAguja, value: item.idAguja });
      }
    });
  }

  getToObtieneIndiceEficiencia() {
    let modeloIndiceEficiencia: IndiceEficienciaModel = new IndiceEficienciaModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.getIndiceEficiencia(modeloIndiceEficiencia)
    .subscribe((data: IndiceEficienciaModel[]) => {
      this.listIndiceEficiencia = [];
      this.listIndiceEficiencia = data;
    });
  }

  getToObtieneProceso() {
    let modeloProcesoSubCutanea: ProcesoSubCutaneaModel = new ProcesoSubCutaneaModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.getProcesoSubCutanea(modeloProcesoSubCutanea)
    .subscribe((data: ProcesoSubCutaneaModel[]) => {
      this.listProceso = [];
      this.listProceso = [...data].filter(x => x.valor > 0);
    });
  }

  getToObtieneIrregularidad() {
    let modeloIrregularidad: IrregularidadModel = new IrregularidadModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.getIrregularidad(modeloIrregularidad)
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
    this.subscription$ = this.registroEquipoService.getEquipoPorFiltros(modeloEquipoPorModelo)
    .subscribe((data: EquipoPorModeloModel[]) => {
      this.listItemEquipo = [];
      for (let item of data) {
        this.listItemEquipo.push({ label: item.codigoEquipo, value: item.codigoEquipo });
      }
    });
  }

  getToObtieneModelo() {
    let modeloModelo: ModeloModel = new ModeloModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.getModelo(modeloModelo)
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

    console.log('clonedDataResultado', clonedDataResultado);
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
        clonedResultadoFilanCalcular.find(xitem => xitem.idProcesoAgrupador === xFila.idProcesoAgrupador).valorObtenido = xFila.valorObtenido/ xFila.nroProcesoAcumulado;
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
      let puntejaPorVacunador = 1;
      dataIrregularidad.forEach(zFila => {
        puntejaPorVacunador -= zFila.valor
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

    
    let countLineasControlEficiencia = this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.length;

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
      //•	+50% y -10% del promedio de Vacunados hora 1punto
      valorInicio = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.1)
      valorFin = promedioControldeEficiencia.vacunadoPorHora + (promedioControldeEficiencia.vacunadoPorHora * 0.5)

      if (xFila.vacunadoPorHora >= valorInicio && xFila.vacunadoPorHora <= valorFin) {
        xFila.puntajeProductividad = 1;
      }
      //•	Entre -10 a -20% del promedio 0.5 puntos
      valorInicio = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.2)
      valorFin = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.1)

      if (xFila.vacunadoPorHora >= valorInicio && xFila.vacunadoPorHora <= valorFin) {
        xFila.puntajeProductividad = 0.5;
      }
      //•	21% a más por debajo de la media 0 puntos
      valorInicio = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0)
      valorFin = promedioControldeEficiencia.vacunadoPorHora - (promedioControldeEficiencia.vacunadoPorHora * 0.21)

      if (xFila.vacunadoPorHora >= valorInicio && xFila.vacunadoPorHora <= valorFin) {
        xFila.puntajeProductividad = 0;
      }

    });

    this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.forEach(xFila => {
      sumarControldeEficiencia.puntajeProductividad += xFila.puntajeProductividad;
    });

    this.listControlEficienciaPromedio.push(sumarControldeEficiencia);
    promedioControldeEficiencia.puntajeProductividad = sumarControldeEficiencia.puntajeProductividad / countLineasControlEficiencia;
    this.listControlEficienciaPromedio.push(promedioControldeEficiencia);

    this.listIndiceEficiencia.forEach(xFilaEficiencia => {
      if (promedioControldeEficiencia.porcentajeEficiencia >= xFilaEficiencia.rangoInicial && promedioControldeEficiencia.porcentajeEficiencia <= xFilaEficiencia.rangoFinal) {
        promedioControldeEficiencia.puntajeEficiencia = xFilaEficiencia.puntaje;
      }
    });

    this.listControlEficienciaPromedio.forEach(xFila => {
      this.modeloItem.listarTxVacunacionSubCutaneaPromedio.push({
        idVacunacionSubCutaneaDetalle: 0,
        idVacunacionSubCutanea: 0,
        nombreVacunador: xFila.nombreVacunador,
        vacunadoPorHora: xFila.vacunadoPorHora,
        puntajeProductividad: xFila.puntajeProductividad,
        controlados: xFila.controlados,
        sinVacunar: xFila.sinVacunar,
        heridos: xFila.heridos,
        mojados: xFila.mojados,
        malaPosicion: xFila.malaPosicion,
        vacunadoCorrectos: xFila.vacunadoCorrectos,
        porcentajeEficiencia: xFila.porcentajeEficiencia,
        puntajeEficiencia: xFila.puntajeEficiencia
      });
    });

    this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador === 4).valorObtenido = promedioControldeEficiencia.puntajeEficiencia;
    this.modeloItem.listarTxVacunacionSubCutaneaResultado.find(xFila => xFila.idProcesoAgrupador === 5).valorObtenido = promedioControldeEficiencia.puntajeProductividad;

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

  onGrabarIrregularidad() {
    if (this.selectIrregularidad.length > 0 ) {
      this.selectIrregularidad.forEach(data => {
        this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad.push(
          {
            idVacunacionSubCutaneaDetalle: 0,
            idVacunacionSubCutanea:0,
            nombreVacunador: this.nombreVacunador,
            codigoEquipo: this.selectNumeroAF.value,
            idIrregularidad: data.idIrregularidad,
            descripcionIrregularidad: data.descripcionIrregularidad,
            valor: data.valor
          });
      });

      this.onGuardaVacunador();

    }
    this.selectIrregularidad = null;
    this.nombreVacunador = '';
    this.selectNumeroAF = null;
    this.displayIrregularidad = false;
  }

  onGuardaVacunador() {

    let encontroVacunador = [...this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.filter(xFila => xFila.nombreVacunador === this.nombreVacunador)].length;

    if (encontroVacunador === 0) {

      this.modeloItem.listarTxVacunacionSubCutaneaControlEficiencia.push({
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
        vacunadoCorrectos: 0
      });
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

  onToRowSelectDeleteIrregularidad(data: TxVacunacionSubCutaneaIrregularidadModel) {
    let clonedNombreVacunadorSeleccionado = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(xFila => xFila.nombreVacunador === data.nombreVacunador);

    let clonedNombreVacunadorSeleccionadoFinal = [...clonedNombreVacunadorSeleccionado].filter(xFila => xFila.idIrregularidad !== data.idIrregularidad);

    let clonedDataIrregularidad = [...this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad].filter(xFila => xFila.nombreVacunador !== data.nombreVacunador);

    clonedNombreVacunadorSeleccionadoFinal.forEach(xData => {
      clonedDataIrregularidad.push(xData);
    });

    this.modeloItem.listarTxVacunacionSubCutaneaIrregularidad = [...clonedDataIrregularidad];
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
    this.displaySave = true;
    this.modeloItem.fecCierre = null;
    this.modeloItem.fecRegistro = null;
    this.modeloItem.fecHoraRegistro = null;
    this.modeloItem.flgCerrado = false;

    if (this.modeloItem.flgPorcentajeViabilidad) {
      this.modeloItem.puntajePorcentajeViabilidad = 0.5;
    }

    console.log('this.modeloItem', this.modeloItem);
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.setInsertTxVacunacionSubCutanea(this.modeloItem)
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
    this.router.navigate(['/main/module-su/panel-vacunacion-subcutanea']);
  }
  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
}