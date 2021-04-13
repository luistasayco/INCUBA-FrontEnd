import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { TxSINMIModel } from '../../../models/tx-sinmi.model';
import { SinmiService } from '../../../services/sinmi.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { TxSINMIFotosModel } from '../../../models/tx-sinmi-foto.model';

@Component({
  selector: 'app-update-tx-sinmi',
  templateUrl: './update-tx-sinmi.component.html',
  styleUrls: ['./update-tx-sinmi.component.css']
})
export class UpdateTxSinmiComponent implements OnInit, OnDestroy {

  subscription$: Subscription;

  // Titulo del componente
  titulo = 'Sistema Integral de Monitoreo Intestinal Nro:';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloItem: TxSINMIModel = new TxSINMIModel();

  displayControles: boolean;
  displaySave: boolean;

  //Columnas
  columnas

  rowGroupMetadata: any;
  id: number;
  listIma: any[];
  cloneListImagen: TxSINMIFotosModel[] = [];
  constructor(private sinmiService: SinmiService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private router: Router,
              private route: ActivatedRoute,
              private userContextService: UserContextService,
              private utilService: UtilService) { 
                this.breadcrumbService.setItems([
                  { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
                  { label: 'SINMI', routerLink: ['module-sm/panel-tx-sinmi'] },
                  { label: 'Actualizar'}
              ]);
              }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.goColumnasBuild();

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      
      this.getToTxSINMIPorId();
      
    });
    
    
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

  getToTxSINMIPorId() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.getTxSINMIPorId(this.id)
    .subscribe((data: TxSINMIModel) => {

      this.modeloItem = data;
      this.cloneListImagen = [...this.modeloItem.listaTxSINMIFotos];
      this.listImagen();

      this.updateRowGroupMetaData();
      console.log('this.modeloItem', this.modeloItem);
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

  listImagen() {
    this.listIma = [];
    if (this.modeloItem.listaTxSINMIFotos.length > 0 ) {
      this.modeloItem.listaTxSINMIFotos.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listaTxSINMIFotos = [];
    event.forEach(x => {
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listaTxSINMIFotos.push(itemImagen);
        } else {
          this.modeloItem.listaTxSINMIFotos.push({
            idSINMIFoto: 0,
            idSINMI: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listaTxSINMIFotos.push({
          idSINMIFoto: 0,
          idSINMI: 0,
          foto: x.imagen
        });
      }
    });
  }

  onGrabar() {
    
    this.displaySave = true;

    console.log('this.modeloItem', this.modeloItem);
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService.setUpdateTxSINMI(this.modeloItem)
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
