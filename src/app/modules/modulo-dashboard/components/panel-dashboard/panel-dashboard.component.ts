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
//import { Label } from 'ng2-charts';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { ButtonAcces } from '../../../../models/acceso-button';
import { PercentPipe } from '@angular/common';
import { plugins } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardModel, DashboardModelPorCategoria } from '../../models/dashboard-model.model';
import { RepuestoPorModeloModel } from 'src/app/modules/modulo-registro-equipo/models/repuesto-por-modelo.model';
import { LanguageService } from '../../../../services/language.service';
import { CompartidoService } from '../../../modulo-compartido/services/compartido.service';

@Component({
  selector: 'app-panel-dashboard',
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.css']
})
export class PanelDashboardComponent implements OnInit, OnDestroy {

  //Titulo del componente
  titulo = 'Dashboard - Mantenimiento';

  //Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();

  //
  globalConstants: GlobalsConstants = new GlobalsConstants();
  
  //Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemModelo: SelectItem[];
  listItemEquipo: SelectItem[];
  listItemTecnico: SelectItem[];
  listItemDashboard: SelectItem[];
  listItemRepuesto: SelectItem[];
  //Variables de dato seleccionado
  selectedEmpresa: any;
  selectedPlanta: any[];
  selectedModelo: any[];
  selectedEquipo: any[];
  selectedTecnico: any[];
  selectedFechaInicio: any;
  selectedFechaFin: any;
  selectedDashboard: any;
  selectedRepuesto: any[];
  //Colores
  

  ColorArray: string[] = [
    "#3366cc","#dc3912","#ff9900","#109618","#990099",
    "#0099c6","#dd4477","#66aa00","#b82e2e","#316395",
    "#3366cc","#994499","#22aa99","#aaaa11","#6633cc",
    "#e67300","#8b0707","#651067","#329262","#5574a6",
    "#3b3eac","#b77322","#16d620","#b91383","#f4359e",
    "#9c5935","#a9c413","#2a778d","#668d1c","#bea413",
    "#0c5922","#743411"
   
  ]
 

  //Variables de graficos
  visitasMensualesMantenimientoData: any;
  barOptions: any;
  pieOptions: any;
  plantasVisitadasClienteData: any;
  numeroVisitasPlantaData: any;
  mantenimientoTipomaquinaData : any;
  numeroRepuestosPeriodoData: any;
  numeroRepuestosEquipoData: any;
  numeroConsumiblesEquipoData: any;

  equipoModel: EquipoModel = new EquipoModel();
  dashboardModelPorCategoria: DashboardModelPorCategoria = new DashboardModelPorCategoria();
  personaModel: PersonaModel = new PersonaModel();
  modeloPlanta: PlantaModel = new PlantaModel();
  modeloModelo: ModeloModel = new ModeloModel();
  modeloEquipoPorModelo: EquipoPorModeloModel = new EquipoPorModeloModel();
  DashboardMantenimientoPorFiltro: DashboardMantenimientoPorFiltro = new DashboardMantenimientoPorFiltro();
  dashboardModel: DashboardModel = new DashboardModel();
  modeloRepuestoPorModelo: RepuestoPorModeloModel = new RepuestoPorModeloModel();

  subscription: Subscription;

  // Lista de datos
  listLabel: string[];
  listData: number[];
  displayLegend: boolean = false;
  // 
  isValueDash: number;
  
  constructor(private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private dashboardService: DashboardService,
              private registroEquipoService: RegistroEquipoService,
              private dashboardMantenimientoService: DashboardMantenimientoService,
              public languageService: LanguageService,
              private menuDinamicoService: MenuDinamicoService,
              private compartidoService: CompartidoService) {
    this.breadcrumbService.setItems([
      {label:'Dashboard' },
      { label: 'Mantenimiento', routerLink: ['/dashboard/panel-dashboard'] }
    ]);
   }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.selectedPlanta = [];
    this.selectedModelo = [];
    this.selectedEquipo = [];
    this.selectedTecnico = [];
    this.selectedDashboard = null;
    this.selectedRepuesto = [];
    this.selectedFechaInicio = new Date();
    this.selectedFechaFin = new Date();
    this.isValueDash = 0;

