import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { TxRegistroEquipoModel } from '../../../models/tx-registro-equipo.model';
import { TxRegistroEquipoDetalle5Model } from '../../../models/tx-registro-equipo-detalle5.model';
import { TxRegistroEquipoDetalle6Model } from '../../../models/tx-registro-equipo-detalle6.model';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { RepuestoPorModeloModel } from '../../../models/repuesto-por-modelo.model';
import { PlantaPorUsuarioModel } from '../../../../modulo-seguridad/models/planta-por-usuario';

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

  modeloPlanta: PlantaModel = new PlantaModel();
  modeloModelo: ModeloModel = new ModeloModel();

  modeloItem: TxRegistroEquipoModel = new TxRegistroEquipoModel();

  rowGroupMetadata: any;
  rowGroupMetadataDetalle2: any;

  columnasDetalle5: any[];
  columnasDetalle6: any[];
  columnasRepuestoNoPredeterminado: any[];

  // Opcion Editar
  modelocloned: { [s: string]: TxRegistroEquipoDetalle5Model; } = {};
  modeloclonedDetalle6: { [s: string]: TxRegistroEquipoDetalle6Model; } = {};

  listClonedDetalle6Repuesto: TxRegistroEquipoDetalle6Model[];
  listRespuestoPorModelo: RepuestoPorModeloModel[];
  selectRespuestoNoPredeterminado: RepuestoPorModeloModel[];

  // Selected Combo del detalle 2
  selectedMP: any;
  selectedRFC: any;

  displayNuevoRepuesto: boolean = false;
  displayNuevoInventarioRepuesto: boolean;

  repuestosNoPredeterminado: SelectItem[];
  nuevoRepuestosNoPredeterminado: SelectItem[];

  selectedRepuesto: string[];

  selectedNuveoRepuesto: any[];

  displaySave: boolean;

  displayGenerandoInformacion: boolean;
  mensajeGenerandoInformacion: string;

  displaySeleccionRepuestoNoPredeterminado: boolean;

  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private router: Router,
              private userContextService: UserContextService,
              private utilService: UtilService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Registro Equipo' },
                    { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.mensajeGenerandoInformacion = 'Generando Informacion...!!!';
    this.listClonedDetalle6Repuesto = [];
    this.selectedNuveoRepuesto = [];
    this.listRespuestoPorModelo = [];
    this.selectRespuestoNoPredeterminado = [];
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

    this.columnasRepuestoNoPredeterminado = [
      { header: 'Codigo', field: 'codigoRepuesto' },
      { header: 'Descripción', field: 'descripcion'}
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
    this.subscription$ = this.seguridadService.getEmpresaConAccesoPorUsuario()
    .subscribe((data: EmpresaPorUsuarioModel[]) => {
      this.listItemEmpresa = [];
      for (let item of data) {
        this.listItemEmpresa.push({ label: item.descripcionEmpresa, value: item.codigoEmpresa });
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
    this.subscription$ = new Subscription();
    this.subscription$ = this.seguridadService.getPlantaConAccesoPorUsuarioPorEmpresa(value)
    .subscribe((data: PlantaPorUsuarioModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcionPlanta, value: item.codigoPlanta });
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
    this.getOnRepuestoPorModelo();
  }

  getOnChangePlanta(){
    this.onListar();
  }

  getOnRepuestoPorModelo() {

    let codigoModelo: string = this.selectedModelo === null ? '' : this.selectedModelo.value;
    if (codigoModelo !=='') {
      let vModelo: RepuestoPorModeloModel = {codigoModelo: codigoModelo}
      this.subscription$ = new Subscription();
      this.subscription$ = this.registroEquipoService.getRepuestoSeleccionados(vModelo)
      .subscribe((data: RepuestoPorModeloModel[]) => {
        this.listRespuestoPorModelo = [];
        this.listRespuestoPorModelo = [...data].filter(xFila => xFila.flgAccesorio === false && xFila.flgPredeterminado === false);
      });
    }
    
  }

  onListar() {
    let codigoEmpresa: string = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    let codigoPlanta: string = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    let codigoModelo: string = this.selectedModelo === null ? '' : this.selectedModelo.value;

    if ( codigoEmpresa !== '' && codigoPlanta !== '' && codigoModelo !== '')
    {
      this.displayGenerandoInformacion = true;
      this.subscription$ = new Subscription();
      this.subscription$ = this.registroEquipoService.getTxRegistroEquipoNewItem(codigoEmpresa, codigoPlanta, codigoModelo)
      .subscribe(resp => {
        if (resp) {
          this.modeloItem  = resp;

          this.modeloItem.responsableIncuba = this.userContextService.getNombreCompletoUsuario();
          this.modeloItem.emailFrom = this.userContextService.getEmail();
          this.mensajeGenerandoInformacion = 'Generando Informacion - A.- Detalle de Mantenimiento...!!!';
          this.updateRowGroupMetaData();
          this.mensajeGenerandoInformacion = 'Generando Informacion - B.- Check List de componentes...!!!';
          this.updateRowGroupMetaDataDetalle2();
          this.onLlenarRepuestoNoPredeterminado();
          this.listClonedDetalle6Repuesto = this.modeloItem.txRegistroEquipoDetalle6Repuestos;
          // this.onLlenarInventarioRepuestoNoPredeterminado();
          this.modeloItem.txRegistroEquipoDetalle6Repuestos = [];
          }
          this.mensajeGenerandoInformacion = 'Generando Informacion...!!!';
          this.displayGenerandoInformacion = false;
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
          this.displayGenerandoInformacion = false;
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
        this.repuestosNoPredeterminado.push({ label: repu.codigoRepuesto + '-' + repu.descripcion, value: repu.codigoRepuesto });
      }
    });
  }

  onLlenarInventarioRepuestoNoPredeterminado() {
    this.nuevoRepuestosNoPredeterminado = [];

    this.listClonedDetalle6Repuesto.forEach( repu => {
      if (!this.nuevoRepuestosNoPredeterminado.find( r => r.value === repu.codigoRepuesto) ) {
        this.nuevoRepuestosNoPredeterminado.push({ label: repu.codigoRepuesto + '-' + repu.descripcion, value: repu.codigoRepuesto });
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


  onInsertarInventarioRepuesto() {

    this.modeloItem.txRegistroEquipoDetalle6Repuestos = [];

    if (this.selectedNuveoRepuesto.length > 0 ) {
      
    }

    this.displayNuevoInventarioRepuesto = false;
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
          rowDataRemove.idKeys = rowDataRemove.codigoRepuesto + rowDataRemove.codigoEquipo;
          let rowPrimaryKeyRemove = rowDataRemove.idKeys;
          let findExistsRemove = v.filter(xFind => xFind.codigoRepuesto + xFind.codigoEquipo === rowPrimaryKeyRemove).length;
          if ( findExistsRemove > 0 ) {

            this.modeloItem.txRegistroEquipoDetalle5.push(rowDataRemove);
          }
        }

        for (let i = 0; i < cloneRevisionDetalle6.length; i++) {
          let rowDataRemove6 =  cloneRevisionDetalle6[i];
          let rowPrimaryKeyRemove6 = rowDataRemove6.codigoRepuesto;
          let findExistsRemove6 = v.filter(xFind => xFind.codigoRepuesto === rowPrimaryKeyRemove6).length;
          if ( findExistsRemove6 > 0 ) {
            this.modeloItem.txRegistroEquipoDetalle6Repuestos.push(rowDataRemove6);
          }
        }
      }
      
      for (let i = 0; i < v.length; i++) {
        let rowData = v[i];
        let rowPrimaryKey = rowData.codigoRepuesto + rowData.codigoEquipo;
        let rowPrimaryKeyRepuesto = rowData.codigoRepuesto;

        // Buscamos si existe el registro para no perder la observacion ingresado.
        let findExists = this.modeloItem.txRegistroEquipoDetalle5.find(xFind => xFind.idKeys === rowPrimaryKey);

        let findExistsRepuesto =
        this.modeloItem.txRegistroEquipoDetalle6Repuestos.find(xFind => xFind.codigoRepuesto === rowPrimaryKeyRepuesto);

        if (!findExists) {
          let detalle5: TxRegistroEquipoDetalle5Model = {
            idRegistroEquipoDetalle: rowData.idRegistroEquipoDetalle,
            idRegistroEquipo: rowData.idRegistroEquipo,
            idRepuestoPorModelo: rowData.idRepuestoPorModelo,
            codigoRepuesto: rowData.codigoRepuesto,
            codigoEquipo: rowData.codigoEquipo,
            descripcion: rowData.descripcion,
            idKeys: rowData.codigoRepuesto + rowData.codigoEquipo
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
    this.modelocloned[modelo.idKeys] = {...modelo};
  }

  onRowEditSaveDetalle5(modelo: TxRegistroEquipoDetalle5Model) {
  }

  onRowEditCancelDetalle5(modelo: TxRegistroEquipoDetalle5Model, index: number) {
    this.modeloItem.txRegistroEquipoDetalle5[index] = this.modelocloned[modelo.idKeys];
    delete this.modelocloned[modelo.idKeys];
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

  onGrabarRespuestoNopredeterminado() {
    if (this.selectRespuestoNoPredeterminado.length !== 0) {

      this.selectRespuestoNoPredeterminado.forEach(xFila => {
        let detalle6Repuesto: TxRegistroEquipoDetalle6Model = {
          idRegistroEquipoDetalle: 0,
          idRegistroEquipo: 0,
          codigoRepuesto: xFila.codigoRepuesto,
          descripcion: xFila.descripcion,
          stockActual: 0,
          cambioPorMantenimiento: 0,
          entregado: 0
        };
        this.modeloItem.txRegistroEquipoDetalle6Repuestos.push(detalle6Repuesto);
      });
    }
    this.displaySeleccionRepuestoNoPredeterminado = false;
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

    if (this.modeloItem.responsablePlanta === '') {
      this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, `Ingresar Responsable de Planta`);
      return;
    }

    if (this.modeloItem.emailTo === '') {
      this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, `Ingresar Email de Planta`);
      return;
    }
    console.log('this.modeloItem.emailTo', this.modeloItem.emailTo);
    let msgList = this.utilService.validaListEmail(this.modeloItem.emailTo);

    if (msgList !== '') {
      this.mensajePrimeNgService.onToInfoMsg('Revisar Email Invalidos..', msgList);
      return;
    }
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.modeloItem.flgCerrado = false;
    this.subscription$  = this.registroEquipoService.setInsertTxRegistroEquipo( this.modeloItem )
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
}
