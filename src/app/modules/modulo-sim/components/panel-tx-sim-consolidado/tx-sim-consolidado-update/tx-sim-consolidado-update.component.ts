import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../../models/acceso-button';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxSIMConsolidado } from '../../../models/tx-sim-consolidado-model';
import { TxSIMModel } from '../../../models/tx-sim.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SessionService } from '../../../../../services/session.service';
import { SimService } from '../../../services/sim.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LanguageService } from '../../../../../services/language.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';

@Component({
  selector: 'app-tx-sim-consolidado-update',
  templateUrl: './tx-sim-consolidado-update.component.html',
  styleUrls: ['./tx-sim-consolidado-update.component.css']
})
export class TxSimConsolidadoUpdateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Consolidado  Nro : ';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();
  
  // Opcion Buscar
  modeloItem: TxSIMConsolidado = new TxSIMConsolidado();
  listModelo: TxSIMConsolidado[];
  listModeloDocumento: TxSIMModel[];

  selectModeloDocumento: TxSIMModel[];
  
  columnas: any[];
  
  subscription$: Subscription;

  id: number;
  
  // Variables para eliminar
  displaySave: boolean;
  displaySeleccion: boolean;
  modeloDatosCierre: TxSIMConsolidado = new TxSIMConsolidado();

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private simService: SimService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private route: ActivatedRoute) { 
      this.breadcrumbService.setItems([
        { label: 'Módulo Sistema Integración Monitoreo' },
        { label: 'SIM - Consolidado', routerLink: ['module-si/panel-tx-sim-consolidado'] },
        { label: 'Actualizar' },
    ]);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.onObtieneConsolidadoPorId();
    });

    this.columnas = [
      { field: 'idSIM', header: 'Nro' },
      { field: 'Fec. Registro', header: 'FecRegistro' },
      { field: 'codigoPlanta', header: 'Granja' },
      { field: 'edad', header: 'Edad' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'galpon', header: 'Galpon' },
      { field: 'nroPollos', header: 'NroPollos' }
    ];
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onObtieneConsolidadoPorId () {
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.getTxSIMConsolidadoPorId(this.id)
    .subscribe((data: TxSIMConsolidado) => {
      
      this.modeloItem = data;
    });
  }

  getObtieneDocumentoPorCodigoEmpresa() {

    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.getTxSIMConsolidadoPorCodigoEmpresa(this.modeloItem.codigoEmpresa)
    .subscribe((data: TxSIMModel[]) => {
      this.listModeloDocumento = [];
      this.listModeloDocumento = data;
      });
  }

  onToCreate() {
    this.onHabilitarCreate();
    this.getObtieneDocumentoPorCodigoEmpresa();
    this.selectModeloDocumento = [];
  }

  onHabilitarCreate() {
    this.displaySeleccion = !this.displaySeleccion;
  }

  onGrabarDocumentoSeleccionado() {
    if (this.selectModeloDocumento.length > 0) {
      let cloneLista = [...this.selectModeloDocumento]

      cloneLista.forEach( xFila => {
        this.modeloItem.listaTxSIMConsolidadoDetalle.push(
          {
            idSIMConsolidadoDetalle: 0,
            idSIMConsolidado: 0,
            idSIM: xFila.idSIM,
            codigoPlanta: xFila.codigoPlanta,
            fecHoraRegistro: xFila.fecHoraRegistro,
            edad: xFila.edad,
            sexo: xFila.sexo,
            zona: xFila.zona,
            galpon: xFila.galpon,
            nroPollos: xFila.nroPollos
          }
        );
      });
    }

    this.onHabilitarCreate();
  }


  onGrabarDocumento() {
    if (this.modeloItem.listaTxSIMConsolidadoDetalle.length > 0) {
      this.displaySave = true;
      this.subscription$ = new Subscription();
      this.subscription$ = this.simService.setUpdateTxSIMConsolidado(this.modeloItem)
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
  }

  onConfirmEliminar(idSIM: number) {
    this.confirmationService.confirm({
      message: this.globalConstants.subTitleEliminar,
      header: this.globalConstants.titleEliminar,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.modeloItem.listaTxSIMConsolidadoDetalle = [...this.modeloItem.listaTxSIMConsolidadoDetalle].filter(xFila => xFila.idSIM !== idSIM);
      },
      reject: () => {
        this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
      }
    });
    
  }

  onBack() {
    this.router.navigate(['/main/module-si/panel-tx-sim-consolidado']);
  }

}
