import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { IProceso } from '../../../interface/proceso.interface';
import { TxExamenFisicoPollitoModel } from '../../../models/tx-examen-fisico-pollito';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { CalidadModel } from '../../../models/calidad.model';
import { ProcesoModel } from '../../../models/proceso.model';
import { ProcesoDetalleModel } from '../../../models/proceso-detalle.model';
import { TxExamenFisicoPollitoDetalleModel } from '../../../models/tx-examen-fisico-pollito-detalle';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { ExamenFisicoPollitoService } from '../../../services/examen-fisico-pollito.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TxExamenFisicoPollitoDetalleFotosModel } from '../../../models/tx-examen-fisico-pollito-fotos';

@Component({
  selector: 'app-tx-examen-fisico-pollito-update',
  templateUrl: './tx-examen-fisico-pollito-update.component.html',
  styleUrls: ['./tx-examen-fisico-pollito-update.component.css']
})
export class TxExamenFisicoPollitoUpdateComponent implements OnInit, OnDestroy {

  titulo = 'Examen Fisico Nro:';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  // listItemEmpresa: SelectItem[];
  // listItemSexo: SelectItem[];
  // listProcesoCalculado: IProceso[];

  modeloItem: TxExamenFisicoPollitoModel = new TxExamenFisicoPollitoModel();
  // modeloEmpresa: EmpresaModel = new EmpresaModel();
  // modeloCalidad: CalidadModel = new CalidadModel();

  // listProceso: ProcesoModel[];
  // listProcesoDetalle: ProcesoDetalleModel[];
  listTxExamenFisicoPollitoDetalle: TxExamenFisicoPollitoDetalleModel[];
  listTxExamenFisicoPollitoDetalleGenerado: TxExamenFisicoPollitoDetalleModel[];
  // listCalidad: CalidadModel [];

  columnas: any[];

  // selectEmpresa: any;
  // selectSexo: any;

  subscription$: Subscription;

  idExamenFisico: number;

