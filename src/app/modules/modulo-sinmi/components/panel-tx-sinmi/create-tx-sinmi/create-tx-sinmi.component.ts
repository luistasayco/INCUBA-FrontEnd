import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxSINMIModel } from '../../../models/tx-sinmi.model';
import { SinmiService } from '../../../services/sinmi.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { Router } from '@angular/router';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { TxSINMIDetalleModel } from '../../../models/tx-sinmi-detalle.model';

@Component({
  selector: 'app-create-tx-sinmi',
  templateUrl: './create-tx-sinmi.component.html',
  styleUrls: ['./create-tx-sinmi.component.css']
})
export class CreateTxSinmiComponent implements OnInit, OnDestroy {

  subscription$: Subscription;

  // Titulo del componente
  titulo = 'Sistema Integral de Monitoreo Intestinal';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  // Variables de dato seleccionado
  selectedEmpresa: any;

  modeloItem: TxSINMIModel = new TxSINMIModel();

  displayControles: boolean;
  displaySave: boolean;

  //Columnas
  columnas

  rowGroupMetadata: any;

  constructor(private sinmiService: SinmiService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private router: Router,
              private userContextService: UserContextService,
              private utilService: UtilService) { 
                this.breadcrumbService.setItems([
                  { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
                  { label: 'SINMI', routerLink: ['module-sm/panel-tx-sinmi'] },
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
    this.getToTxSINMIDetalleNew();
    
  }

  goColumnasBuild() {
    this.columnas= [
      { header: 'DescripcionOrgano' },
      { header: 'DescripcionOrganoDetalle' },
      { header: 'Score' },
      { header: 'Ave 1' },
      { header: 'Ave 2' },
      { header: 'Ave 3' },
      { header: 'Ave 4' },
      { header: 'Ave 5' }
    ];
  }

  getToTxSINMIDetalleNew() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.getTxSINMIDetalleNew()
    .subscribe((data: TxSINMIDetalleModel[]) => {
      this.modeloItem = new TxSINMIModel();
      this.modeloItem.listaTxSINMIDetalle = [];

      this.modeloItem.listaTxSINMIDetalle = data;
      this.modeloItem.responsableInvetsa = this.userContextService.getNombreCompletoUsuario();
      this.modeloItem.emailFrom = this.userContextService.getEmail();
      this.updateRowGroupMetaData();
      // console.log('this.modeloItem', this.modeloItem);
    });
  }

    // Obtiene las empresas de forma local
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

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.modeloItem.listaTxSINMIDetalle) {
        for (let i = 0; i < this.modeloItem.listaTxSINMIDetalle.length; i++) {
            let rowData = this.modeloItem.listaTxSINMIDetalle[i];
            let descripcionOrgano = rowData.descripcionOrgano;
            if (i == 0) {
                this.rowGroupMetadata[descripcionOrgano] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.modeloItem.listaTxSINMIDetalle[i - 1];
                let previousRowGroup = previousRowData.descripcionOrgano;
                if (descripcionOrgano === previousRowGroup)
                    this.rowGroupMetadata[descripcionOrgano].size++;
                else
                    this.rowGroupMetadata[descripcionOrgano] = { index: i, size: 1 };
            }
        }
    }
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }

  listUpdate(event: any[]) {
    this.modeloItem.listaTxSINMIFotos = [];
    event.forEach(x => {
      this.modeloItem.listaTxSINMIFotos.push({
        idSINMIFoto: 0,
        idSINMI: 0,
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
    this.modeloItem.fecRegistro = null;
    this.modeloItem.fecHoraRegistro = null;
    this.modeloItem.flgCerrado = false;

    // console.log('this.modeloItem', this.modeloItem);
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.setInsertTxSINMI(this.modeloItem)
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
    this.router.navigate(['/main/module-sm/panel-tx-sinmi']);
  }

}
