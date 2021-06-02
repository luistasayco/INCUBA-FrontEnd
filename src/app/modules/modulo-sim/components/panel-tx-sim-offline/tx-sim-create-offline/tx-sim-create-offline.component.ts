import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng';
import { TxSIMModel } from '../../../models/tx-sim.model';
import { TxSIMIndiceBursalModel } from '../../../models/tx-sim-indice-bursal.model';
import { TxSIMRespiratorioModel } from '../../../models/tx-sim-respiratorio.model';
import { TxSIMDigestivoModel } from '../../../models/tx-sim-digestivo.model';
import { TxSIMLesionBursaModel } from '../../../models/tx-sim-lesion-bursa.model';
import { TxSIMLesionTimoModel } from '../../../models/tx-sim-lesion-timo.model';
import { TxSIMLesionesModel } from '../../../models/tx-sim-lesiones.model';
import { SimLocalService } from '../../../services/sim-local.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { Router } from '@angular/router';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { CompartidoLocalService } from 'src/app/modules/modulo-compartido/services/compartido-local.service';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';

@Component({
  selector: 'app-tx-sim-create-offline',
  templateUrl: './tx-sim-create-offline.component.html',
  styleUrls: ['./tx-sim-create-offline.component.css']
})
export class TxSimCreateOfflineComponent implements OnInit, OnDestroy {

  subscription$: Subscription;

  // Titulo del componente
  titulo = 'Sistema Integrado de Monitoreo Nro:';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  // Variables de dato seleccionado
  selectedEmpresa: any;

  modeloItem: TxSIMModel = new TxSIMModel();
  modeloInsertIndiceBursal: TxSIMIndiceBursalModel = new TxSIMIndiceBursalModel();
  modeloInsertRespiratorio: TxSIMRespiratorioModel = new TxSIMRespiratorioModel();
  modeloInsertDigestivo: TxSIMDigestivoModel = new TxSIMDigestivoModel();
  modeloInsertLesionBursal: TxSIMLesionBursaModel = new TxSIMLesionBursaModel();
  modeloInsertLesionTimo: TxSIMLesionTimoModel = new TxSIMLesionTimoModel();
  modeloInsertLesiones: TxSIMLesionesModel = new TxSIMLesionesModel();

  displayControles: boolean;
  displaySave: boolean;
  displayIndiceBursal: boolean;
  displayRespiratorio: boolean;
  displayDigestivo: boolean;
  displayLesionBursal: boolean;
  displayLesionTimo: boolean;
  displayLesiones: boolean;

  //Columnas
  columnasIndiceBursal: any[];
  columnasRespiratorio: any[];
  columnasDigestivo: any[];
  columnasLesionBursal: any[];
  columnasLesionTimo: any[];
  columnasLesiones: any[];
  // Clon
  modeloclonedIndiceBursal: { [s: string]: TxSIMIndiceBursalModel; } = {};

  constructor(private simService: SimLocalService,
              private compartidoService: CompartidoLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private router: Router,
              private userContextService: UserContextService,
              private utilService: UtilService) { 
                this.breadcrumbService.setItems([
                  { label: 'Módulo Sistema Integrado de Monitoreo' },
                  { label: 'Sis. Integrado de Monitoreo - offline', routerLink: ['module-si/panel-tx-sim-offline'] },
                  { label: 'Nuevo'}
              ]);
              }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.getToObtieneEmpresa();
    this.goColumnasBuild();

