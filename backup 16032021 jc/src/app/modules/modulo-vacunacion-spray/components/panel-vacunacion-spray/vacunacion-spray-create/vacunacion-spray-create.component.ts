import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxVacunacionSprayModel } from '../../../models/tx-vacunacion-spray.model';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { ProcesoSprayModel } from '../../../models/proceso-spray.model';
import { ProcesoDetalleSprayModel } from '../../../models/proceso-detalle-spray.model';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { VacunacionSprayService } from '../../../services/vacunacion-spray.service';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { VacunaModel } from '../../../models/vacuna.model';
import { TxVacunacionSprayVacunaModel } from '../../../models/tx-vacunacion-spray-vacuna.model';
import { RegistroEquipoService } from '../../../../modulo-registro-equipo/services/registro-equipo.service';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { BoquillaModel } from '../../../models/boquilla.model';
import { EquipoPorModeloModel } from '../../../../modulo-registro-equipo/models/equipo-por-modelo.model';
import { TxVacunacionSprayMaquinaModel } from '../../../models/tx-vacunacion-spray-maquina.model';
import { TxVacunacionSprayDetalleModel } from '../../../models/tx-vacunacion-spray-detalle.model';
import { map } from 'rxjs/operators';
import { PlantaPorUsuarioModel } from '../../../../modulo-seguridad/models/planta-por-usuario';

@Component({
  selector: 'app-vacunacion-spray-create',
  templateUrl: './vacunacion-spray-create.component.html',
  styleUrls: ['./vacunacion-spray-create.component.css']
})
export class VacunacionSprayCreateComponent implements OnInit, OnDestroy{
  titulo = 'Vacunación Spray';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemModelo: SelectItem[];
  listItemVacuna: SelectItem[];
  listItemBoquilla: SelectItem[];
  listItemEquipo: SelectItem[];

  modeloItem: TxVacunacionSprayModel = new TxVacunacionSprayModel();
  modeloEmpresa: EmpresaModel = new EmpresaModel();

  listProceso: ProcesoSprayModel[];
  listProcesoDetalle: ProcesoDetalleSprayModel[];

  columnasMaquina: any[];
  columnasVacuna: any[];
  columnasSeleccionarMaquina: any[];
  columnasResultado: any[];


  selectEmpresa: any;
  selectedPlanta: any;
  selectSexo: any;
  selectVacuna: any;
  selectModelo: any;
  selectBoquilla: any;
  selectEquipo: any[];
  selectSeleccionMaquina: ProcesoSprayModel[];

  subscription$: Subscription;

  displaySave: boolean;

  rowGroupMetadata: any;

  displayVacuna: boolean;
  displayMaquina: boolean;

  nombreVacuna: string;

  clonedVacuna: { [s: string]: TxVacunacionSprayVacunaModel; } = {};
  clonedProcesoDetalle: TxVacunacionSprayDetalleModel[] = [];

