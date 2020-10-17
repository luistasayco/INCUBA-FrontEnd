import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { TxRegistroEquipoModel } from '../../../models/tx-registro-equipo.model';
import { TxRegistroEquipoDetalle5Model } from '../../../models/tx-registro-equipo-detalle5.model';
import { TxRegistroEquipoDetalle6Model } from '../../../models/tx-registro-equipo-detalle6.model';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { CompartidoLocalService } from '../../../../modulo-compartido/services/compartido-local.service';
import { RegistroEquipoLocalService } from '../../../services/registro-equipo-local.service';
import { EquipoModel } from '../../../../modulo-compartido/models/equipo.model';
import { Subscription } from 'rxjs';
import { FunctionDBLocalService } from '../../../../modulo-base-datos-local/services/function-dblocal.service';
import { Router } from '@angular/router';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';

@Component({
  selector: 'app-registro-equipo-create',
  templateUrl: './registro-equipo-create.component.html',
  styleUrls: ['./registro-equipo-create.component.css']
})
export class RegistroEquipoCreateComponent implements OnInit, OnDestroy {

  subscription$: Subscription;

  // Titulo del componente
  titulo = 'Registro de Equipo Nro:';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemModelo: SelectItem[];

  // Listas Armadas
  listMP: SelectItem[];
  listRFC: SelectItem[];

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

  // Selected Combo del detalle 2
  selectedMP: any;
  selectedRFC: any;

  displayNuevoRepuesto: boolean = false;

  repuestosNoPredeterminado: SelectItem[];

