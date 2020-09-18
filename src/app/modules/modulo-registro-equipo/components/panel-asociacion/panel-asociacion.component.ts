import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng';
import { CompartidoService } from 'src/app/modules/modulo-compartido/services/compartido.service';
import { EmpresaModel } from 'src/app/modules/modulo-compartido/models/empresa.model';
import { PlantaModel } from 'src/app/modules/modulo-compartido/models/planta.model';
import { ModeloModel } from '../../models/modelo.model';
import { EquipoPorModeloModel } from '../../models/equipo-por-modelo.model';
import { environment } from 'src/environments/environment';
import { MantenimientoPorModeloModel } from '../../models/mantenimiento-por-modelo.model';
import { RepuestoPorModeloModel } from '../../models/repuesto-por-modelo.model';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-panel-asociacion',
  templateUrl: './panel-asociacion.component.html',
  styleUrls: ['./panel-asociacion.component.css']
})
export class PanelAsociacionComponent implements OnInit {

  // Titulo del componente
  titulo = 'Asociación';

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
  modeloEquipoPorModelo: EquipoPorModeloModel = new EquipoPorModeloModel();
  modeloMantenimientoPorModelo: MantenimientoPorModeloModel = new MantenimientoPorModeloModel();
  modeloRepuestoPorModelo: RepuestoPorModeloModel = new RepuestoPorModeloModel();

  listEquipoSeleccionado: EquipoPorModeloModel[];
  listEquipoPorSeleccionado: EquipoPorModeloModel[];
  listMantenimientoSeleccionado: MantenimientoPorModeloModel[];
  listMantenimientoPorSeleccionado: MantenimientoPorModeloModel[];
  listRepuestoSeleccionado: RepuestoPorModeloModel[];
  listRepuestoPorSeleccionado: RepuestoPorModeloModel[];


  sourceCars: any[];

  targetCars: any[];

  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
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

    this.registroEquipoService.getCarsSmall().then(cars => this.sourceCars = cars);
    this.targetCars = [];
    this.listEquipoPorSeleccionado = [];
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

    this.listEquipoPorSeleccionado = [];
    this.listEquipoSeleccionado = [];

    this.listMantenimientoSeleccionado = [];
    this.listMantenimientoPorSeleccionado = [];

    this.listRepuestoSeleccionado = [];
    this.listRepuestoPorSeleccionado = [];

    if (this.selectedEmpresa !== null && this.selectedPlanta !== null && (this.selectedModelo !== null) ) {
      this.modeloEquipoPorModelo =
      { codigoEmpresa: this.selectedEmpresa.value,
        codigoPlanta: this.selectedPlanta.value,
        idModelo: this.selectedModelo.value
      };

      this.modeloMantenimientoPorModelo =
      { codigoEmpresa: this.selectedEmpresa.value,
        codigoPlanta: this.selectedPlanta.value,
        idModelo: this.selectedModelo.value
      };

      this.modeloRepuestoPorModelo =
      { codigoEmpresa: this.selectedEmpresa.value,
        codigoPlanta: this.selectedPlanta.value,
        idModelo: this.selectedModelo.value
      };

      this.registroEquipoService.getEquipoPorSeleccionar(this.modeloEquipoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listEquipoPorSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.registroEquipoService.getEquipoSeleccionados(this.modeloEquipoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listEquipoSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.registroEquipoService.getMantenimientoPorSeleccionar(this.modeloMantenimientoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listMantenimientoPorSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.registroEquipoService.getMantenimientoSeleccionados(this.modeloMantenimientoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listMantenimientoSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.registroEquipoService.getRepuestoPorSeleccionar(this.modeloRepuestoPorModelo)
      .subscribe(resp => {
        if (resp) {
            this.listRepuestoPorSeleccionado = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );

      this.registroEquipoService.getRepuestoSeleccionados(this.modeloRepuestoPorModelo)
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

  onToMoveToTarget(event: EquipoPorModeloModel[])
  {
    this.setCreateItem(event);
  }

  onToMoveToSource(event: any)
  {
    this.setDeleteItem(event);
  }

  onToMoveAllToTarget(event: any)
  {
    this.setCreateItem(event);
  }

  onToMoveAllToSource(event: any)
  {
    this.setDeleteItem(event);
  }

  setCreateItem(event: EquipoPorModeloModel[]) {

    event.map(dato => {
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    this.registroEquipoService.setInsertEquipoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItem(event: EquipoPorModeloModel[]) {

    event.map(dato => {
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    this.registroEquipoService.setDeleteEquipoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onToMoveToTargetMantenimiento(event: EquipoPorModeloModel[])
  {
    this.setCreateItemMantenimiento(event);
  }

  onToMoveToSourceMantenimiento(event: any)
  {
    this.setDeleteItemMantenimiento(event);
  }

  onToMoveAllToTargetMantenimiento(event: any)
  {
    this.setCreateItemMantenimiento(event);
  }

  onToMoveAllToSourceMantenimiento(event: any)
  {
    this.setDeleteItemMantenimiento(event);
  }

  setCreateItemMantenimiento(event: MantenimientoPorModeloModel[]) {

    event.map(dato => {
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    this.registroEquipoService.setInsertMantenimientoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItemMantenimiento(event: MantenimientoPorModeloModel[]) {

    event.map(dato => {
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    this.registroEquipoService.setDeleteMantenimientoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onToMoveToTargetRepuesto(event: EquipoPorModeloModel[])
  {
    this.setCreateItemRepuesto(event);
  }

  onToMoveToSourceRepuesto(event: any)
  {
    this.setDeleteItemRepuesto(event);
  }

  onToMoveAllToTargetRepuesto(event: any)
  {
    this.setCreateItemRepuesto(event);
  }

  onToMoveAllToSourceRepuesto(event: any)
  {
    this.setDeleteItemRepuesto(event);
  }

  setCreateItemRepuesto(event: RepuestoPorModeloModel[]) {

    event.map(dato => {
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    this.registroEquipoService.setInsertRepuestoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItemRepuesto(event: RepuestoPorModeloModel[]) {

    event.map(dato => {
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    console.log(event);

    this.registroEquipoService.setDeleteRepuestoPorModelo(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

}
