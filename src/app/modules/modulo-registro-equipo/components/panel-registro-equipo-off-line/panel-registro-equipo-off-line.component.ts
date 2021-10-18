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
import { Subscription } from 'rxjs';
import { UtilService } from '../../../modulo-compartido/services/util.service';
import { ButtonAcces } from '../../../../models/acceso-button';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { UserContextService } from '../../../../services/user-context.service';

@Component({
  selector: 'app-panel-registro-equipo-off-line',
  templateUrl: './panel-registro-equipo-off-line.component.html',
  styleUrls: ['./panel-registro-equipo-off-line.component.css']
})
export class PanelRegistroEquipoOffLineComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Registros de Equipos (Offline)';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
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

  displayDatosCierre: boolean;

  modeloDatosCierre: TxRegistroEquipoModel  = new TxRegistroEquipoModel();

  constructor(private registroEquipoLocalService: RegistroEquipoLocalService,
              private compartidoLocalService: CompartidoLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private confirmationService: ConfirmationService,
              private utilService: UtilService,
              private menuDinamicoService: MenuDinamicoService,
              private userContextService: UserContextService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Registro Equipo' },
        { label: 'Registro de Equipo (Offline)', routerLink: ['module-re/panel-registro-equipo-offline'] }
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
      { field: 'idModelo', header: 'Modelo' },
      { field: 'UsuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-registro-equipo-off-line')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

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
    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }
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

    let dataClone = {...data};
    let usuario =  this.userContextService.getUsuario();

    data.flgCerrado = true;
    data.fecCierre = this.utilService.fechaApi_POST();
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.usuarioCierre = usuario;

    this.subscription$ = this.registroEquipoLocalService.setUpdateTxRegistroEquipo(data)
    .subscribe(resp => {
      if (resp) {

        this.listModelo.find((x: any) => x.id === data.id).flgCerrado = true;
        this.listModelo.find((x: any) => x.id === data.id).fecCierre = this.utilService.fechaApi_POST();
        this.listModelo.find((x: any) => x.id === data.id).usuarioCierre = usuario;

        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        }
      },
      (error) => {
        this.listModelo.find((x: any) => x.id === data.id).flgCerrado = false;
        this.listModelo.find((x: any) => x.id === data.id).fecCierre = null;
        this.listModelo.find((x: any) => x.id === data.id).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: any) {
    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }
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
    // data.flgEnModificacion = true;
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
    this.onListar();
    }, 60000);
  }

  onDatosCierre(data: TxRegistroEquipoModel) {
    this.displayDatosCierre = true;

    this.modeloDatosCierre = data;
  }

}
