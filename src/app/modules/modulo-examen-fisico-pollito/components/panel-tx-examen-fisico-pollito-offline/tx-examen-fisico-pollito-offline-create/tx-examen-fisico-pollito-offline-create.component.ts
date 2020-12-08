import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxExamenFisicoPollitoModel } from '../../../models/tx-examen-fisico-pollito';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { CalidadModel } from '../../../models/calidad.model';
import { ProcesoModel } from '../../../models/proceso.model';
import { ProcesoDetalleModel } from '../../../models/proceso-detalle.model';
import { TxExamenFisicoPollitoDetalleModel } from '../../../models/tx-examen-fisico-pollito-detalle';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { ExamenFisicoPollitoLocalService } from '../../../services/examen-fisico-pollito-local.service';
import { CompartidoLocalService } from 'src/app/modules/modulo-compartido/services/compartido-local.service';
import { Router } from '@angular/router';
import { TxExamenFisicoPollitoDetalleModelNew } from '../../../models/tx-examen-fisico-pollito-detalle-new';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';

@Component({
  selector: 'app-tx-examen-fisico-pollito-offline-create',
  templateUrl: './tx-examen-fisico-pollito-offline-create.component.html',
  styleUrls: ['./tx-examen-fisico-pollito-offline-create.component.css']
})
export class TxExamenFisicoPollitoOfflineCreateComponent implements OnInit, OnDestroy {

  titulo = 'Examen Físico';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemSexo: SelectItem[];

  modeloItem: TxExamenFisicoPollitoModel = new TxExamenFisicoPollitoModel();
  modeloEmpresa: EmpresaModel = new EmpresaModel();
  modeloCalidad: CalidadModel = new CalidadModel();

  listProceso: ProcesoModel[];
  listProcesoDetalle: ProcesoDetalleModel[];
  listTxExamenFisicoPollitoDetalle: TxExamenFisicoPollitoDetalleModel[];
  listTxExamenFisicoPollitoDetalleGenerado: TxExamenFisicoPollitoDetalleModel[];
  listCalidad: CalidadModel [];

  columnas: any[];

  selectEmpresa: any;
  selectedPlanta: any;
  selectSexo: any;

