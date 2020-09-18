import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { TxRegistroEquipoModel } from '../../../models/tx-registro-equipo.model';
import { TxRegistroEquipoDetalle5Model } from '../../../models/tx-registro-equipo-detalle5.model';
import { TxRegistroEquipoDetalle6Model } from '../../../models/tx-registro-equipo-detalle6.model';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-registro-equipo-update',
  templateUrl: './registro-equipo-update.component.html',
  styleUrls: ['./registro-equipo-update.component.css']
})
export class RegistroEquipoUpdateComponent implements OnInit {

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
  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private readonly route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Modulo' },
        { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] },
        { label: 'Actualizar registro de equipo'}
    ]);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.idRegistroEquipo = params.id;
      this.onListar();
    });

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

    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedModelo = null;

    this.getToObtieneEmpresa();
    this.getToObtieneModelo();

  }

  getToObtieneEmpresa() {
    this.compartidoService.getEmpresa(this.modeloEmpresa)
    .subscribe((data: EmpresaModel[]) => {
      this.listItemEmpresa = [];
      for (let item of data) {
        this.listItemEmpresa.push({ label: item.descripcion, value: item.codigoEmpresa });
      }
      });
  }

  getOnChangeEmpresa() {
    if (this.selectedEmpresa !== null) {
      this.getToObtienePlantaPorEmpresa(this.selectedEmpresa.value);
    } else {
      this.listItemPlanta = [];
    }
  }

  getToObtienePlantaPorEmpresa(value: string) {
    this.modeloPlanta.codigoEmpresa = value;
    this.compartidoService.getPlantaPorEmpresa(this.modeloPlanta)
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
      });
  }

  getToObtieneModelo() {
    this.registroEquipoService.getModelo(this.modeloModelo)
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.idModelo });
      }
      });
  }

  getOnChangeModelo() {
    this.onListar();
  }

  getOnChangePlanta(){
    this.onListar();
  }

  onListar() {
    this.registroEquipoService.getTxRegistroEquipoPorId(this.idRegistroEquipo)
      .subscribe(resp => {
        if (resp) {
          this.modeloItem  = resp;
          this.updateRowGroupMetaData();
          this.updateRowGroupMetaDataDetalle2();
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
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

  onToGrabar() {
    this.registroEquipoService.setInsertTxRegistroEquipo(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      // this.back();
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

}
