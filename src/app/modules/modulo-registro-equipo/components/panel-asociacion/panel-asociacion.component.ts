import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { CompartidoService } from 'src/app/modules/modulo-compartido/services/compartido.service';
import { EmpresaModel } from 'src/app/modules/modulo-compartido/models/empresa.model';
import { PlantaModel } from 'src/app/modules/modulo-compartido/models/planta.model';
import { ModeloModel } from '../../models/modelo.model';
import { EquipoPorModeloModel } from '../../models/equipo-por-modelo.model';
import { environment } from 'src/environments/environment';
import { MantenimientoPorModeloModel } from '../../models/mantenimiento-por-modelo.model';
import { RepuestoPorModeloModel } from '../../models/repuesto-por-modelo.model';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng';
import { ButtonAcces } from '../../../../models/acceso-button';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';

@Component({
  selector: 'app-panel-asociacion',
  templateUrl: './panel-asociacion.component.html',
  styleUrls: ['./panel-asociacion.component.css']
})
export class PanelAsociacionComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Asociación';
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

  modeloPlanta: PlantaModel = new PlantaModel();
  modeloModelo: ModeloModel = new ModeloModel();
  modeloEquipoPorModelo: EquipoPorModeloModel = new EquipoPorModeloModel();
  modeloMantenimientoPorModelo: MantenimientoPorModeloModel = new MantenimientoPorModeloModel();
  modeloRepuestoPorModelo: RepuestoPorModeloModel = new RepuestoPorModeloModel();

  listEquipoSeleccionado: EquipoPorModeloModel[];
  listEquipoPorSeleccionado: EquipoPorModeloModel[];
  listMantenimientoSeleccionado: MantenimientoPorModeloModel[];
  listMantenimientoPorSeleccionado: MantenimientoPorModeloModel[];
  listRepuestoSeleccionado: RepuestoPorModeloModel[];
  listRepuestoPorSeleccionado: RepuestoPorModeloModel[];

  subscription: Subscription;

  sourceCars: any[];

  targetCars: any[];

  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService,
              private seguridadService: SeguridadService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Asociación', routerLink: ['module-re/panel-asociacion'] }
                ]);
              }

  ngOnInit(): void {

    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedModelo = null;

    this.getToObtieneEmpresa();
    this.getToObtieneModelo();

    this.listEquipoPorSeleccionado = [];

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-asociacion')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  getToObtieneEmpresa() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getEmpresaConAccesoPorUsuario()
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
    this.modeloPlanta.codigoEmpresa = value;
    this.subscription = new Subscription();
    this.subscription = this.compartidoService.getPlantaPorEmpresa(this.modeloPlanta)
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
      });
  }

  getToObtieneModelo() {
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.getModelo(this.modeloModelo)
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.codigoModelo });
      }
      });
  }

  getOnChangeModelo() {
    this.onListar();
    this.onListarChangeModelo();
  }

  getOnChangePlanta(){
    this.onListar();
  }

  onListar() {

    this.listEquipoPorSeleccionado = [];
    this.listEquipoSeleccionado = [];

    if (this.selectedEmpresa !== null && this.selectedPlanta !== null && (this.selectedModelo !== null) ) {
      this.modeloEquipoPorModelo =
      { codigoEmpresa: this.selectedEmpresa.value,
        codigoPlanta: this.selectedPlanta.value,
        codigoModelo: this.selectedModelo.value
      };

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getEquipoSeleccionados(this.modeloEquipoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listEquipoSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
    }
  }

  onListarChangeModelo() {

    this.listMantenimientoSeleccionado = [];
    this.listMantenimientoPorSeleccionado = [];

    this.listRepuestoSeleccionado = [];
    this.listRepuestoPorSeleccionado = [];

    if (this.selectedModelo !== null) {

      this.modeloMantenimientoPorModelo = {codigoModelo: this.selectedModelo.value};

      this.modeloRepuestoPorModelo = {codigoModelo: this.selectedModelo.value};

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getMantenimientoPorSeleccionar(this.modeloMantenimientoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listMantenimientoPorSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getMantenimientoSeleccionados(this.modeloMantenimientoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listMantenimientoSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getRepuestoPorSeleccionar(this.modeloRepuestoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listRepuestoPorSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getRepuestoSeleccionados(this.modeloRepuestoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listRepuestoSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
    }
  }

  onToMoveToTargetMantenimiento(event: MantenimientoPorModeloModel[])
  {
    this.setCreateItemMantenimiento(event);
  }

  onToMoveToSourceMantenimiento(event: MantenimientoPorModeloModel[])
  {
    this.setDeleteItemMantenimiento(event);
  }

  onToMoveAllToTargetMantenimiento(event: MantenimientoPorModeloModel[])
  {
    this.setCreateItemMantenimiento(event);
  }

  onToMoveAllToSourceMantenimiento(event: MantenimientoPorModeloModel[])
  {
    this.setDeleteItemMantenimiento(event);
  }

  setCreateItemMantenimiento(event: MantenimientoPorModeloModel[]) {

    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.setInsertMantenimientoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItemMantenimiento(event: MantenimientoPorModeloModel[]) {
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.setDeleteMantenimientoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onToMoveToTargetRepuesto(event: RepuestoPorModeloModel[])
  {
    this.setCreateItemRepuesto(event);
  }

  onToMoveToSourceRepuesto(event: RepuestoPorModeloModel[])
  {
    this.setDeleteItemRepuesto(event);
  }

  onToMoveAllToTargetRepuesto(event: RepuestoPorModeloModel[])
  {
    this.setCreateItemRepuesto(event);
  }

  onToMoveAllToSourceRepuesto(event: RepuestoPorModeloModel[])
  {
    this.setDeleteItemRepuesto(event);
  }

  setCreateItemRepuesto(event: RepuestoPorModeloModel[]) {
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.setInsertRepuestoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItemRepuesto(event: RepuestoPorModeloModel[]) {
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.setDeleteRepuestoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
