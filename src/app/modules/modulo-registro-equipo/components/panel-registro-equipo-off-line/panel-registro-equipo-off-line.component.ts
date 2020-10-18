import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { TxRegistroEquipoModel } from '../../models/tx-registro-equipo.model';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng';
import { EmpresaModel } from '../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../modulo-compartido/models/modelo.model';
import { LanguageService } from '../../../../services/language.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { RegistroEquipoLocalService } from '../../services/registro-equipo-local.service';
import { CompartidoLocalService } from '../../../modulo-compartido/services/compartido-local.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-panel-registro-equipo-off-line',
  templateUrl: './panel-registro-equipo-off-line.component.html',
  styleUrls: ['./panel-registro-equipo-off-line.component.css']
})
export class PanelRegistroEquipoOffLineComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Registros de Equipos';

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

  // Opcion Buscar
  // descripcionFind = '';
  modeloFind: TxRegistroEquipoModel;
  listModelo: TxRegistroEquipoModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Estado del internet
  isNetwork: boolean;
  interval;
  constructor(private registroEquipoLocalService: RegistroEquipoLocalService,
              private compartidoLocalService: CompartidoLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
        { label: 'Modulo' },
        { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo-offline'] }
    ]);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit() {
    this.modeloFind =  new TxRegistroEquipoModel();
    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedModelo = null;

    // this.getToObtieneEmpresa();
    // this.getToObtieneModelo();

    this.columnas = [
      { field: 'idRegistroEquipo', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'codigoPlanta', header: 'Planta' },
      { field: 'idModelo', header: 'Modelo' }
    ];

    this.onListar();
    this.onUpdateDataVistaUsuario();
  }

  onToBuscar() {
    this.onListar();
  }

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
    this.selectedPlanta = null;
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

  getOnChangeModelo() {
  }

  getOnChangePlanta(){
  }

  onListar() {
    this.listModelo = [];
    this.modeloFind.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.modeloFind.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    this.modeloFind.codigoModelo = this.selectedModelo === null ? '' : this.selectedModelo.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoLocalService.getTxRegistroEquipo()
    .subscribe((resp: TxRegistroEquipoModel[]) => {
      if (resp) {
          let filterData = [...resp].filter(x => x.flgMigrado === false);
          this.listModelo = filterData;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmCerrar(data: any) {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleCierre,
        header: this.globalConstants.titleCierre,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToCerrar(data);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToCerrar(data: any) {
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    this.subscription$ = this.registroEquipoLocalService.setUpdateTxRegistroEquipo(data)
    .subscribe(resp => {
      if (resp) {

        this.listModelo.find((x: any) => x.id === data.id).flgCerrado = true;

        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: any) {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToEliminar(data);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToEliminar(data: any) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoLocalService.setDeleteTxRegistroEquipo(data.id)
    .subscribe(resp => {
      if (resp) {

        this.listModelo = [...this.listModelo].filter((x: any) => x.id !== data.id);

        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToCreate() {
    this.router.navigate(['/main/module-re/create-registro-equipo-offline']);
  }

  onToUpdate(data: any) {

    this.subscription$ = new Subscription();
    data.flgEnModificacion = true;
    this.subscription$ = this.registroEquipoLocalService.setUpdateTxRegistroEquipo(data)
    .subscribe(resp => {
      if (resp) {
          this.router.navigate(['/main/module-re/update-registro-equipo-offline', data.id]);
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onUpdateDataVistaUsuario() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
    console.log('consulta data local');
    this.onListar();
  }, 10000);
  }

}
