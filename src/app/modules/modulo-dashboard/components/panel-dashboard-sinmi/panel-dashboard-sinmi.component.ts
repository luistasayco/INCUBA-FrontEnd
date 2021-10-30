import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { LanguageService } from 'src/app/services/language.service';
import { SelectItem } from 'primeng';
import { SeguridadService } from 'src/app/modules/modulo-seguridad/services/seguridad.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { EmpresaPorUsuarioModel } from 'src/app/modules/modulo-seguridad/models/empresa-por-usuario';
import { DashboardFormularioService } from '../../services/dashboard-formulario.service';
import { ModeloDashboardFormularioPorFiltro, ModeloDashboardFormulario } from '../../models/modelo-dashboard-formulario.model';
import { PersonaModel } from 'src/app/modules/modulo-seguridad/models/persona.model';
import { DashboardModel } from '../../models/dashboard-model.model';
import { DashboardModelPorCategoria } from '../../models/dashboard-model.model';
import { DashboardService } from '../../services/dashboard.service';
import { ModeloDashboardSINMIPorFiltro, ModeloDashboardSINMI } from '../../models/modelo-dashboard-sinmi.model';
import { DashboardSINMIService } from '../../services/dashboard-sinmi.service';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-panel-dashboard-sinmi',
  templateUrl: './panel-dashboard-sinmi.component.html',
  styleUrls: ['./panel-dashboard-sinmi.component.css']
})
export class PanelDashboardSinmiComponent implements OnInit {

  //Titulo del componente
  titulo = 'Dashboard - SIM - SINMI';

  //Constantes Globales
  globalConstants: GlobalsConstants = new GlobalsConstants();

  //Opciones de Busqueda
  listItemEmpresa: SelectItem[];
  listItemGranja: SelectItem[];
  listItemResponsableInvetsa: SelectItem[];
  listItemResponsablePlanta: SelectItem[];
  listItemDashboard: SelectItem[];
  listItemLinea: SelectItem[];
  listItemTipoModulo: SelectItem[];
  listItemEdad: SelectItem[];

  //Subscription
  subscription: Subscription;

  //Modelos
  personaModel: PersonaModel = new PersonaModel();
  modeloDashboardFormularioPorFiltro: ModeloDashboardFormularioPorFiltro = new ModeloDashboardFormularioPorFiltro();
  dashboardModel: DashboardModel = new DashboardModel();
  dashboardModelPorCategoria: DashboardModelPorCategoria = new DashboardModelPorCategoria();

  //Variables de dato seleccionado
  selectedEmpresa: any[];
  selectedGranja: any[];
  selectedResponsableInvetsa: any[];
  selectedResponsablePlanta: any[];
  selectedDashboard: any;
  selectedLinea: any[];
  selectedTipoModulo: SelectItem;
  selectedEdad: any[];
  selectedFechaInicio: any;
  selectedFechaFin: any;

  //Variables de graficos
  barOptions: any;
  barOptions1: any;
  scoreGeneralData: any;
  indiceHepaticoData: any;
  scoreLesionesData:any;
  

  //Lista de datos
  listLabel: string[];
  listData: number[];

  //Logica dashboard
  isValueDash: number;
  isDisabled: boolean;
  displayLegend: boolean = false;
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

  constructor(public languageService: LanguageService,
              private seguridadService: SeguridadService,
              private dashboardFormularioService: DashboardFormularioService,
              private dashboardSINMIService: DashboardSINMIService,
              private dashboardService: DashboardService,
              private bredcrumbService: BreadcrumbService) {
    this.bredcrumbService.setItems([
      {label:'Dashboard' },
      { label: 'SINMI', routerLink: ['/dashboard/panel-dashboard-sinmi'] }
    ]);
                
  }

