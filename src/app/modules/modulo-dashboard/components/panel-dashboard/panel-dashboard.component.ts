import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SelectItem } from 'primeng';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from 'src/app/modules/modulo-seguridad/models/empresa-por-usuario';
import { PlantaPorUsuarioModel } from 'src/app/modules/modulo-seguridad/models/planta-por-usuario';
import { PlantaModel } from 'src/app/modules/modulo-compartido/models/planta.model';
import { ModeloModel } from 'src/app/modules/modulo-registro-equipo/models/modelo.model';
import { RegistroEquipoService } from 'src/app/modules/modulo-registro-equipo/services/registro-equipo.service';
import { EquipoPorModeloModel } from 'src/app/modules/modulo-registro-equipo/models/equipo-por-modelo.model';
import { EquipoModel } from '../../../modulo-compartido/models/equipo.model';
import { PersonaModel } from '../../../modulo-seguridad/models/persona.model';
import { DashboardMantenimientoService } from '../../services/dashboard-mantenimiento.service';
import { DashboardMantenimientoPorFiltro, DashboardMantenimiento } from '../../models/dashboard-mantenimiento-por-filtro.model';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';

@Component({
  selector: 'app-panel-dashboard',
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.css']
})
export class PanelDashboardComponent implements OnInit, OnDestroy {

  //Titulo del componente
  titulo = 'Dashboard - Mantenimiento';

  //
  globalConstants: GlobalsConstants = new GlobalsConstants();
  
  //Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemModelo: SelectItem[];
  listItemEquipo: SelectItem[];
  listItemTecnico: SelectItem[];
  //Variables de dato seleccionado
  selectedEmpresa: any;
  selectedPlanta: any;
  selectedModelo: any;
  selectedEquipo: any;
  selectedTecnico: any;
  selectedFechaInicio: any;
  selectedFechaFin: any;
 

  //Variables de graficos
  visitasMensualesMantenimientoData: any;
  visitasMensualesMantenimientoOptions: any;
  plantasVisitadasClienteData: any;
  numeroVisitasPlantaData: any;
  mantenimientoTipomaquinaData : any;
  numeroRepuestosPeriodoData: any;
  numeroRepuestosEquipoData: any;

  equipoModel: EquipoModel = new EquipoModel();
  personaModel: PersonaModel = new PersonaModel();
  modeloPlanta: PlantaModel = new PlantaModel();
  modeloModelo: ModeloModel = new ModeloModel();
  modeloEquipoPorModelo: EquipoPorModeloModel = new EquipoPorModeloModel();
  DashboardMantenimientoPorFiltro: DashboardMantenimientoPorFiltro = new DashboardMantenimientoPorFiltro();

  subscription: Subscription;

  // Lista de datos
  listLabel: string[];
  listData: number[];
  
