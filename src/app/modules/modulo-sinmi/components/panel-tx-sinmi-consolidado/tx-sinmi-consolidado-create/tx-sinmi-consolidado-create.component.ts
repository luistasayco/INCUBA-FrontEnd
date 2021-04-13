import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../../models/acceso-button';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxSINMIConsolidado } from '../../../models/tx-sinmi-consolidado.model';
import { TxSINMIModel } from '../../../models/tx-sinmi.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SessionService } from '../../../../../services/session.service';
import { SinmiService } from '../../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../../services/language.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';

@Component({
  selector: 'app-tx-sinmi-consolidado-create',
  templateUrl: './tx-sinmi-consolidado-create.component.html',
  styleUrls: ['./tx-sinmi-consolidado-create.component.css']
})
export class TxSinmiConsolidadoCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Consolidado - Nuevo';
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
  modeloItem: TxSINMIConsolidado = new TxSINMIConsolidado();
  listModelo: TxSINMIConsolidado[];
  listModeloDocumento: TxSINMIModel[];

  selectModeloDocumento: TxSINMIModel[];
  
  columnas: any[];
  rowGroupMetadata: any;
  
  subscription$: Subscription;
  
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
              private seguridadService: SeguridadService) { 
      this.breadcrumbService.setItems([
        { label: 'Módulo Sistema Integral de Monitoreo Intestinal ' },
        { label: 'SINMI - Consolidado', routerLink: ['module-sm/panel-tx-sinmi-consolidado'] },
        { label: 'Nuevo' },
    ]);
  }

  ngOnInit(): void {

    this.getToObtieneEmpresa();
    this.modeloItem.listaTxSINMIConsolidadoDetalle = [];

    this.columnas = [
      { field: 'idSINMI', header: 'Nro' },
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

  getObtieneDocumentoPorCodigoEmpresa() {

    if (!this.selectedEmpresa) {
      this.mensajePrimeNgService.onToInfoMsg(this.globalConstants.msgInfoSummary, 'Seleccionar Empresa');
      return;
    }

    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.getTxSINMIConsolidadoPorCodigoEmpresa(this.selectedEmpresa.value)
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
      this.modeloItem.fecCierre = null;
      this.modeloItem.fecRegistro = null;
      this.modeloItem.fecHoraRegistro = null;
      this.modeloItem.flgCerrado = false;
      this.subscription$ = new Subscription();
      this.subscription$ = this.sinmiService.setInsertTxSINMIConsolidado(this.modeloItem)
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
