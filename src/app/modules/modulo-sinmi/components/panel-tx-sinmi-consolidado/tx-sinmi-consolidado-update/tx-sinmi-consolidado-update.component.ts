import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../../models/acceso-button';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { TxSINMIConsolidado } from '../../../models/tx-sinmi-consolidado.model';
import { TxSINMIModel } from '../../../models/tx-sinmi.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SessionService } from '../../../../../services/session.service';
import { SimService } from '../../../../modulo-sim/services/sim.service';
import { SinmiService } from '../../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'app-tx-sinmi-consolidado-update',
  templateUrl: './tx-sinmi-consolidado-update.component.html',
  styleUrls: ['./tx-sinmi-consolidado-update.component.css']
})
export class TxSinmiConsolidadoUpdateComponent implements OnInit, OnDestroy {


  // Titulo del componente
  titulo = 'Consolidado  Nro : ';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();
  
  // Opcion Buscar
  modeloItem: TxSINMIConsolidado = new TxSINMIConsolidado();
  listModelo: TxSINMIConsolidado[];
  listModeloDocumento: TxSINMIModel[];

  selectModeloDocumento: TxSINMIModel[];
  
  columnas: any[];
  
  subscription$: Subscription;

  id: number;
  
  // Variables para eliminar
  displaySave: boolean;
  displaySeleccion: boolean;
  modeloDatosCierre: TxSINMIConsolidado = new TxSINMIConsolidado();

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private route: ActivatedRoute) { 
      this.breadcrumbService.setItems([
        { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
        { label: 'SINMI - Consolidado', routerLink: ['module-sm/panel-tx-sinmi-consolidado'] },
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
      { field: 'motivoVisita', header: 'Motivo Visita' }
    ];
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onObtieneConsolidadoPorId () {
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.getTxSINMIConsolidadoPorId(this.id)
    .subscribe((data: TxSINMIConsolidado) => {
      
      this.modeloItem = data;
    });
  }

  getObtieneDocumentoPorCodigoEmpresa() {

    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.getTxSINMIConsolidadoPorCodigoEmpresa(this.modeloItem.codigoEmpresa)
    .subscribe((data: TxSINMIModel[]) => {
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
        this.modeloItem.listaTxSINMIConsolidadoDetalle.push(
          {
            idSINMIConsolidadoDetalle: 0,
            idSINMIConsolidado: 0,
            idSINMI: xFila.idSINMI,
            codigoPlanta: xFila.codigoPlanta,
            fecHoraRegistro: xFila.fecHoraRegistro,
            edad: xFila.edad,
            motivoVisita: xFila.motivoVisita
          }
        );
      });
    }

    this.onHabilitarCreate();
  }


  onGrabarDocumento() {
    if (this.modeloItem.listaTxSINMIConsolidadoDetalle.length > 0) {
      this.displaySave = true;
      this.subscription$ = new Subscription();
      this.subscription$ = this.sinmiService.setUpdateTxSINMIConsolidado(this.modeloItem)
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

  onConfirmEliminar(idSINMI: number) {
    this.confirmationService.confirm({
      message: this.globalConstants.subTitleEliminar,
      header: this.globalConstants.titleEliminar,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.modeloItem.listaTxSINMIConsolidadoDetalle = [...this.modeloItem.listaTxSINMIConsolidadoDetalle].filter(xFila => xFila.idSINMI !== idSINMI);
      },
      reject: () => {
        this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
      }
    });
    
  }

  onBack() {
    this.router.navigate(['/main/module-sm/panel-tx-sinmi-consolidado']);
  }

}