  subscription$: Subscription;

  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private examenFisicoPollitoLocalService: ExamenFisicoPollitoLocalService,
              private compartidoLocalService: CompartidoLocalService,
              private router: Router,
              private utilService: UtilService,
              private userContextService: UserContextService) {
                this.breadcrumbService.setItems([
                  { label: 'Módulo Examen Físico' },
                  { label: 'Examen Físico (Offline)', routerLink: ['module-ef/panel-tx-examen-fisico-pollito-offline'] },
                  { label: 'Nuevo'}
              ]);
  }

  ngOnInit(): void {
    this.listCalidad = [];
    this.columnas = [
      { header: 'Nro' },
      { header: 'Proceso' },
      { header: 'Factor' }
    ];
    this.getToObtieneEmpresa();
    this.getToObtieneSexo();

    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoLocalService.getExamenFisicoPollitoDetalleNew()
    .subscribe((data: TxExamenFisicoPollitoDetalleModelNew[]) => {
      this.modeloItem.listDetalleNew = data;
      this.modeloItem.responsableInvetsa = this.userContextService.getNombreCompletoUsuario();
      this.modeloItem.emailFrom = this.userContextService.getEmail();
    });

    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoLocalService.getCalidad()
    .subscribe((data: CalidadModel[]) => {
      this.listCalidad = data;
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

  getToObtieneSexo() {
    this.listItemSexo = [
      {label: 'Macho', value: 'M'},
      {label: 'Hembra', value: 'H'},
      {label: 'Mixto', value: 'X'}
    ];
  }

  
  onCalcular() {
    this.modeloItem.calificacion = this.onCalcularCalificacion();
    let uniformidad = this.onCalcularPesoPromedio();
    this.modeloItem.pesoPromedio = uniformidad
    this.modeloItem.uniformidad = this.onCalcularUniformidad(uniformidad);
    // Obtenemos calidad
    let calificacion = Math.round(this.modeloItem.calificacion);
    let calidad = [...this.listCalidad].find(x => calificacion >= x.rangoInicial && calificacion <= x.rangoFinal);
    this.modeloItem.descripcionCalidad = calidad.descripcion;
    this.modeloItem.idCalidad = calidad.idCalidad;
  }

  onCalcularCalificacion(): number {
    this.modeloItem.listDetalleResumen = [];
    let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor !== 0);
    cloneList.forEach(x => {
      let existeRegistro = [...this.modeloItem.listDetalleResumen].find(existe => existe.idProceso === x.idProceso);

      let factor = 0;
      if (Number(x.valor) === x.valorDefault) {
        factor = x.factor;
      }

      if (existeRegistro) {
        this.modeloItem.listDetalleResumen.find(existeRegistro => existeRegistro.idProceso === x.idProceso).obtenido += factor;
        this.modeloItem.listDetalleResumen.find(existeRegistro => existeRegistro.idProceso === x.idProceso).esperado += x.factor;
      }  else {
        this.modeloItem.listDetalleResumen.push({
          idExamenFisicoDetalle: 0,
          idExamenFisico: 0,
          idProceso: x.idProceso,
          obtenido: factor,
          esperado: x.factor
        });
      }
    });
    
    let sumaTotal = 0;
    let sumaTotalFinal = 0;
    this.modeloItem.listDetalleResumen.forEach(final => {
      sumaTotal += final.obtenido;
    });
    sumaTotalFinal = sumaTotal / 10;
    return parseInt(sumaTotalFinal.toFixed(2));
  }

  onCalcularPesoPromedio(): number {
    let pesoPromedio = 0;

    let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0);

    cloneList.forEach(x => {
        pesoPromedio = pesoPromedio + x.valor;
    });
    let peso = pesoPromedio / 100;
    return parseInt(peso.toFixed(2));
  }

  onCalcularUniformidad(pesoPromedio: number): number {
    let pesoMas10Porciento = pesoPromedio * 1.10;
    let pesoMenos10Porciento = pesoPromedio - (pesoPromedio * 0.10);

    let countUniformidad = 0;

    let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0);

    cloneList.forEach(x => {
      if (x.valor >= pesoMenos10Porciento && x.valor <= pesoMas10Porciento) {
        countUniformidad += 1;
      }
    });
    return countUniformidad;
  }

  listUpdate(event: any[]) {
    this.modeloItem.listDetalleFotos = [];
    event.forEach(x => {
      this.modeloItem.listDetalleFotos.push({
        idExamenFisicoDetalle: 0,
        idExamenFisico: 0,
        foto: x.imagen
      });
    });
  }

  onGrabar() {

    if (!this.selectEmpresa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Empresa');
      return;
    }
    this.modeloItem.codigoEmpresa = this.selectEmpresa.value;
    this.modeloItem.descripcionEmpresa = this.selectEmpresa.label;
    if (!this.selectedPlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Unidad - Planta');
      return;
    }
    this.modeloItem.codigoPlanta = this.selectedPlanta.value;
    this.modeloItem.descripcionPlanta = this.selectedPlanta.label;
    if (!this.selectSexo) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Sexo');
      return;
    }
    this.modeloItem.sexo = this.selectSexo.value;
    if (!this.modeloItem.lote) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Lote');
      return;
    }
    if (!this.modeloItem.edadReproductora) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Edad reproductora');
      return;
    }
    if (!this.modeloItem.lineaGenetica) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Linea Genetica');
      return;
    }
    if (!this.modeloItem.descripcionCalidad) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'No ha realizado el proceso de calculo...!!!');
      return;
    }
    if (!this.modeloItem.firmaInvetsa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Firma Invetsa');
      return;
    }
    if (!this.modeloItem.firmaPlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Firma Planta');
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
    this.modeloItem.idExamenFisico = 0;
    this.modeloItem.fecHoraRegistro = new Date();
    this.modeloItem.fecRegistro = this.utilService.fechaApi_POST();
    this.modeloItem.flgCerrado = false;
    this.modeloItem.flgMigrado = false;
    this.modeloItem.flgEnModificacion = false;
    this.modeloItem.listDetalleNew
    .map(x => {
      x.valor = Number(x.valor);
    });
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoLocalService.setInsertTxExamenFisicoPollito(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.onBack();
    },
      (error) => {
        console.log(error);
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onBack() {
    this.router.navigate(['/main/module-ef/panel-tx-examen-fisico-pollito-offline']);
  }

}
