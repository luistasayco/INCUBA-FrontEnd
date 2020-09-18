import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-panel-registro-equipo',
  templateUrl: './panel-registro-equipo.component.html',
  styleUrls: ['./panel-registro-equipo.component.css']
})
export class PanelRegistroEquipoComponent implements OnInit {

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

  // // Opcion Editar
  // modelocloned: { [s: string]: TxRegistroEquipoModel; } = {};

  // // Opcion Eliminar
  // modeloEliminar: TxRegistroEquipoModel;

  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Modulo' },
        { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] }
    ]);
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

    // this.onListar();
  }

  onToBuscar() {
    this.onListar();
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
    // this.onListar();
  }

  getOnChangePlanta(){
    // this.onListar();
  }

  onListar() {
    this.modeloFind.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.modeloFind.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    this.modeloFind.idModelo = this.selectedModelo === null ? 0 : this.selectedModelo.value;

    console.log('onListar', this.modeloFind);
    this.registroEquipoService.getTxRegistroEquipo(this.modeloFind)
    .subscribe(resp => {
      if (resp) {
        console.log(resp);
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