  // Lista de imagenes
  listIma: any[];
  cloneListImagen: TxExamenFisicoPollitoDetalleFotosModel[] = [];

  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              private compartidoService: CompartidoService,
              private router: Router,
              private readonly route: ActivatedRoute) {
                this.breadcrumbService.setItems([
                  { label: 'Modulo' },
                  { label: 'Examen Fisico del Pollito', routerLink: ['module-ef/panel-tx-examen-fisico-pollito'] },
                  { label: 'Actualizar Examen Fisico'}
              ]);
              }

  ngOnInit(): void {
    // this.listCalidad = [];

    // Obtenemos el Id para realizar la modificacion
    this.route.params.subscribe((params: Params) => {
      this.idExamenFisico = params.id;
      this.onExamenFisicoPorId();
    });

    this.columnas = [
      { header: 'Nro' },
      { header: 'Proceso' },
      { header: 'Factor' }
    ];
    // this.getToObtieneEmpresa();
    // this.getToObtieneSexo();

    // this.subscription$ = new Subscription();
    // this.subscription$ = this.examenFisicoPollitoService.getCalidad(this.modeloCalidad)
    // .subscribe((data: CalidadModel[]) => {
    //   this.listCalidad = data;
    // });
  }

  onExamenFisicoPorId() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService.getTxExamenFisicoPollitoPorId(this.idExamenFisico)
    .subscribe((data: TxExamenFisicoPollitoModel) => {
      this.modeloItem = data;
      this.cloneListImagen = [...this.modeloItem.listDetalleFotos];
      this.listImagen();
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
  listImagen() {
    this.listIma = [];
    if (this.modeloItem.listDetalleFotos.length > 0 ) {
      this.modeloItem.listDetalleFotos.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }
  // getToObtieneEmpresa() {
  //   this.subscription$ = new Subscription();
  //   this.subscription$ = this.compartidoService.getEmpresa(this.modeloEmpresa)
  //   .subscribe((data: EmpresaModel[]) => {
  //     this.listItemEmpresa = [];
  //     for (let item of data) {
  //       this.listItemEmpresa.push({ label: item.descripcion, value: item.codigoEmpresa });
  //     }
  //     });
  // }

  // getToObtieneSexo() {
  //   this.listItemSexo = [
  //     {label: 'Macho', value: 'M'},
  //     {label: 'Hembra', value: 'H'},
  //     {label: 'Mixto', value: 'X'}
  //   ];
  // }

  // onCalcular() {
  //   this.modeloItem.calificacion = this.onCalcularCalificacion();
  //   let uniformidad = this.onCalcularPesoPromedio();
  //   this.modeloItem.pesoPromedio = uniformidad
  //   this.modeloItem.uniformidad = this.onCalcularUniformidad(uniformidad);
  //   // Obtenemos calidad
  //   let calificacion = Math.round(this.modeloItem.calificacion);
  //   let calidad = [...this.listCalidad].find(x => calificacion >= x.rangoInicial && calificacion <= x.rangoFinal);
  //   this.modeloItem.descripcionCalidad = calidad.descripcion;
  //   this.modeloItem.idCalidad = calidad.idCalidad;
  // }

  // onCalcularCalificacion(): number {
  //   this.listProcesoCalculado = [];
  //   let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor !== 0);
  //   cloneList.forEach(x => {
  //     let existeRegistro = [...this.listProcesoCalculado].find(existe => existe.idProceso === x.idProceso);

  //     let factor = 0;
  //     if (Number(x.valor) === x.valorDefault) {
  //       factor = x.factor;
  //     }

  //     if (existeRegistro) {
  //       this.listProcesoCalculado.find(existeRegistro => existeRegistro.idProceso === x.idProceso).total += factor;
  //     }  else {
  //       this.listProcesoCalculado.push({
  //         idProceso: x.idProceso,
  //         total: factor
  //       });
  //     }
  //   });

  //   let sumaTotal = 0;
  //   let sumaTotalFinal = 0;
  //   this.listProcesoCalculado.forEach(final => {
  //     sumaTotal += final.total;
  //   });
  //   sumaTotalFinal = sumaTotal / 10;
  //   return sumaTotalFinal;
  // }

  // onCalcularPesoPromedio(): number {
  //   let pesoPromedio = 0;

  //   let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0);

  //   cloneList.forEach(x => {
  //       pesoPromedio = pesoPromedio + x.valor;
  //   });

  //   return pesoPromedio / 100;
  // }

  // onCalcularUniformidad(pesoPromedio: number): number {
  //   let pesoMas10Porciento = pesoPromedio * 1.10;
  //   let pesoMenos10Porciento = pesoPromedio - (pesoPromedio * 0.10);

  //   let countUniformidad = 0;

  //   let cloneList = [...this.modeloItem.listDetalleNew].filter(x => x.factor === 0);

  //   cloneList.forEach(x => {
  //     if (x.valor >= pesoMenos10Porciento && x.valor <= pesoMas10Porciento) {
  //       countUniformidad += 1;
  //     }
  //   });

  //   return countUniformidad;
  // }

  listUpdate(event: any[]) {
    this.modeloItem.listDetalleFotos = [];
    event.forEach(x => {
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listDetalleFotos.push(itemImagen);
        } else {
          this.modeloItem.listDetalleFotos.push({
            idExamenFisicoDetalle: 0,
            idExamenFisico: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listDetalleFotos.push({
          idExamenFisicoDetalle: 0,
          idExamenFisico: 0,
          foto: x.imagen
        });
      }
    });
  }

  onGrabar() {

    this.modeloItem.listDetalleNew
    .map(x => {
      x.valor = Number(x.valor);
    });
    // console.log('modeloItem', this.modeloItem);
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoService.setUpdateTxExamenFisicoPollito(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.onBack();
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onBack() {
    this.router.navigate(['/main/module-ef/panel-tx-examen-fisico-pollito']);
  }
}