  selectedRepuesto: string[];

  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private functionDBLocalService: FunctionDBLocalService,
              private router: Router) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] },
                    { label: 'Nuevo registro de equipo'}
                ]);
              }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  ngOnInit(): void {

    this.listMP = [
      {label: 'Perdido', value: 'P'},
      {label: 'Malogrado', value: 'M'}
    ];

    this.listRFC = [
      {label: 'Reparado', value: 'R'},
      {label: 'Fabricado', value: 'F'},
      {label: 'Comprado', value: 'C'}
    ];

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

  getOnChangeEmpresa() {
    if (this.selectedEmpresa !== null) {
      this.getToObtienePlantaPorEmpresa(this.selectedEmpresa.value);
    } else {
      this.listItemPlanta = [];
    }
  }

  getToObtienePlantaPorEmpresa(value: string) {
    this.modeloPlanta.codigoEmpresa = value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoService.getPlantaPorEmpresa(this.modeloPlanta)
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
    });
  }

  getToObtieneModelo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.getModelo(this.modeloModelo)
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.codigoModelo });
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
    let codigoEmpresa: string = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    let codigoPlanta: string = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    let codigoModelo: string = this.selectedModelo === null ? '' : this.selectedModelo.value;

    if ( codigoEmpresa !== '' && codigoPlanta !== '' && codigoModelo !== '')
    {
      this.registroEquipoService.getTxRegistroEquipoNewItem(codigoEmpresa, codigoPlanta, codigoModelo)
      .subscribe(resp => {
        if (resp) {
          this.modeloItem  = resp;
          console.log(this.modeloItem );
          this.updateRowGroupMetaData();
          this.updateRowGroupMetaDataDetalle2();
          this.onLlenarRepuestoNoPredeterminado();
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
    }
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.modeloItem.txRegistroEquipoDetalle1) {
      for (let i = 0; i < this.modeloItem.txRegistroEquipoDetalle1.length; i++) {
        let rowData = this.modeloItem.txRegistroEquipoDetalle1[i];
        let brand = rowData.descripcion;
        if (i === 0) {
            this.rowGroupMetadata[brand] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.modeloItem.txRegistroEquipoDetalle1[i - 1];
          let previousRowGroup = previousRowData.descripcion;
          if ( brand === previousRowGroup )
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

  onLlenarRepuestoNoPredeterminado() {
    this.repuestosNoPredeterminado = [];

    this.modeloItem.txRegistroEquipoDetalle2NoPredeterminado.forEach( repu => {
      if (!this.repuestosNoPredeterminado.find( r => r.value === repu.codigoRepuesto) ) {
        this.repuestosNoPredeterminado.push({ label: repu.codigoRepuesto, value: repu.codigoRepuesto });
      }
    });
  }

  onInsertarRepuesto() {
    this.selectedRepuesto.forEach( (sel: any) => {
      for (let item of this.modeloItem.txRegistroEquipoDetalle2NoPredeterminado.filter( x => x.codigoRepuesto === sel.value)) {
        this.modeloItem.txRegistroEquipoDetalle2.push(item);
      }

      this.modeloItem.txRegistroEquipoDetalle2NoPredeterminado =
      [...this.modeloItem.txRegistroEquipoDetalle2NoPredeterminado.filter( y => y.codigoRepuesto !== sel.value)];
    });
    this.onLlenarRepuestoNoPredeterminado();
    this.updateRowGroupMetaDataDetalle2();
    this.displayNuevoRepuesto = false;
  }

  onTabOpen(event: any) {
    if (event.index === 3 || event.index === 5){
      let v = this.modeloItem.txRegistroEquipoDetalle2.filter(x => x.flgValor === false);

      if (this.modeloItem.txRegistroEquipoDetalle5 === null) {
        this.modeloItem.txRegistroEquipoDetalle5 = [];
        this.modeloItem.txRegistroEquipoDetalle6Repuestos = [];
      } else  {
        let cloneRevisionDetalle5 = [...this.modeloItem.txRegistroEquipoDetalle5];
        this.modeloItem.txRegistroEquipoDetalle5 = [];

        let cloneRevisionDetalle6 = [...this.modeloItem.txRegistroEquipoDetalle6Repuestos];
        this.modeloItem.txRegistroEquipoDetalle6Repuestos = [];

        // Removeremos los registros que han sido deseleccionados
        for (let i = 0; i < cloneRevisionDetalle5.length; i++) {
          let rowDataRemove =  cloneRevisionDetalle5[i];
          let rowPrimaryKeyRemove = rowDataRemove.idRepuestoPorModelo;
          let findExistsRemove = v.find(xFind => xFind.idRepuestoPorModelo === rowPrimaryKeyRemove);
          if ( findExistsRemove ) {
            this.modeloItem.txRegistroEquipoDetalle5.push(rowDataRemove);
          }
        }

        for (let i = 0; i < cloneRevisionDetalle6.length; i++) {
          let rowDataRemove6 =  cloneRevisionDetalle6[i];
          let rowPrimaryKeyRemove6 = rowDataRemove6.codigoRepuesto;
          let findExistsRemove6 = v.find(xFind => xFind.codigoRepuesto === rowPrimaryKeyRemove6);
          if ( findExistsRemove6 ) {
            this.modeloItem.txRegistroEquipoDetalle6Repuestos.push(rowDataRemove6);
          }
        }
      }

      for (let i = 0; i < v.length; i++) {
        let rowData = v[i];
        let rowPrimaryKey = rowData.idRepuestoPorModelo;
        let rowPrimaryKeyRepuesto = rowData.codigoRepuesto;

        // Buscamos si existe el registro para no perder la observacion ingresado.
        let findExists = this.modeloItem.txRegistroEquipoDetalle5.find(xFind => xFind.idRepuestoPorModelo === rowPrimaryKey);

        let findExistsRepuesto =
        this.modeloItem.txRegistroEquipoDetalle6Repuestos.find(xFind => xFind.codigoRepuesto === rowPrimaryKeyRepuesto);

        if (!findExists) {
          let detalle5: TxRegistroEquipoDetalle5Model = {
            idRegistroEquipoDetalle: rowData.idRegistroEquipoDetalle,
            idRegistroEquipo: rowData.idRegistroEquipo,
            idRepuestoPorModelo: rowData.idRepuestoPorModelo,
            codigoRepuesto: rowData.codigoRepuesto,
            codigoEquipo: rowData.codigoEquipo,
            descripcion: rowData.descripcion
          };
          this.modeloItem.txRegistroEquipoDetalle5.push(detalle5);
        }

        if (!findExistsRepuesto) {
          let detalle6Repuesto: TxRegistroEquipoDetalle6Model = {
            idRegistroEquipoDetalle: rowData.idRegistroEquipoDetalle,
            idRegistroEquipo: rowData.idRegistroEquipo,
            codigoRepuesto: rowData.codigoRepuesto,
            descripcion: rowData.descripcion,
            stockActual: 0,
            cambioPorMantenimiento: 0,
            entregado: 0
          };
          this.modeloItem.txRegistroEquipoDetalle6Repuestos.push(detalle6Repuesto);
        }
      }

      if (this.modeloItem.txRegistroEquipoDetalle6 === null) {
        this.modeloItem.txRegistroEquipoDetalle6 = [];
      } else {

      }

    }
  }

  // Eventos del Detalle 5
  onRowEditInitDetalle5(modelo: TxRegistroEquipoDetalle5Model) {
    this.modelocloned[modelo.idRepuestoPorModelo] = {...modelo};
  }

  onRowEditSaveDetalle5(modelo: TxRegistroEquipoDetalle5Model) {
  }

  onRowEditCancelDetalle5(modelo: TxRegistroEquipoDetalle5Model, index: number) {
    this.modeloItem.txRegistroEquipoDetalle5[index] = this.modelocloned[modelo.idRepuestoPorModelo];
    delete this.modelocloned[modelo.idRepuestoPorModelo];
  }

  // Eventos del Detalle 6
  onRowEditInitDetalle6(modelo: TxRegistroEquipoDetalle6Model) {
    this.modeloclonedDetalle6[modelo.codigoRepuesto] = {...modelo};
  }

  onRowEditSaveDetalle6(modelo: TxRegistroEquipoDetalle6Model) {
  }

  onRowEditCancelDetalle6(modelo: TxRegistroEquipoDetalle6Model, index: number) {
    this.modeloItem.txRegistroEquipoDetalle6[index] = this.modeloclonedDetalle6[modelo.codigoRepuesto];
    delete this.modeloclonedDetalle6[modelo.codigoRepuesto];
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

  onToGrabar() {

    if (this.modeloItem.firmaIncuba === '') {
      this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, `Ingresar ${this.globalConstants.cFirma1}`);
      return;
    }

    if (this.modeloItem.firmaPlanta === '') {
      this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, `Ingresar ${this.globalConstants.cFirma2}`);
      return;
    }

    this.subscription$ = new Subscription();
    this.subscription$  = this.registroEquipoService.setInsertTxRegistroEquipo( this.modeloItem )
    .subscribe(() =>  {
      this.back();
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-registro-equipo']);
  }
}
