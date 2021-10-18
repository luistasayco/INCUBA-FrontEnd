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
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { SessionService } from '../../../../../services/session.service';
import { ConstantesTablasIDB } from '../../../../../constants/constantes-tablas-indexdb';
import { UserContextService } from '../../../../../services/user-context.service';
import { RepuestoPorModeloModel } from '../../../models/repuesto-por-modelo.model';

@Component({
  selector: 'app-registro-equipo-create-off-line',
  templateUrl: './registro-equipo-create-off-line.component.html',
  styleUrls: ['./registro-equipo-create-off-line.component.css']
})
export class RegistroEquipoCreateOffLineComponent implements OnInit, OnDestroy {

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

  displayNuevoRepuesto = false;

  repuestosNoPredeterminado: SelectItem[];

  selectedRepuesto: string[];

  listImagen: any [];

  displaySeleccionRepuestoNoPredeterminado: boolean;
  listRespuestoPorModelo: RepuestoPorModeloModel[];
  selectRespuestoNoPredeterminado: RepuestoPorModeloModel[];
  columnasRepuestoNoPredeterminado: any[];
  displayControles: boolean;
  constructor(private registroEquipoLocalService: RegistroEquipoLocalService,
              private compartidoLocalService: CompartidoLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private functionDBLocalService: FunctionDBLocalService,
              private router: Router,
              private utilService: UtilService,
              private sessionService: SessionService,
              private userContextService: UserContextService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Registro Equipo' },
                    { label: 'Registro de Equipo (Offline)', routerLink: ['module-re/panel-registro-equipo-offline'] },
                    { label: 'Nuevo'}
                ]);
                window.addEventListener("beforeunload", (event) => {
                  event.preventDefault();
                  event.returnValue = "Unsaved modifications";
                  return event;
               });
              }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.listImagen = [];

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
    this.subscription$ = this.compartidoLocalService.getEmpresa()
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
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoLocalService.getPlantaPorEmpresa()
    .subscribe((data: PlantaModel[]) => {
      let dataFilter = [...data].filter(x => x.codigoEmpresa === value);
      this.listItemPlanta = [];
      for (let item of dataFilter) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
    });
  }

  getToObtieneModelo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoLocalService.getModeloLocal()
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.codigoModelo });
      }
    });
  }

  getOnRepuestoPorModelo() {
    let codigoModelo: string = this.selectedModelo === null ? '' : this.selectedModelo.value;
    
    if (codigoModelo !== '') {
      this.subscription$ = new Subscription();
      this.subscription$ = this.registroEquipoLocalService.getRepuestoPorModelo()
      .subscribe((data: RepuestoPorModeloModel[]) => {
        this.listRespuestoPorModelo = [];
        this.listRespuestoPorModelo = [...data].filter(xFila => xFila.flgAccesorio === false && xFila.flgPredeterminado === false && xFila.codigoModelo === codigoModelo);
      });
    }
    
  }

  getOnChangeModelo() {
    this.onListar();
    this.getOnRepuestoPorModelo();
  }

  getOnChangePlanta(){
    this.onListar();
  }

  onListar() {
    let codigoEmpresa: string = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    let descripcionEmpresa: string = this.selectedEmpresa === null ? '' : this.selectedEmpresa.label;
    let codigoPlanta: string = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    let descripcionPlanta: string = this.selectedPlanta === null ? '' : this.selectedPlanta.label;
    let codigoModelo: string = this.selectedModelo === null ? '' : this.selectedModelo.value;
    let descripcionModelo: string = this.selectedModelo === null ? '' : this.selectedModelo.label;

    if ( codigoEmpresa !== '' && codigoPlanta !== '' && codigoModelo !== '')
    {
      let i = 0;
      let newEquipo: EquipoModel[] = [];
      let newRegistroEquipo = new TxRegistroEquipoModel();
      newRegistroEquipo.idRegistroEquipo = 0;
      newRegistroEquipo.codigoEmpresa = codigoEmpresa;
      newRegistroEquipo.descripcionEmpresa = descripcionEmpresa;
      newRegistroEquipo.codigoPlanta = codigoPlanta;
      newRegistroEquipo.descripcionPlanta = descripcionPlanta;
      newRegistroEquipo.codigoModelo = codigoModelo;
      newRegistroEquipo.descripcionModelo = descripcionModelo;
      newRegistroEquipo.flgCerrado = false;
      
      this.subscription$ = new Subscription();
      this.subscription$ = this.registroEquipoLocalService.getTxRegistroEquipoNewItem(codigoEmpresa, codigoPlanta, codigoModelo)
      .subscribe(resp => {
        switch (i) {
          case 0: {
            newEquipo = resp;
            break;
          }
          case 1: {
            newRegistroEquipo.txRegistroEquipoDetalle1 =
            this.registroEquipoLocalService.setMantenimientoPorModelo(newEquipo, resp, codigoEmpresa, codigoPlanta, codigoModelo);
            break;
          }
          case 2: {
            newRegistroEquipo.txRegistroEquipoDetalle2 =
            this.registroEquipoLocalService.setRepuestoPorModelo(newEquipo, resp, codigoEmpresa, codigoPlanta, codigoModelo);
            newRegistroEquipo.txRegistroEquipoDetalle2NoPredeterminado =
            this.registroEquipoLocalService.setRepuestoPorModeloNoPredeterminado(newEquipo, resp, codigoEmpresa, codigoPlanta, codigoModelo);
            newRegistroEquipo.txRegistroEquipoDetalle6 =
            this.registroEquipoLocalService.setAccesorios(resp);
            break;
          }
          case 3: {
            newRegistroEquipo.txRegistroEquipoDetalle3 =
            this.registroEquipoLocalService.setCondicionLimpieza(resp);
            break;
          }
          case 4: {
            newRegistroEquipo.txRegistroEquipoDetalle4 =
            this.registroEquipoLocalService.setRequerimientoEquipo(resp);

            this.modeloItem  = newRegistroEquipo;
            this.modeloItem.responsableIncuba = this.userContextService.getNombreCompletoUsuario();
            this.modeloItem.emailFrom = this.userContextService.getEmail();
            this.modeloItem.txRegistroEquipoDetalle7 = [];
            this.updateRowGroupMetaData();
            this.updateRowGroupMetaDataDetalle2();
            this.onLlenarRepuestoNoPredeterminado();
            break;
          }
          default: {
            break;
          }
        }
        i =  i + 1;
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
        this.repuestosNoPredeterminado.push({ label: repu.codigoRepuesto + '-' + repu.descripcion, value: repu.codigoRepuesto });
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
  goDisplayControles() {
    this.displayControles = ! this.displayControles;
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

    if (this.modeloItem.emailTo === '') {
      this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, `Ingresar Email de Planta`);
      return;
    }

    let msgList = this.utilService.validaListEmail(this.modeloItem.emailTo);

    if (msgList !== '') {
      this.mensajePrimeNgService.onToInfoMsg('Revisar Email Invalidos..', msgList);
      return;
    }
    
    let usuario =  this.userContextService.getUsuario();

    this.modeloItem.flgMigrado = false;
    this.modeloItem.fecHoraRegistro = this.utilService.fechaApi_POST();
    this.modeloItem.fecRegistro = this.utilService.fechaApi_POST();
    this.modeloItem.usuarioCreacion = usuario;
    this.subscription$ = new Subscription();
    this.subscription$  = this.functionDBLocalService.setNewRegistro(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, this.modeloItem)
    .subscribe(() =>  {
      this.back();
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-registro-equipo-offline']);
  }
}