  constructor(private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private registroEquipoService: RegistroEquipoService,
              private dashboardMantenimientoService: DashboardMantenimientoService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard', routerLink: ['/dashboard'] }
    ]);
   }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedModelo = null;
    this.selectedEquipo = null;
    this.selectedTecnico = null;
    this.selectedFechaInicio = new Date();
    this.selectedFechaFin = new Date();

    this.getToObtieneEmpresa();
    this.getToObtieneModelo();
    this.getToObtieneTecnico();


    this.listItemEquipo = [];

    

    this.visitasMensualesMantenimientoOptions = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }

    };

    
  }

  getToObtieneEmpresa(){
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
    }else{
      this.listItemPlanta = [];
    }
  }

  getToObtienePlantaPorEmpresa(value: string) {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPlantaConAccesoPorUsuarioPorEmpresa(value)
    .subscribe((data: PlantaPorUsuarioModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcionPlanta, value: item.codigoPlanta });
      }
      
    });
  }

  getToObtieneModelo(){
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.getModelo(this.modeloModelo)
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.codigoModelo });
      }
    });
  }

  getOnChangeModelo(){
   //this.onListar();
   this.getToObtieneEquipo();
  }

  getOnChangePlanta(){
    //this.onListar();
    this.getToObtieneEquipo();
  }

  getToObtieneEquipo(){

    if (this.selectedEmpresa !== null && this.selectedPlanta !== null && (this.selectedModelo !== null) ) {
      this.modeloEquipoPorModelo =
      { codigoEmpresa: this.selectedEmpresa.value,
        codigoPlanta: this.selectedPlanta.value,
        codigoModelo: this.selectedModelo.value
      };

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getEquipoPorFiltros(this.modeloEquipoPorModelo)
      .subscribe((data: EquipoPorModeloModel[]) => {
        this.listItemEquipo = [];
        for(let item of data){
          this.listItemEquipo.push({ label: item.codigoEquipo, value: item.codigoEquipo});
        }
      }
      );
    }

  }

  getToObtieneTecnico(){

    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPersona(this.personaModel)
    .subscribe((data: PersonaModel[]) => {
      this.listItemTecnico = [];
      for(let item of data){
        if (item.descripcionPerfil == "Técnico") {
          this.listItemTecnico.push({ label: item.nombreCompleto , value: item.idPersona });
        }
      }
    });

  }

  getToListado(tipo: number){
    
    let filtro: DashboardMantenimientoPorFiltro = new  DashboardMantenimientoPorFiltro();
    filtro.fechaInicio = this.selectedFechaInicio;
    filtro.fechaFin = this.selectedFechaFin;
    filtro.tecnico = this.selectedTecnico.value;
    filtro.idDashboard = tipo;
    filtro.empresa = this.selectedEmpresa == null? '' : this.selectedEmpresa.value ;
    filtro.modelo = this.selectedModelo.value;
    filtro.equipo = this.selectedEquipo.value;
    

    this.subscription = new Subscription();
    this.subscription = this.dashboardMantenimientoService.getDashboardMantenimientoPorFiltro(filtro)
    .subscribe((data: DashboardMantenimiento[]) => {
      switch (filtro.idDashboard) {
        case 1:
          this.goLlenarMetodo(data);
          break;

        case 2:
          this.goLlenarMetodo2(data);
          break;

        case 3:
          this.goLlenarMetodo3(data);
          break;

        case 4:
          this.goLlenarMetodo4(data);
          break;

        case 5:
          this.goLlenarMetodo5(data);
          break;
        
        case 6:
          this.goLlenarMetodo6(data);
          break;
      
        default:
          break;
      }
      
      
    });

  }

  getToListadoLlenar(){
    
    this.getToListado(1);
    this.getToListado(2);    
    this.getToListado(3);    
    this.getToListado(4);
    this.getToListado(5);      
    this.getToListado(6);     

  }

  goLlenarMetodo(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.cantidadVisitas);
    });

    this.visitasMensualesMantenimientoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'First Dataset',
        backgroundColor: '#42A5F5',
        data: this.listData}
      
      ]
    };
  }

  goLlenarMetodo2(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombreEmpresa);
      this.listData.push(xFila.cantidadVisitas);
    });

    this.plantasVisitadasClienteData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: [
          '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
          '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
          '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
          '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
        ]
      
        }]
    };
  }

  goLlenarMetodo3(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombrePlanta);
      this.listData.push(xFila.cantidadVisitas);
    });

    this.numeroVisitasPlantaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: [
          '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
          '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
          '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
          '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
        ]
      
        }]
    };
  }

  goLlenarMetodo4(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombreModelo);
      this.listData.push(xFila.cantidadVisitas);
    });

    this.mantenimientoTipomaquinaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: [
          '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
          '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
          '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
          '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
        ]
      
        }]
    };
  }

  goLlenarMetodo5(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombreRepuesto);
      this.listData.push(xFila.cantidadVisitas);
    });

    this.numeroRepuestosPeriodoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: [
          '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
          '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
          '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
          '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
        ]
      
        }]
    };
  }

  goLlenarMetodo6(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombreRepuesto);
      this.listData.push(xFila.cantidadVisitas);
    });

    this.numeroRepuestosEquipoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: [
          '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
          '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
          '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
          '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
        ]
      
        }]
    };
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