  ngOnInit(): void {
    this.selectedEmpresa = [];
    this.selectedGranja = [];
    this.selectedResponsableInvetsa = [];
    this.selectedResponsablePlanta = [];
    this.selectedDashboard = null;
    this.selectedLinea = [];
    this.selectedTipoModulo = {label: 'SIM'  , value: 1};
    this.selectedEdad = [];
    this.selectedFechaInicio = new Date();
    this.selectedFechaFin = new Date();
    this.isValueDash = 0;
    this.isDisabled = false;

    this.listItemTipoModulo = [{label: 'SIM'  , value: 1},
                               {label: 'SINMI', value: 2}];
    
    this.listItemEdad= [{label: '7-15' , value: 1},
                        {label: '16-21' , value: 2},
                        {label: '22-28'   , value: 3},
                        {label: '29-35'   , value: 4}];

    this.getToObtieneEmpresa();
    this.getToObtieneGranja();
    this.getToObtieneResponsableInvetsa();
    this.getToObtieneResponsablePlanta();
    this.getToObtieneDashboard();
    this.getToObtieneLinea();
    
    const width = window.innerWidth;

    if (width > 1024) {
      this.displayLegend = true;
    }

    if (width < 1024) {
      this.displayLegend = false;
    }

    this.barOptions = {
      title: {
        //display: true,
        //text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'left'
      },


      plugins: {
        labels: {
          render: 'value',
          fontSize: 14,
          fontStyle: 'bold',
          //fontColor: '#fff',
          //overlap: false
        }
      },

      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
           maxRotation: 45,
           minRotation: 45
        }
          
        }],
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 20
          }
      }]
      }
     

    };
    
    this.barOptions1 = {
      title: {
        //display: true,
        //text: 'My Title',
        fontSize: 16
      },
      legend: {
        display: this.displayLegend,
        position: 'left'
      },


      plugins: {
        labels: {
          render: 'value',
          fontSize: 14,
          fontStyle: 'bold',
          //fontColor: '#fff',
          //overlap: false
        }
      },

      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
           maxRotation: 45,
           minRotation: 45
        }
          
        }],
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 10
          }
      }]
      }
     

    };
      
  }

  deactivate(){
    if (this.selectedTipoModulo != null) {
      if (this.selectedTipoModulo.value == 2) this.isDisabled = true;
      else this.isDisabled = false;
    } else {
      this.isDisabled = false;
    }
    
  } 

  getToObtieneEmpresa(){
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getEmpresaConAccesoPorUsuario()
    .subscribe((data: EmpresaPorUsuarioModel[])=>{
      this.listItemEmpresa = [];
      for(let item of data){
        this.listItemEmpresa.push({ label: item.descripcionEmpresa, value: item.codigoEmpresa });
      }
    });
  }

  getOnChangeTipoModulo () {
    this.getToObtieneGranja();
    this.getToObtieneDashboard();
  }

  getToObtieneGranja(){


    if (this.selectedTipoModulo.value == 1) {
      this.modeloDashboardFormularioPorFiltro = 
      {
        filtro: 6
      }
      
    }else
    {
      this.modeloDashboardFormularioPorFiltro = 
      {
        filtro: 3
      }
    }  
      

    this.subscription = new Subscription();
    this.subscription = this.dashboardFormularioService.getDashboardFormularioPorFiltro(this.modeloDashboardFormularioPorFiltro)
    .subscribe((data: ModeloDashboardFormulario[])=>{
      this.listItemGranja= [];
      for (let item of data) {
        this.listItemGranja.push({value: item.descripcion});
      }
    });
  }

  getToObtieneResponsableInvetsa(){
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPersona(this.personaModel)
    .subscribe((data: PersonaModel[])=>{
      this.listItemResponsableInvetsa = [];
      for(let item of data){
        this.listItemResponsableInvetsa.push({ label: item.nombreCompleto, value: item.idPersona });
      }
    });
  }

  getToObtieneResponsablePlanta(){
    
    this.modeloDashboardFormularioPorFiltro = 
    {
      filtro: 4
    }

    this.subscription = new Subscription();
    this.subscription = this.dashboardFormularioService.getDashboardFormularioPorFiltro(this.modeloDashboardFormularioPorFiltro)
    .subscribe((data: ModeloDashboardFormulario[])=>{
      this.listItemResponsablePlanta= [];
      for (let item of data) {
        this.listItemResponsablePlanta.push({value: item.descripcion});
      }
    });
  }

  getToObtieneLinea(){
    
    this.modeloDashboardFormularioPorFiltro = 
    {
      filtro: 5
    }

    this.subscription = new Subscription();
    this.subscription = this.dashboardFormularioService.getDashboardFormularioPorFiltro(this.modeloDashboardFormularioPorFiltro)
    .subscribe((data: ModeloDashboardFormulario[])=>{
      this.listItemLinea= [];
      for (let item of data) {
        this.listItemLinea.push({value: item.descripcion});
      }
    });
  }

  getToObtieneDashboard(){

    if (this.selectedTipoModulo.value == 1) {
      this.dashboardModelPorCategoria = 
      {
        dashboardCategory: 'SIM'
      }
    }else
    {
      this.dashboardModelPorCategoria = 
      {
        dashboardCategory: 'SINMI'
      }
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

  getToListadoLlenar(){

    if (this.selectedDashboard != null) {
      this.getToFiltrosDashboard(this.selectedDashboard.value);
      this.isValueDash = this.selectedDashboard.value;
    } else {
      this.isValueDash = 0;
      this.getToFiltrosDashboard(1);
      this.getToFiltrosDashboard(2); 
      this.getToFiltrosDashboard(3);
      
    }
  }

  getToFiltrosDashboard(tipo: number){
    debugger;
    let lisEmpresaPlanta: any[] = [];
    let lisResponsableInvetsa: any[] = [];
    let lisResponsablePlanta: any[] = [];
    let lisLinea: any[] = [];
    let lisGranja: any[] = [];
    let listEdad: any[]=[];

    this.selectedEmpresa.forEach(xFila => {
      lisEmpresaPlanta.push({empresa: xFila.value})
    });

    this.selectedResponsableInvetsa.forEach(xFila => {
      lisResponsableInvetsa.push({responsableInvetsa: xFila.value})
    });

    this.selectedResponsablePlanta.forEach(xFila => {
      lisResponsablePlanta.push({responsablePlanta: xFila.value})
    });

    this.selectedGranja.forEach(xFila => {
      lisGranja.push({planta: xFila.value})
    });

    this.selectedLinea.forEach(xFila => {
      lisLinea.push({linea: xFila.value})
    });

    this.selectedEdad.forEach(xFila => {
      listEdad.push({edad: xFila.value})
    });

    let filtro: any ={
      empresa: lisEmpresaPlanta,
      planta: lisGranja,
      responsableInvetsa: lisResponsableInvetsa,
      responsableCompania: lisResponsablePlanta,
      linea: lisLinea,
      edad: listEdad,
      tipoModulo: this.selectedTipoModulo == null ? 1 : this.selectedTipoModulo.value,
      fechaInicio: this.selectedFechaInicio,
      fechaFin: this.selectedFechaFin,
      idDashboard: tipo,
      idUsuario: 1,
    }

    this.subscription = new Subscription();
    this.subscription = this.dashboardSINMIService.getDashboardSINMIPorFiltro(filtro)
    .subscribe((data: ModeloDashboardSINMI[])=>{
      switch (filtro.idDashboard) {
        case 1:
          this.goLlenarGrafico(data);
          break;
        case 2:
          this.goLlenarGrafico1(data);
          break;
        case 3:
          this.goLlenarGrafico2(data);
          break;
        default:
          break;
      }
    });
  }
    

  goLlenarGrafico(data: ModeloDashboardSINMI[]){
    debugger;
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.scoreGeneral);
    });

    this.scoreGeneralData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Score General Salud Intestinal',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  goLlenarGrafico1(data: ModeloDashboardSINMI[]){
    debugger;
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.scoreGeneral);
    });

    this.indiceHepaticoData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Indice Hepatico',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  goLlenarGrafico2(data: ModeloDashboardSINMI[]){
    debugger;
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.scoreGeneral);
    });

    this.scoreLesionesData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Score de lesiones por coccidia',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
