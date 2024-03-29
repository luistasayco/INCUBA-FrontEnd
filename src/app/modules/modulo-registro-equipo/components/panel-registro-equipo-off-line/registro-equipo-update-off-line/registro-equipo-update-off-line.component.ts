import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { TxRegistroEquipoModel } from '../../../models/tx-registro-equipo.model';
import { TxRegistroEquipoDetalle5Model } from '../../../models/tx-registro-equipo-detalle5.model';
import { TxRegistroEquipoDetalle6Model } from '../../../models/tx-registro-equipo-detalle6.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Subscription, Observable } from 'rxjs';
import { RegistroEquipoLocalService } from '../../../services/registro-equipo-local.service';

@Component({
  selector: 'app-registro-equipo-update-off-line',
  templateUrl: './registro-equipo-update-off-line.component.html',
  styleUrls: ['./registro-equipo-update-off-line.component.css']
})
export class RegistroEquipoUpdateOffLineComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Registro de Equipo Nro:';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloItem: TxRegistroEquipoModel = new TxRegistroEquipoModel();

  rowGroupMetadata: any;
  rowGroupMetadataDetalle2: any;

  columnasDetalle5: any[];
  columnasDetalle6: any[];

  // Opcion Editar
  modelocloned: { [s: string]: TxRegistroEquipoDetalle5Model; } = {};
  modeloclonedDetalle6: { [s: string]: TxRegistroEquipoDetalle6Model; } = {};

  // Obtenemos el ID si modificamos el registro
  idRegistroEquipo: number;

  subscription$: Subscription;

  listIma: any[];
  displayControles: boolean;
  constructor(private registroEquipoLocalService: RegistroEquipoLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private readonly route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Registro Equipo' },
        { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] },
        { label: 'Actualizar'}
    ]);
  }
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idRegistroEquipo = params.id;
      this.onListar();
    });

    this.listIma = [];

    this.columnasDetalle5 = [
      { header: 'Codigo' },
      { header: 'Repuesto' },
      { header: 'Activo Fijo' },
      { header: 'Observación' }
    ];

    this.columnasDetalle6 = [
      { header: 'Repuesto' },
      { header: 'Descripción' },
      { header: 'Cambio por mtto.' },
      { header: 'Entrego' }
    ];
  }

  onListar() {
    let id = Number(this.idRegistroEquipo);
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoLocalService.getTxRegistroEquipoPorId(id)
    .subscribe(resp => {
      if (resp) {
        this.modeloItem = resp;
        this.onUpdateRow();
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onUpdateRow() {
    this.updateRowGroupMetaData();
    this.updateRowGroupMetaDataDetalle2();
    this.listImagen();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.modeloItem.txRegistroEquipoDetalle1) {
        for (let i = 0; i < this.modeloItem.txRegistroEquipoDetalle1.length; i++) {
            let rowData = this.modeloItem.txRegistroEquipoDetalle1[i];
            let brand = rowData.descripcion;
            if (i == 0) {
                this.rowGroupMetadata[brand] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.modeloItem.txRegistroEquipoDetalle1[i - 1];
                let previousRowGroup = previousRowData.descripcion;
                if (brand === previousRowGroup)
                    this.rowGroupMetadata[brand].size++;
                else
                    this.rowGroupMetadata[brand] = { index: i, size: 1 };
            }
        }
    }
  }

  updateRowGroupMetaDataDetalle2() {
    this.rowGroupMetadataDetalle2 = {};
    if (this.modeloItem.txRegistroEquipoDetalle2) {
        for (let i = 0; i < this.modeloItem.txRegistroEquipoDetalle2.length; i++) {
            let rowData = this.modeloItem.txRegistroEquipoDetalle2[i];
            let brand = rowData.codigoRepuesto;
            if (i == 0) {
                this.rowGroupMetadataDetalle2[brand] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.modeloItem.txRegistroEquipoDetalle2[i - 1];
                let previousRowGroup = previousRowData.codigoRepuesto;
                if (brand === previousRowGroup)
                    this.rowGroupMetadataDetalle2[brand].size++;
                else
                    this.rowGroupMetadataDetalle2[brand] = { index: i, size: 1 };
            }
        }
    }
  }

  listImagen() {
    if (this.modeloItem.txRegistroEquipoDetalle7.length > 0 ) {
      this.modeloItem.txRegistroEquipoDetalle7.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.txRegistroEquipoDetalle7 = [];
    event.forEach(x => {
      this.modeloItem.txRegistroEquipoDetalle7.push({
        idRegistroEquipoDetalle: 0,
        idRegistroEquipo: 0,
        foto: x.imagen,
        orden: 0
      });
    });
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
  
  onToGrabar() {
    this.subscription$ = new Subscription();
    // this.modeloItem.flgEnModificacion = false;
    this.subscription$ = this.registroEquipoLocalService.setUpdateTxRegistroEquipo(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back();
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-registro-equipo-offline']);
  }

}