    // this.getToObtieneEmpresa();
    this.getToObtienePlantas();
    this.getToObtieneModelo();
    this.getToObtieneTecnico();
    this.getToObtieneDashboard();
    this.getToObtieneRepuesto();

    this.listItemEquipo = [];

    const width = window.innerWidth;

    if (width > 1024) {
      this.displayLegend = true;
    }

    if (width < 1024) {
      this.displayLegend = false;
    }

    this.subscription = new Subscription();
    this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-dashboard')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

    this.barOptions = {
      title: {
        //display: true,
        //text: 'My Title',
        fontSize: 16
      },
      legend: {
        display: this.displayLegend,
        position:  'left'
      },

      plugins: {
        labels: {
          render: 'value',
          fontSize: 14,
          fontStyle: 'bold',
          //fontColor: '#fff',
          //overlap: false
        }
      }

    };

    this.pieOptions = {
      legend: {
        display: this.displayLegend,
        position: 'left'
      },
      plugins: {
        labels: {
          render: 'value',
          fontSize: 16,
          fontStyle: 'bold',
          fontColor: '#fff',
          overlap: true
        }
      }
    };
    
  }

  // getToObtieneEmpresa(){
  //   this.subscription = new Subscription();
  //   this.subscription = this.seguridadService.getEmpresaConAccesoPorUsuario()
  //   .subscribe((data: EmpresaPorUsuarioModel[]) => {
  //     this.listItemEmpresa = [];
  //     for (let item of data) {
  //       this.listItemEmpresa.push({ label: item.descripcionEmpresa, value: item.codigoEmpresa });
  //     }
  //   });
  // }

  getToObtieneDashboard(){
    debugger;
    this.dashboardModelPorCategoria = 
    {
      dashboardCategory: 'Mantenimiento'
    }

    this.subscription = new Subscription();
    this.subscription = this.dashboardService.getDashboardPorCategoria(this.dashboardModelPorCategoria)
    .subscribe((data: DashboardModel[])=>{
      this.listItemDashboard = [];
      for (let item of data) {
        this.listItemDashboard.push({ label: item.dashboardName ,value: item.dashboardCategoryID });
      }
    });
    
  }

  getToObtieneRepuesto(){
  debugger
    if (this.selectedModelo !== null) {
      // this.modeloRepuestoPorModelo =
      // { 
      //   // codigoModelo: this.selectedModelo.value
      // };
      let lisModelo: any[] = [];

      this.selectedModelo.forEach(xFila => {
        lisModelo.push({codigoModelo: xFila.value})
      });

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getXmlSeleccionado(lisModelo)
      .subscribe((data: RepuestoPorModeloModel[])=>{
        this.listItemRepuesto = [];
        for (let item of data) {
          this.listItemRepuesto.push({label: item.descripcion , value: item.codigoModelo });
        }
      });
    }
  }

  // getOnChangeEmpresa() {
  //   if (this.selectedEmpresa !== null) {
  //     this.getToObtienePlantaPorEmpresa(this.selectedEmpresa.value);
  //   }else{
  //     this.listItemPlanta = [];
  //   }
  // }

  // getToObtienePlantaPorEmpresa(value: string) {
  //   this.subscription = new Subscription();
  //   this.subscription = this.seguridadService.getPlantaConAccesoPorUsuarioPorEmpresa(value)
  //   .subscribe((data: PlantaPorUsuarioModel[]) => {
  //     this.listItemPlanta = [];
  //     for (let item of data) {
  //       this.listItemPlanta.push({ label: item.descripcionPlanta, value: item.codigoPlanta });
  //     }
  //   });
  // }

  getToObtienePlantas() {
    this.subscription = new Subscription();
    this.subscription = this.compartidoService.getPlantaAll()
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcionEmpresa + '/' + item.descripcion, value:{id: item.codigoPlanta , name: item.descripcionEmpresa, code: item.codigoEmpresa, planta: item.descripcion} });
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
    if (this.selectedModelo !== null) {
      this.getToObtieneEquipo();
      this.getToObtieneRepuesto();
    }
    else{
      this.listItemEquipo = [];
      this.listItemRepuesto = [];
    }
    this.getToObtieneEquipo();
    
  }

  getOnChangePlanta(){
    //this.onListar();
    this.getToObtieneEquipo();
  }

  getToObtieneEquipo(){
    // if (this.selectedEmpresa !== null && this.selectedPlanta !== null && (this.selectedModelo !== null) ) {
    //   this.modeloEquipoPorModelo =
    //   { codigoEmpresa: this.selectedEmpresa.value,
    //     codigoPlanta: this.selectedPlanta.value,
    //     codigoModelo: this.selectedModelo.value
    //   };

      if (this.selectedPlanta !== null && (this.selectedModelo !== null) ) {
        
        let lisEmpresaPlanta: any[] = [];
        let lisModelo: any[] = [];

        this.selectedPlanta.forEach(xFila => {
          lisEmpresaPlanta.push({codigoEmpresa: xFila.value.code, codigoPlanta: xFila.value.id})
        });

        this.selectedModelo.forEach(xFila => {
          lisModelo.push({codigoModelo: xFila.value})
        });

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getAllXmlPorFiltros(lisEmpresaPlanta, lisModelo)
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
    // Cambiando a filtro multiple
debugger
    let lisEmpresaPlanta: any[] = [];
    let lisModelo: any[] = [];
    let lisEquipo: any[] = [];
    let lisTecnico: any[] = [];
    let lisRespuesto: any[] = [];

    this.selectedPlanta.forEach(xFila => {
      lisEmpresaPlanta.push({codigoEmpresa: xFila.value.code, codigoPlanta: xFila.value.id})
    });

    this.selectedModelo.forEach(xFila => {
      lisModelo.push({codigoModelo: xFila.value})
    });

    this.selectedEquipo.forEach(xFila => {
      lisEquipo.push({equipo: xFila.value})
    });

    this.selectedRepuesto.forEach(xFila => {
      lisRespuesto.push({respuesto: xFila.value})
    });

    this.selectedTecnico.forEach(xFila => {
      lisTecnico.push({tecnico: xFila.value})
    });

    let filtro: any = {
      fechaInicio: this.selectedFechaInicio,
      fechaFin: this.selectedFechaFin,
      tecnico: lisTecnico ,
      idDashboard: tipo,
      respuesto: lisRespuesto,
      planta: lisEmpresaPlanta,
      modelo: lisModelo ,
      equipo: lisEquipo ,
      idUsuario: 1
    }

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

        case 7:
          this.goLlenarMetodo7(data);
          break;
      
        default:
          break;
      }
      
      
    });

  }

  getToListadoLlenar(){

    if (this.selectedDashboard != null) {
      this.getToListado(this.selectedDashboard.value);
      this.isValueDash = this.selectedDashboard.value;
    }
    else{
      this.isValueDash = 0;
      this.getToListado(1);
      this.getToListado(2);    
      this.getToListado(3);    
      this.getToListado(4);
      this.getToListado(5);      
      this.getToListado(6);   
      this.getToListado(7);  
    }
      
  }

  goLlenarMetodo(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.cantidad);
    });

    this.visitasMensualesMantenimientoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Visitas por periodo',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };
  }

  goLlenarMetodo2(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcion);
      this.listData.push(xFila.cantidad);
    });

    this.plantasVisitadasClienteData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: this.ColorArray
      
        }]
    };
  }

  goLlenarMetodo3(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcion);
      this.listData.push(xFila.cantidad);
    });

    this.numeroVisitasPlantaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: this.ColorArray
      
        }]
    };
  }

  goLlenarMetodo4(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcion);
      this.listData.push(xFila.cantidad);
    });

    this.mantenimientoTipomaquinaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: this.ColorArray
      
        }]
    };
  }

  goLlenarMetodo5(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcion);
      this.listData.push(xFila.cantidad);
    });

    this.numeroRepuestosPeriodoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: this.ColorArray
      
        }]
    };
  }

  goLlenarMetodo6(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcion);
      this.listData.push(xFila.cantidad);
    });

    this.numeroRepuestosEquipoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: this.ColorArray
      
        }]
    };
  }

  goLlenarMetodo7(data: DashboardMantenimiento[]) {
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcion);
      this.listData.push(xFila.cantidad);
    });

    this.numeroConsumiblesEquipoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        data: this.listData,
        backgroundColor: this.ColorArray
        }]
    };
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
