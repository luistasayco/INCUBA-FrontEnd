import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { TxRegistroEquipoModel } from '../../models/tx-registro-equipo.model';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng';
import { EmpresaModel } from '../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../modulo-compartido/models/modelo.model';
import { CompartidoService } from '../../../modulo-compartido/services/compartido.service';
import { LanguageService } from '../../../../services/language.service';
import { UtilService } from '../../../modulo-compartido/services/util.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { RegistroEquipoLocalService } from '../../services/registro-equipo-local.service';
import { CompartidoLocalService } from '../../../modulo-compartido/services/compartido-local.service';
import { Subscription, Observable } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { variable_global } from '../../../../interface/variable-global.interface';

@Component({
  selector: 'app-panel-registro-equipo',
  templateUrl: './panel-registro-equipo.component.html',
  styleUrls: ['./panel-registro-equipo.component.css']
})
export class PanelRegistroEquipoComponent implements OnInit, OnDestroy {

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
  modeloFind: TxRegistroEquipoModel = new TxRegistroEquipoModel();
  listModelo: TxRegistroEquipoModel[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  constructor(private registroEquipoService: RegistroEquipoService,
              private registroEquipoLocalService: RegistroEquipoLocalService,
              private compartidoService: CompartidoService,
              private compartidoLocalService: CompartidoLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Modulo' },
        { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] }
    ]);
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedModelo = null;

    this.modeloFind.fecRegistroInicio = new Date();
    this.modeloFind.fecRegistroFin = new Date();

    this.getToObtieneEmpresa();
    this.getToObtieneModelo();

    this.columnas = [
      { field: 'idRegistroEquipo', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'codigoPlanta', header: 'Planta' },
      { field: 'idModelo', header: 'Modelo' }
    ];
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
    // this.onListar();
  }

  getOnChangePlanta(){
    // this.onListar();
  }

  onListar() {
    console.log('ESTADO_INTERNET', variable_global.ESTADO_INTERNET);
    this.modeloFind.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.modeloFind.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    this.modeloFind.codigoModelo = this.selectedModelo === null ? '' : this.selectedModelo.value;
    let newObserva: Observable<any>;
    this.subscription$ = new Subscription();
    if (variable_global.ESTADO_INTERNET) {
      newObserva = this.registroEquipoService.getTxRegistroEquipo(this.modeloFind);
    } else {
      newObserva = this.registroEquipoService.getTxRegistroEquipo(this.modeloFind);
    }
    this.subscription$ = newObserva.subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToCreate() {
    this.router.navigate(['/main/module-re/create-registro-equipo']);
  }

  onToUpdate(idRegistroEquipo: number) {
    this.router.navigate(['/main/module-re/update-registro-equipo', idRegistroEquipo]);
  }
}