    this.modeloItem.responsableInvetsa = this.userContextService.getNombreCompletoUsuario();
    this.modeloItem.emailFrom = this.userContextService.getEmail();
    this.modeloItem.listaTxSIMIndiceBursal = [];
    this.modeloItem.listaTxSIMRespiratorio = [];
    this.modeloItem.listaTxSIMDigestivos = [];
    this.modeloItem.listaTxSIMLesionBursa = [];
    this.modeloItem.listaTxSIMLesionTimo = [];
    this.modeloItem.listaTxSIMLesiones = [];
    this.modeloItem.listaTxSIMFotos = [];
  }

  goColumnasBuild() {
    this.columnasIndiceBursal= [
      { header: 'Ave' },
      { header: 'Peso Corporal (g)' },
      { header: 'Peso de Bursa (g)' },
      { header: 'Peso de Bazo (g)' },
      { header: 'Peso de Timo (g)' },
      { header: 'Peso de Higado (g)' },
      { header: 'Índice Bursal' },
      { header: 'Índice Timico' },
      { header: 'Índice Hepático' },
      { header: 'Bursometro' }
    ];

    this.columnasRespiratorio= [
      { header: 'Ave' },
      { header: 'Sacos aereos' },
      { header: 'Cornetes' },
      { header: 'Glotis' },
      { header: 'Tráquea' },
      { header: 'Pulmones' },
      { header: 'Riñones' },
      { header: 'Placas Peyer' }
    ];

    this.columnasDigestivo= [
      { header: 'Ave' },
      { header: 'Duodeno' },
      { header: 'Yeyuno' },
      { header: 'Lleon' },
      { header: 'Ciegos' },
      { header: 'Tonsilas C.' },
      { header: 'Hígado' },
      { header: 'Molleja' },
      { header: 'Proventriculo' }
    ];

    this.columnasLesionBursal= [
      { header: 'Ave' },
      { header: 'Valor' }
    ];

    this.columnasLesionTimo= [
      { header: 'Ave' },
      { header: 'Valor' }
    ];

    this.columnasLesiones= [
      { header: 'Lesiones Duodeno' },
      { header: 'Lesiones en intestino medio' },
      { header: 'Lesiones en Hígado' }
    ];
  }

    // Obtiene las empresas de forma local
  getToObtieneEmpresa() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoService.getEmpresa()
    .subscribe((data: EmpresaModel[]) => {
      this.listItemEmpresa = [];
      for (let item of data) {
        this.listItemEmpresa.push({ label: item.descripcion, value: item.codigoEmpresa });
      }
      });
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }

  onNewIndiceBursal() {
    this.modeloInsertIndiceBursal = new TxSIMIndiceBursalModel();
    this.displayIndiceBursal = ! this.displayIndiceBursal;
  }

  onSaveIndiceBursal() {
    this.modeloInsertIndiceBursal.indiceBursal = this.onConvertDecimales((this.modeloInsertIndiceBursal.pesoBursa / this.modeloInsertIndiceBursal.pesoCorporal) * 1000,2);
    this.modeloInsertIndiceBursal.indiceTimico = this.onConvertDecimales((this.modeloInsertIndiceBursal.pesoTimo / this.modeloInsertIndiceBursal.pesoCorporal) * 1000,2);
    this.modeloInsertIndiceBursal.indiceHepatico = this.onConvertDecimales((this.modeloInsertIndiceBursal.pesoHigado / this.modeloInsertIndiceBursal.pesoCorporal) * 100,2);
    this.modeloInsertIndiceBursal.flgPromedio = false;
    this.modeloItem.listaTxSIMIndiceBursal.push(this.modeloInsertIndiceBursal);
    this.onPromedioIndiceBursal();
    this.agregarNumLineas(this.modeloItem.listaTxSIMIndiceBursal);
    this.onNewIndiceBursal();
    this.onFormulasIndiceBursal()
  }

  onPromedioIndiceBursal() {
    let promedio = new TxSIMIndiceBursalModel();
    let clone = [...this.modeloItem.listaTxSIMIndiceBursal].filter( x => x.flgPromedio === false);
    let clonePush = [...this.modeloItem.listaTxSIMIndiceBursal].filter( x => x.flgPromedio === false);
    promedio.flgPromedio = true;
    let qtyLinea = clone.length;
    clone.forEach(x => {
      promedio.pesoCorporal += x.pesoCorporal/qtyLinea;
      promedio.pesoBursa += this.onConvertDecimales(x.pesoBursa/qtyLinea, 1);
      promedio.pesoBazo += this.onConvertDecimales(x.pesoBazo/qtyLinea, 1);
      promedio.pesoTimo += this.onConvertDecimales(x.pesoTimo/qtyLinea, 1);
      promedio.pesoHigado += this.onConvertDecimales(x.pesoHigado/qtyLinea, 1);
      promedio.indiceBursal += this.onConvertDecimales(x.indiceBursal/qtyLinea, 1);
      promedio.indiceTimico += this.onConvertDecimales(x.indiceTimico/qtyLinea, 1);
      promedio.indiceHepatico += this.onConvertDecimales(x.indiceHepatico/qtyLinea, 1);
      promedio.bursometro += this.onConvertDecimales(x.bursometro/qtyLinea, 1);
    });  

    promedio.pesoBursa = this.onConvertDecimales(promedio.pesoBursa, 1);
    promedio.pesoBazo = this.onConvertDecimales(promedio.pesoBazo, 1);
    promedio.pesoTimo = this.onConvertDecimales(promedio.pesoTimo, 1);
    promedio.pesoHigado = this.onConvertDecimales(promedio.pesoHigado, 1);
    promedio.indiceBursal = this.onConvertDecimales(promedio.indiceBursal, 1);
    promedio.indiceTimico = this.onConvertDecimales(promedio.indiceTimico, 1);
    promedio.indiceHepatico = this.onConvertDecimales(promedio.indiceHepatico, 1);
    promedio.bursometro = this.onConvertDecimales(promedio.bursometro , 1);

    clonePush.push(promedio);
    this.modeloItem.listaTxSIMIndiceBursal = clonePush;
  }

  onFormulasIndiceBursal() {
    
    let formulasIndiceBursal = [...this.modeloItem.listaTxSIMIndiceBursal].filter(xFila => xFila.flgPromedio === false);

    let aFavorBursa = 0;
    let aFavorBazo = 0;
    let relacion = 0;

    formulasIndiceBursal.forEach(xFila => {
      if (xFila.pesoBursa > xFila.pesoBazo) {
        aFavorBursa += 1;
      }

      if (xFila.pesoBazo > xFila.pesoBursa) {
        aFavorBazo += 1;
      }

      if (xFila.pesoBazo === xFila.pesoBursa) {
        relacion += 1;
      }

    });

    this.modeloItem.relacionAFavorBursa = aFavorBursa;
    this.modeloItem.relacionAFavorBazo = aFavorBazo;
    this.modeloItem.relacion1a1 = relacion;

  }
  
  onConvertDecimales(valor: number, decimales: number) : number {
    let dato = valor.toFixed(decimales);

    return Number(dato);
  }

  onNewRespiratorio() {
    this.modeloInsertRespiratorio = new TxSIMRespiratorioModel();
    this.displayRespiratorio = ! this.displayRespiratorio;
  }

  onSaveRespiratorio() {
    this.modeloInsertRespiratorio.flgGradoLesion = false;
    this.modeloItem.listaTxSIMRespiratorio.push(this.modeloInsertRespiratorio);
    this.onPromedioRespiratorio();
    this.agregarNumLineas(this.modeloItem.listaTxSIMRespiratorio);
    this.onNewRespiratorio();
  }

  onPromedioRespiratorio() {
    let promedio = new TxSIMRespiratorioModel();
    let clone = [...this.modeloItem.listaTxSIMRespiratorio].filter( x => x.flgGradoLesion === false);
    let clonePush = [...this.modeloItem.listaTxSIMRespiratorio].filter( x => x.flgGradoLesion === false);
    promedio.flgGradoLesion = true;
    let qtyLinea = clone.length;
    clone.forEach(x => {
      promedio.sacosAereos += this.onConvertDecimales(x.sacosAereos/qtyLinea,2);
      promedio.cornetes += this.onConvertDecimales(x.cornetes/qtyLinea, 2);
      promedio.glotis += this.onConvertDecimales(x.glotis/qtyLinea, 2);
      promedio.traquea += this.onConvertDecimales(x.traquea/qtyLinea, 2);
      promedio.pulmones += this.onConvertDecimales(x.pulmones/qtyLinea, 2);
      promedio.rinones += this.onConvertDecimales(x.rinones/qtyLinea, 2);
      promedio.placaPeyer += this.onConvertDecimales(x.placaPeyer/qtyLinea, 2);
    });  

    clonePush.push(promedio);
    this.modeloItem.listaTxSIMRespiratorio = clonePush;
  }

  onNewDigestivo() {
    this.modeloInsertDigestivo = new TxSIMDigestivoModel();
    this.displayDigestivo = ! this.displayDigestivo;
  }

  onSaveDigestivo() {
    this.modeloInsertDigestivo.flgGradoLesion = false;
    this.modeloItem.listaTxSIMDigestivos.push(this.modeloInsertDigestivo);
    this.onPromedioDigestivo();
    this.agregarNumLineas(this.modeloItem.listaTxSIMDigestivos);
    this.onNewDigestivo();
  }

  onPromedioDigestivo() {
    let promedio = new TxSIMDigestivoModel();
    let clone = [...this.modeloItem.listaTxSIMDigestivos].filter( x => x.flgGradoLesion === false);
    let clonePush = [...this.modeloItem.listaTxSIMDigestivos].filter( x => x.flgGradoLesion === false);
    promedio.flgGradoLesion = true;
    let qtyLinea = clone.length;
    clone.forEach(x => {
      promedio.duademo += this.onConvertDecimales(x.duademo/qtyLinea,2);
      promedio.yeyuno += this.onConvertDecimales(x.yeyuno/qtyLinea, 2);
      promedio.lleon += this.onConvertDecimales(x.lleon/qtyLinea, 2);
      promedio.ciegos += this.onConvertDecimales(x.ciegos/qtyLinea, 2);
      promedio.tonsillas += this.onConvertDecimales(x.tonsillas/qtyLinea, 2);
      promedio.higados += this.onConvertDecimales(x.higados/qtyLinea, 2);
      promedio.molleja += this.onConvertDecimales(x.molleja/qtyLinea, 2);
      promedio.proventriculo += this.onConvertDecimales(x.proventriculo/qtyLinea, 2);
    });  

    clonePush.push(promedio);
    this.modeloItem.listaTxSIMDigestivos = clonePush;
  }

  onNewLesionBursal() {
    this.modeloInsertLesionBursal = new TxSIMLesionBursaModel();
    this.displayLesionBursal = ! this.displayLesionBursal;
  }

  onSaveLesionBursal() {
    this.modeloInsertLesionBursal.flgPromedio = false;
    this.modeloItem.listaTxSIMLesionBursa.push(this.modeloInsertLesionBursal);
    this.onPromedioLesionBursal();
    this.agregarNumLineas(this.modeloItem.listaTxSIMLesionBursa);
    this.onNewLesionBursal();
  }

  onPromedioLesionBursal() {
    let promedio = new TxSIMLesionBursaModel();
    let clone = [...this.modeloItem.listaTxSIMLesionBursa].filter( x => x.flgPromedio === false);
    let clonePush = [...this.modeloItem.listaTxSIMLesionBursa].filter( x => x.flgPromedio === false);
    promedio.flgPromedio = true;
    let qtyLinea = clone.length;
    clone.forEach(x => {
      promedio.valor += this.onConvertDecimales(x.valor/qtyLinea,2);
    });  

    clonePush.push(promedio);
    this.modeloItem.listaTxSIMLesionBursa = clonePush;
  }

  onNewLesionTimo() {
    this.modeloInsertLesionTimo = new TxSIMLesionTimoModel();
    this.displayLesionTimo = ! this.displayLesionTimo;
  }

  onSaveLesionTimo() {
    this.modeloInsertLesionTimo.flgPromedio = false;
    this.modeloItem.listaTxSIMLesionTimo.push(this.modeloInsertLesionTimo);
    this.onPromedioLesionTimo();
    this.agregarNumLineas(this.modeloItem.listaTxSIMLesionTimo);
    this.onNewLesionTimo();
  }

  onPromedioLesionTimo() {
    let promedio = new TxSIMLesionTimoModel();
    let clone = [...this.modeloItem.listaTxSIMLesionTimo].filter( x => x.flgPromedio === false);
    let clonePush = [...this.modeloItem.listaTxSIMLesionTimo].filter( x => x.flgPromedio === false);
    promedio.flgPromedio = true;
    let qtyLinea = clone.length;
    clone.forEach(x => {
      promedio.valor += this.onConvertDecimales(x.valor/qtyLinea,2);
    });  

    clonePush.push(promedio);
    this.modeloItem.listaTxSIMLesionTimo = clonePush;
  }

  onNewLesiones() {
    this.modeloInsertLesiones = new TxSIMLesionesModel();
    this.displayLesiones = ! this.displayLesiones;
  }

  onSaveLesiones() {
    this.modeloItem.listaTxSIMLesiones.push(this.modeloInsertLesiones);
    this.onNewLesiones();
  }

  agregarNumLineas(data: TxSIMIndiceBursalModel[] | TxSIMRespiratorioModel[] | TxSIMDigestivoModel[] | TxSIMLesionBursaModel[] | TxSIMLesionTimoModel[]) {
    let n = 1;
    for (const i of data) {
      i.ave = n++;
    }
  }

  onToRowSelectDeleteIndiceBursal(data: TxSIMIndiceBursalModel) {
    
    let cloneDelete = [...this.modeloItem.listaTxSIMIndiceBursal].filter(x => x.ave !== data.ave);

    this.modeloItem.listaTxSIMIndiceBursal = cloneDelete;
    this.agregarNumLineas(this.modeloItem.listaTxSIMIndiceBursal);
    this.onFormulasIndiceBursal()

  }

  onToRowSelectDeleteRespiratorio(data: TxSIMRespiratorioModel) {
    
    let cloneDelete = [...this.modeloItem.listaTxSIMRespiratorio].filter(x => x.ave !== data.ave);

    this.modeloItem.listaTxSIMRespiratorio = cloneDelete;
    this.agregarNumLineas(this.modeloItem.listaTxSIMRespiratorio);

  }

  onToRowSelectDeleteDigestivo(data: TxSIMDigestivoModel) {
    
    let cloneDelete = [...this.modeloItem.listaTxSIMDigestivos].filter(x => x.ave !== data.ave);

    this.modeloItem.listaTxSIMDigestivos = cloneDelete;
    this.agregarNumLineas(this.modeloItem.listaTxSIMDigestivos);

  }

  onToRowSelectDeleteLesionBursal(data: TxSIMLesionBursaModel) {
    
    let cloneDelete = [...this.modeloItem.listaTxSIMLesionBursa].filter(x => x.ave !== data.ave);

    this.modeloItem.listaTxSIMLesionBursa = cloneDelete;
    this.agregarNumLineas(this.modeloItem.listaTxSIMLesionBursa);

  }

  onToRowSelectDeleteLesionTimo(data: TxSIMLesionTimoModel) {
    
    let cloneDelete = [...this.modeloItem.listaTxSIMLesionTimo].filter(x => x.ave !== data.ave);

    this.modeloItem.listaTxSIMLesionTimo = cloneDelete;
    this.agregarNumLineas(this.modeloItem.listaTxSIMLesionTimo);

  }

  onToRowSelectDeleteLesiones(index: number) {
    
    this.modeloItem.listaTxSIMLesiones = [];

  }

  listUpdate(event: any[]) {
    this.modeloItem.listaTxSIMFotos = [];
    event.forEach(x => {
      this.modeloItem.listaTxSIMFotos.push({
        idSIMFoto: 0,
        idSIM: 0,
        foto: x.imagen
      });
    });
  }
  onGrabar() {
    if (!this.selectedEmpresa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Empresa');
      return;
    }

    this.modeloItem.codigoEmpresa = this.selectedEmpresa.value;
    this.modeloItem.descripcionEmpresa = this.selectedEmpresa.label;
    
    if (!this.modeloItem.responsableIncubadora) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Responsable Incubación');
      return;
    }
    if (!this.modeloItem.responsableInvetsa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Responsable Invetsa');
      return;
    }

    if (!this.modeloItem.emailFrom) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Ingresar Email Responsable Planta');
      return;
    }

    this.displaySave = true;
    this.modeloItem.fecCierre = null;
    this.modeloItem.fecRegistro = new Date();
    this.modeloItem.fecHoraRegistro =  new Date();
    this.modeloItem.flgCerrado = false;
    this.modeloItem.flgMigrado = false;
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.setInsertTxSIM(this.modeloItem)
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
    this.router.navigate(['/main/module-si/panel-tx-sim-offline']);
  }
}
