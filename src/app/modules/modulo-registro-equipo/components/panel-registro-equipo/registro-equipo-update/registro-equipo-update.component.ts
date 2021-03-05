import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { TxRegistroEquipoModel } from '../../../models/tx-registro-equipo.model';
import { TxRegistroEquipoDetalle5Model } from '../../../models/tx-registro-equipo-detalle5.model';
import { TxRegistroEquipoDetalle6Model } from '../../../models/tx-registro-equipo-detalle6.model';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { TxRegistroEquipoDetalle7Model } from '../../../models/tx-registro-equipo-detalle7.model';

@Component({
  selector: 'app-registro-equipo-update',
  templateUrl: './registro-equipo-update.component.html',
  styleUrls: ['./registro-equipo-update.component.css']
})
export class RegistroEquipoUpdateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Registro de Equipo Nro:';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemModelo: SelectItem[];

  // Variables de dato seleccionado
  selectedEmpresa: any;
  selectedPlanta: any;
  selectedModelo: any;

  modeloEmpresa: EmpresaModel = new EmpresaModel();
  modeloPlanta: PlantaModel = new PlantaModel();
  modeloModelo: ModeloModel = new ModeloModel();

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

  cloneListImagen: TxRegistroEquipoDetalle7Model[] = [];

  displaySave: boolean;
  displayControles: boolean;
  constructor(private registroEquipoService: RegistroEquipoService,
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
      { header: 'Stock Actual' },
      { header: 'Cambio por mtto.' },
      { header: 'Entrego' }
    ];
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.getTxRegistroEquipoPorId(this.idRegistroEquipo)
    .subscribe(resp => {
      if (resp) {
        this.modeloItem = resp;
        this.cloneListImagen = [...this.modeloItem.txRegistroEquipoDetalle7];
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
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.txRegistroEquipoDetalle7.push(itemImagen);
        } else {
          this.modeloItem.txRegistroEquipoDetalle7.push({
            idRegistroEquipoDetalle: 0,
            idRegistroEquipo: 0,
            foto: x.imagen,
            orden: 0
          });
        }
      } else {
        this.modeloItem.txRegistroEquipoDetalle7.push({
          idRegistroEquipoDetalle: 0,
          idRegistroEquipo: 0,
          foto: x.imagen,
          orden: 0
        });
      }
    });
  }

  onToGrabar() {
    
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.setUpdateTxRegistroEquipo(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.displaySave = false;
      this.back();
    },
      (error) => {
        this.displaySave = false;
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-registro-equipo']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
}