  displaySeleccionProceso: boolean;
  displayControles: boolean;
  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private vacunacionSprayService: VacunacionSprayService,
              private router: Router,
              private seguridadService: SeguridadService,
              private userContextService: UserContextService,
              private compartidoService: CompartidoService,
              private registroEquipoService: RegistroEquipoService,
              private utilService: UtilService) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Spray' },
        { label: this.titulo, routerLink: ['module-sp/panel-vacunacion-spray'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.selectSeleccionMaquina = [];
    this.selectVacuna = null;

    this.selectEmpresa = null;
    this.selectedPlanta = null;
    this.selectModelo = null;
    this.selectEquipo = [];

    this.nombreVacuna = '';
    this.columnasMaquina = [
      { header: 'Máquina' },
      { header: 'N° máquinas' },
      { header: 'Modelo/Marca' },
      { header: 'Codigo AF' }
    ];
    this.columnasVacuna = [
      { header: 'Vacuna' },
      { header: 'Nombre Vacuna' }
    ];

    this.columnasSeleccionarMaquina = [
      {header: 'Codigo', field: 'idProcesoSpray'},{header: 'Descripción', field: 'descripcionProcesoSpray'}
    ]

    this.columnasResultado = [
      { header: 'Descripción' },
      { header: 'Valor Esperado' },
      { header: 'Valor Obtenido' }
    ];

    this.getToObtieneEmpresa();
    this.getToObtieneVacuna();
    this.getToObtieneModelo();
    this.getToObtieneBoquilla();
    this.getToObtieneProceso();

    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.getTxVacunacionSprayPorIdNew()
    .subscribe((data: TxVacunacionSprayModel) => {
      
      this.modeloItem = data;
      this.modeloItem.responsableInvetsa = this.userContextService.getNombreCompletoUsuario();
      this.modeloItem.emailFrom = this.userContextService.getEmail();
      this.modeloItem.listarTxVacunacionSprayVacuna = [];
      this.modeloItem.listarTxVacunacionSprayMaquina = [];
      this.clonedProcesoDetalle = [...this.modeloItem.listarTxVacunacionSprayDetalle];
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

  getToObtieneBoquilla() {
    let modeloBoquilla: BoquillaModel = new BoquillaModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.getBoquilla(modeloBoquilla)
    .subscribe((data: BoquillaModel[]) => {
      this.listItemBoquilla = [];
      for (let item of data) {
        this.listItemBoquilla.push({ label: item.descripcionBoquilla, value: item.idBoquilla });
      }
    });
  }

  getToObtieneProceso() {
    let modeloProcesoSpray: ProcesoSprayModel = new ProcesoSprayModel();
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.getProcesoSpray(modeloProcesoSpray)
    .subscribe((data: ProcesoSprayModel[]) => {
      this.listProceso = [];
      this.listProceso = [...data].filter(x => x.valor > 0);
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
    if (this.modeloItem.listarTxVacunacionSprayDetalle) {
      for (let i = 0; i < this.modeloItem.listarTxVacunacionSprayDetalle.length; i++) {
        let rowData = this.modeloItem.listarTxVacunacionSprayDetalle[i];
        let brand = rowData.descripcionProcesoSpray;
        if (i === 0) {
            this.rowGroupMetadata[brand] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.modeloItem.listarTxVacunacionSprayDetalle[i - 1];
          let previousRowGroup = previousRowData.descripcionProcesoSpray;
          if ( brand === previousRowGroup )
            this.rowGroupMetadata[brand].size++;
          else
            this.rowGroupMetadata[brand] = { index: i, size: 1 };
        }
      }
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listarTxVacunacionSprayFotos = [];
    event.forEach(x => {
      this.modeloItem.listarTxVacunacionSprayFotos.push({
        idVacunacionSprayDetalle: 0,
        idVacunacionSpray: 0,
        foto: x.imagen
      });
    });
  }

  onGrabarMaquina() {
    if (this.selectEquipo.length > 0 ) {
      this.selectEquipo.forEach(data => {
        this.modeloItem.listarTxVacunacionSprayMaquina.push(
          {
            idVacunacionSprayMaquina: 0,
            idVacunacionSpray:0,
            idBoquilla: this.selectBoquilla.value,
            descripcionBoquilla: this.selectBoquilla.label,
            nroMaquinas: this.selectEquipo.length,
            codigoModelo: this.selectModelo.value,
            descripcionModelo: this.selectModelo.label,
            codigoEquipo: data
          });
      });
    }
    this.selectModelo = null;
    this.selectBoquilla = null;
    this.selectEquipo = null;
    this.displayMaquina = false;
  }

  onGrabarVacuna() {
    if (this.selectVacuna !== null) {
      this.modeloItem.listarTxVacunacionSprayVacuna.push(
        {
          idVacunacionSprayVacuna: 0,
          idVacunacionSpray:0,
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
    let clonedDataResultado = [...this.modeloItem.listarTxVacunacionSprayResultado];
    let clonedListProcesoOriginal = [...this.listProceso];
    clonedDataResultado.map(x => x.nroProcesoAcumulado = 0);
    if (this.selectSeleccionMaquina.length === 0) {
      let cloneDataDetalle2 = [...cloneDataDetalleOriginal];
      this.listProceso.forEach(x => {
        cloneDataDetalle2 = [...cloneDataDetalle2].filter(y => y.idProcesoSpray !== x.idProcesoSpray)
      });
      this.modeloItem.listarTxVacunacionSprayDetalle = [...cloneDataDetalle2];
      this.modeloItem.listarTxVacunacionSprayResultado = clonedDataResultado;
      this.updateRowGroupMetaData();
    } else {
      this.selectSeleccionMaquina.forEach(x => {
        clonedListProcesoOriginal = [...clonedListProcesoOriginal].filter(xx => xx.idProcesoSpray !== x.idProcesoSpray);
        clonedDataResultado.find(xFilaResultado => xFilaResultado.idProcesoAgrupador === x.idProcesoAgrupador).nroProcesoAcumulado += 1
      });
      this.modeloItem.listarTxVacunacionSprayResultado = clonedDataResultado;
      let cloneDataDetalleSeleccionado = [...cloneDataDetalleOriginal];

      clonedListProcesoOriginal.forEach(x => {
        cloneDataDetalleSeleccionado = [...cloneDataDetalleSeleccionado].filter(y => y.idProcesoSpray !== x.idProcesoSpray)
      });

      this.modeloItem.listarTxVacunacionSprayDetalle = [...cloneDataDetalleSeleccionado];
      this.updateRowGroupMetaData();
    }
    
    this.displaySeleccionProceso = false;
  }

  onCalcularPuntaje() {
    let clonedDetalleCalcular = [...this.modeloItem.listarTxVacunacionSprayDetalle];
    let clonedResultadoCalcular = [...this.modeloItem.listarTxVacunacionSprayResultado];
    let valorAsumar = 0.00;

    clonedResultadoCalcular.map(z => z.valorObtenido = 0);

    clonedDetalleCalcular.forEach( xfila => {
      valorAsumar = xfila.valorProcesoDetalleSpray;
      if (xfila.valorProcesoSpray > 0) {
        if (xfila.valor) {
          clonedResultadoCalcular.find(xitem => xitem.idProcesoAgrupador === xfila.idProcesoAgrupador).valorObtenido += valorAsumar;
        }
      }
    });
    this.modeloItem.listarTxVacunacionSprayResultado = [...clonedResultadoCalcular];

    let clonedResultadoFilanCalcular = [...this.modeloItem.listarTxVacunacionSprayResultado];
    clonedResultadoFilanCalcular.forEach(xFila => {
      if (xFila.nroProcesoAcumulado > 0 ) {
        clonedResultadoFilanCalcular.find(xitem => xitem.idProcesoAgrupador === xFila.idProcesoAgrupador).valorObtenido = xFila.valorObtenido/ xFila.nroProcesoAcumulado;
      } else {
        clonedResultadoFilanCalcular.find(xitem => xitem.idProcesoAgrupador === xFila.idProcesoAgrupador).valorObtenido = 0;
      }
    });

    this.modeloItem.listarTxVacunacionSprayResultado = [...clonedResultadoFilanCalcular];
  }

  onToRowSelectDeleteVacunaMaquina(data : TxVacunacionSprayMaquinaModel) {
    // clonar los equipo del la boquilla seleccionada
    let clonedListMaquina = [...this.modeloItem.listarTxVacunacionSprayMaquina]
    .filter(filter => filter.idBoquilla === data.idBoquilla )
    .filter(filter => filter.codigoEquipo !== data.codigoEquipo);

    let clonedListBoquillaNoseleccionado = [...this.modeloItem.listarTxVacunacionSprayMaquina]
    .filter(filter => filter.idBoquilla !== data.idBoquilla )

    this.modeloItem.listarTxVacunacionSprayMaquina = clonedListBoquillaNoseleccionado;

    clonedListMaquina.forEach (adds => {
      this.modeloItem.listarTxVacunacionSprayMaquina.push(adds);
    });
  }

  onToRowSelectDeleteVacuna(data: TxVacunacionSprayVacunaModel) {
    let clonedListVacuna = [...this.modeloItem.listarTxVacunacionSprayVacuna]
    .filter(filter => filter.nombreVacuna !== data.nombreVacuna );

    this.modeloItem.listarTxVacunacionSprayVacuna = clonedListVacuna;
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
    console.log('this.modeloItem', this.modeloItem);
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.setInsertTxVacunacionSpray(this.modeloItem)
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
    this.router.navigate(['/main/module-sp/panel-vacunacion-spray']);
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
}
