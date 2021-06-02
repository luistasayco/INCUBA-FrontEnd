import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { TxExamenFisicoPollitoModel } from '../../../models/tx-examen-fisico-pollito';
import { ExamenFisicoPollitoService } from '../../../services/examen-fisico-pollito.service';
import { ProcesoDetalleModel } from '../../../models/proceso-detalle.model';
import { ProcesoModel } from '../../../models/proceso.model';
import { TxExamenFisicoPollitoDetalleModel } from '../../../models/tx-examen-fisico-pollito-detalle';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { SelectItem } from 'primeng';

import { CalidadModel } from '../../../models/calidad.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { UserContextService } from '../../../../../services/user-context.service';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { PlantaPorUsuarioModel } from '../../../../modulo-seguridad/models/planta-por-usuario';
import { TxExamenFisicoPollitoDetalleModelNew } from '../../../models/tx-examen-fisico-pollito-detalle-new';

@Component({
  selector: 'app-tx-examen-fisico-pollito-create',
  templateUrl: './tx-examen-fisico-pollito-create.component.html',
  styleUrls: ['./tx-examen-fisico-pollito-create.component.css']
})
export class TxExamenFisicoPollitoCreateComponent implements OnInit, OnDestroy {

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

  displaySave: boolean;
  displayControles: boolean;
  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              private router: Router,
              private seguridadService: SeguridadService,
              private userContextService: UserContextService,
              private compartidoService: CompartidoService,
              private utilService: UtilService) {
                this.breadcrumbService.setItems([
                  { label: 'Módulo Examen Físico' },
                  { label: this.titulo, routerLink: ['module-ef/panel-tx-examen-fisico-pollito'] },
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
    this.subscription$ = this.examenFisicoPollitoService.getTxExamenFisicoPollitoPorIdNew()
    .subscribe((data: TxExamenFisicoPollitoModel) => {
      this.modeloItem = data;
      this.modeloItem.responsableInvetsa = this.userContextService.getNombreCompletoUsuario();
      this.modeloItem.emailFrom = this.userContextService.getEmail();
    });

    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService.getCalidad(this.modeloCalidad)
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

  getToObtieneSexo() {
    this.listItemSexo = [
      {label: 'Macho', value: 'M'},
      {label: 'Hembra', value: 'H'},
      {label: 'Mixto', value: 'X'}
    ];
  }

  onCalcular() {
    debugger;
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
    let clonedListPollito = [...this.modeloItem.listDetalleNew];
    let clonedListPollitoSinPeso = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0 && x.valor === 0);

    clonedListPollitoSinPeso.forEach(xFila => {
      clonedListPollito = [...clonedListPollito].filter(x => x.numeroPollitos !== xFila.numeroPollitos);
    });


    let cloneList = [...clonedListPollito].filter(x => x.factor !== 0);

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

    let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0 && x.valor > 0);

    cloneList.forEach(x => {
        pesoPromedio = pesoPromedio + x.valor;
    });

    let peso: number = 0;

    if (cloneList.length > 0) {
      peso = pesoPromedio / cloneList.length;
    }

    return parseInt(peso.toFixed(2));
  }

  onCalcularUniformidad(pesoPromedio: number): number {
    let pesoMas10Porciento = pesoPromedio * 1.10;
    let pesoMenos10Porciento = pesoPromedio - (pesoPromedio * 0.10);

    let countUniformidad = 0;

    let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0 && x.valor > 0);

    cloneList.forEach(x => {
      if (x.valor >= pesoMenos10Porciento && x.valor <= pesoMas10Porciento) {
        countUniformidad += 1;
      }
    });

    return parseInt(countUniformidad.toFixed(2));
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
  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
  onGrabar() {

    if (!this.selectEmpresa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Empresa');
      return;
    }
    this.modeloItem.codigoEmpresa = this.selectEmpresa.value;
    if (!this.selectedPlanta) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar - Planta');
      return;
    }
    this.modeloItem.codigoPlanta = this.selectedPlanta.value;
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

    if (this.modeloItem.emailTo === '') {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgExitoSummary, `Ingresar Email de Planta`);
      return;
    }

    let msgList = this.utilService.validaListEmail(this.modeloItem.emailTo);

    if (msgList !== '') {
      this.mensajePrimeNgService.onToInfoMsg('Revisar Email Invalidos..', msgList);
      return;
    }

    this.modeloItem.idExamenFisico = 0;

    this.modeloItem.listDetalleNew
    .map(x => {
      x.valor = Number(x.valor);
    });
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService.setInsertExamenFisicoPollito(this.modeloItem)
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
    this.router.navigate(['/main/module-ef/panel-tx-examen-fisico-pollito']);
  }
}
