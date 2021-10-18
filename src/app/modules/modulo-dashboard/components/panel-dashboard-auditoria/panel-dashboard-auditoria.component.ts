import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { Subscription } from 'rxjs';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { PlantaPorUsuarioModel } from '../../../modulo-seguridad/models/planta-por-usuario';
import { PersonaModel } from '../../../modulo-seguridad/models/persona.model';
import { RegistroEquipoService } from '../../../modulo-registro-equipo/services/registro-equipo.service';
import { TxRegistroEquipoModel } from '../../../modulo-registro-equipo/models/tx-registro-equipo.model';
import { Label } from 'ng2-charts';
import { ModeloDashboardAuditoriaPorFiltro, DashboardAuditoria } from '../../models/modelo-dashboard-auditoria-por-filtro.model';
import { variableGlobal } from '../../../../interface/variable-global.interface';
import { DashboardAuditoriaService } from '../../services/dashboard-auditoria.service';
import { DashboardFormularioService } from '../../services/dashboard-formulario.service';
import { ModeloDashboardFormulario, ModeloDashboardFormularioPorFiltro } from '../../models/modelo-dashboard-formulario.model';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardModel } from '../../models/dashboard-model.model';
import { DashboardModelPorCategoria } from '../../models/dashboard-model.model';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-panel-dashboard-auditoria',
  templateUrl: './panel-dashboard-auditoria.component.html',
  styleUrls: ['./panel-dashboard-auditoria.component.css']
})
export class PanelDashboardAuditoriaComponent implements OnInit {

  //Titulo del componente
  titulo = 'Dashboard - Auditoria';

  //Opciones de Busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemResponsableInvetsa: SelectItem[];
  listItemResponsablePlanta: SelectItem[];
  listItemVacunador: SelectItem[];
  listItemTipoAuditoria: SelectItem[];
  listItemLineaGenetica: SelectItem[];
  listItemDashboard: SelectItem[];
  

   //Variables de dato seleccionado
  selectedEmpresa: any;
  selectedPlanta: any;
  selectedResponsableInvetsa: any;
  selectedResponsablePlanta: any;
  selectedVacunador: any;
  selectedFechaInicio: any;
  selectedFechaFin: any;
  selectedTipoAuditoria: any;
  selectedLineaGenetica: any;
  selectedDashboard: any;

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
  vacunaNitrogenadaData: any;
  vacunaLiofilizadaData: any;
  puntajeProductividadData: any;
  porcentajeEficienciaData: any;
  puntajeTotalData: any;
  puntajeTotalMultipleData: any;
  numeroAuditoriasData: any;
  laboratorioVacunaData: any;
  equipoInvetsaData: any;
  salaVacunacionData: any;
  vacunaLiofilizada: any;
  barOptions: any;
  vacunaNitrogenadaOptions: any;
  vacunaLiofilizadaOptions: any;
  puntajeProductividadOptions: any;
  puntajeTotalMultipleOptions: any;
  porcentajeEficienciaOptions: any;
  puntajeTotalOptions: any;
  numeroAuditoriasOptions: any;

  //Lista de datos
  listLabel: string[];
  listData: number[];
  listData1: number[];

  //Modelos
  personaModel: PersonaModel = new PersonaModel();
  txRegistroEquipoModel: TxRegistroEquipoModel = new TxRegistroEquipoModel();
  modeloDashboardFormularioPorFiltro: ModeloDashboardFormularioPorFiltro = new ModeloDashboardFormularioPorFiltro();
  dashboardModel: DashboardModel = new DashboardModel();
  dashboardModelPorCategoria: DashboardModelPorCategoria = new DashboardModelPorCategoria();
  //Subscription
  subscription: Subscription;

  //Constantes Globales
  globalConstants: GlobalsConstants = new GlobalsConstants();

  //Logica dashboard
  isValueDash: number;
  isDisabled: boolean;
  displayLegend: boolean = false;
  constructor(private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private dashboardService: DashboardService,
              private registroEquipoService: RegistroEquipoService,
              private dashboardAuditoriaService: DashboardAuditoriaService,
              public languageService : LanguageService,
              private dashboardFormularioService: DashboardFormularioService) { 
    this.breadcrumbService.setItems([
      {label:'Dashboard' },
      { label: 'Auditoria', routerLink: ['/dashboard/panel-dashboard-auditoria'] }
    ]);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedResponsableInvetsa = null;
    this.selectedResponsablePlanta = null;
    this.selectedVacunador = null;
    this.selectedTipoAuditoria = null; 
    this.selectedLineaGenetica = null;
    this.selectedDashboard = null;
    this.selectedFechaInicio = new Date();
    this.selectedFechaFin = new Date();
    this.isValueDash = 0;
    this.isDisabled = false;

    this.listItemTipoAuditoria = [{label: 'Vacunación subcutanea' , value: 1},
                                  {label: 'Vacunación spray'      , value: 2}];
    this.listItemLineaGenetica= [{label: 'HyLine' , value: 1},
                                 {label: 'Lohman' , value: 2},
                                 {label: 'Ross'   , value: 3},
                                 {label: 'Cobb'   , value: 4},
                                 {label: 'Otros'  , value: 5}];
      

    this.getToObtieneEmpresa();
    this.getToObtieneResponsableInvetsa();
    this.getToObtieneResponsablePlanta();
    this.getToObtieneVacunador();
    this.getToObtieneDashboard();

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
              max: 30
          }
      }]
      }
     

    };

      this.vacunaNitrogenadaOptions = {
            
      title: {
        //display: true,
        //text: 'My Title',
        fontSize: 16
      },
      legend: {
        display: this.displayLegend,
        position: 'top'
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
        /*xAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Month'
          }
          
        }],*/
        xAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 3
          }
      }]
      }
    };

    this.vacunaLiofilizadaOptions = {
      title: {
        //display: true,
        //text: 'My Title',
        fontSize: 16
      },
      legend: {
        display: this.displayLegend,
        position: 'top'
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
        /*xAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Month'
          }
          
        }],*/
        xAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 6
          }
      }]
      }
    };

    this.puntajeProductividadOptions= {
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
              max: 1.2
          }
      }]
      }
    };

    this.porcentajeEficienciaOptions= {
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
          fontSize: 10,
          //fontStyle: 'bold',
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
              max: 110
          }
      }]
      }
    };

    this.puntajeTotalOptions= {
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
        /*xAxes: [{
          ticks: {
            autoSkip: false,
           maxRotation: 45,
           minRotation: 45
        }
          
        }],*/
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 12
          }
      }]
      }
    };

    this.puntajeTotalMultipleOptions= {
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
        /*xAxes: [{
          ticks: {
            autoSkip: false,
           maxRotation: 45,
           minRotation: 45
        }
          
        }],*/
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 12
          }
      }]
      }
    };

    this.numeroAuditoriasOptions= {
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
        /*xAxes: [{
          ticks: {
            autoSkip: false,
           maxRotation: 45,
           minRotation: 45
        }
          
        }],*/
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 12
          }
      }]
      }
    };
  }

  deactivate(){
    if (this.selectedTipoAuditoria != null) {
      if (this.selectedTipoAuditoria.value == 2) this.isDisabled = true;
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

  getOnChangeEmpresa(){
    if (this.selectedEmpresa != null) {
      this.getToObtienePlantaPorEmpresa(this.selectedEmpresa.value);
    } else {
      this.listItemPlanta = [];
    }
  }

  getToObtienePlantaPorEmpresa(value: string){
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPlantaConAccesoPorUsuarioPorEmpresa(value)
    .subscribe((data: PlantaPorUsuarioModel[])=>{
      this.listItemPlanta = [];
      for(let item of data){
        this.listItemPlanta.push({ label: item.descripcionPlanta, value: item.codigoPlanta });
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
      filtro: 1
    }

    this.subscription = new Subscription();
    this.subscription = this.dashboardFormularioService.getDashboardFormularioPorFiltro(this.modeloDashboardFormularioPorFiltro)
    .subscribe((data: ModeloDashboardFormulario[])=>{
      this.listItemResponsablePlanta = [];
      for (let item of data) {
        this.listItemResponsablePlanta.push({value: item.responsableIncubadora});
      }
    });
  }

  getToObtieneVacunador(){
    
    this.modeloDashboardFormularioPorFiltro = 
    {
      filtro: 2
    }

    this.subscription = new Subscription();
    this.subscription = this.dashboardFormularioService.getDashboardFormularioPorFiltro(this.modeloDashboardFormularioPorFiltro)
    .subscribe((data: ModeloDashboardFormulario[])=>{
      this.listItemVacunador = [];
      for (let item of data) {
        this.listItemVacunador.push({value: item.nombreVacunador});
      }
    });
  }

  getToObtieneDashboard(){
    this.dashboardModelPorCategoria = 
    {
      dashboardCategory: 'Auditoria'
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
      this.getToFiltrosDashboard(4);    
      this.getToFiltrosDashboard(5);  
      this.getToFiltrosDashboard(6);   
      this.getToFiltrosDashboard(7);
      this.getToFiltrosDashboard(8);
      this.getToFiltrosDashboard(9);
      this.getToFiltrosDashboard(10);
    }
      
  }

  getToFiltrosDashboard(tipo: number){
    debugger;
    let filtro: ModeloDashboardAuditoriaPorFiltro = new ModeloDashboardAuditoriaPorFiltro();
    filtro.empresa = this.selectedEmpresa == null ? '' : this.selectedEmpresa.value;
    filtro.planta = this.selectedPlanta == null  ? '' : this.selectedPlanta.value;
    filtro.responsableInvetsa = this.selectedResponsableInvetsa == null ? 0 : this.selectedResponsableInvetsa.value;
    filtro.responsablePlanta = this.selectedResponsablePlanta == null ? '' : this.selectedResponsablePlanta.value;
    filtro.tipo = this.selectedTipoAuditoria == null ? 1 : this.selectedTipoAuditoria.value;
    filtro.lineaGenetica = this.selectedLineaGenetica == null ? 0 : this.selectedLineaGenetica.value;
    filtro.vacunador = this.selectedVacunador == null ? '' : this.selectedVacunador.value;
    filtro.fechaInicio = this.selectedFechaInicio;
    filtro.fechaFin = this.selectedFechaFin;
    filtro.idDashboard = tipo;
    filtro.idUsuario = 1;

    this.subscription = new Subscription();
    this.subscription = this.dashboardAuditoriaService.getDashboardAuditoriaPorFiltro(filtro)
    .subscribe((data: DashboardAuditoria[])=>{
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
        case 4:
          this.goLlenarGrafico3(data);
          break;
        case 5:
          this.goLlenarGrafico4(data);
          break;
        case 6:
          this.goLlenarGrafico5(data);
          break;
        case 7:
          this.goLlenarGrafico6(data);
          break;
        case 8:
          this.goLlenarGrafico7(data);
          break;
        case 9:
          this.goLlenarGrafico8(data);
          break;
        case 10:
          this.goLlenarGrafico9(data);
          break;
        default:
          break;
      }
    });
  }

  goLlenarGrafico(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcionDashboard);
      this.listData.push(xFila.cantidad);
    });

    this.vacunaNitrogenadaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Número - Manipulación y dilución de la vacuna nitrogenada',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  goLlenarGrafico1(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcionDashboard);
      this.listData.push(xFila.cantidad);
    });

    this.vacunaLiofilizadaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Número - Manipulación y dilución de la vacuna liofilizada',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };


  }

  goLlenarGrafico2(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombreVacunador);
      this.listData.push(xFila.puntajeProductividad);
    });

    this.puntajeProductividadData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Puntaje (Productividad)',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  goLlenarGrafico3(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.nombreVacunador);
      this.listData.push(xFila.porcentajeEficiencia);
    });

    this.porcentajeEficienciaData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: '% de eficiencia',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  goLlenarGrafico4(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.valorObtenido);
    });

    this.puntajeTotalData = {
      labels: this.listLabel,
      
      datasets: [
        {
        label: 'Puntaje total obtenido',
        backgroundColor: this.ColorArray[0],
        data: this.listData}
      
      ]
    };

  }

  goLlenarGrafico5(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    let listPlanta: any[] = [];

    let listDataSet: any[] = [];
    let datasets: any;
    let i: number = 0;

    data.forEach(xFila => {
      let countLabel = this.listLabel.filter(xLabel => xLabel === xFila.periodo).length;
        if (countLabel === 0) {
          this.listLabel.push(xFila.periodo);
        }
    });

    data.forEach(xFila => {
      let countLabel = listPlanta.filter(xLabel => xLabel === xFila.descripcionDashboard).length;
        if (countLabel === 0) {
          listPlanta.push(xFila.descripcionDashboard);
        }
    });
    
    listPlanta.forEach(xPlanta => {
      this.listData = [];
      let list = [...data].filter(xLabel => xLabel.descripcionDashboard === xPlanta);

      // list.forEach(xData =>  {

        this.listLabel.forEach(xExistePeriodo => {
          let existe = list.filter(xLabel => xLabel.periodo === xExistePeriodo).length;
          if (existe === 0) {
            this.listData.push(null);
          } else {
            this.listData.push(list.find(xEncontro => xEncontro.periodo === xExistePeriodo).valorObtenido);
            
          }
        }
        );
      // });
      i++;
      datasets = {
        label: xPlanta,
        borderColor: this.ColorArray[i],
        data: this.listData,
        fill: false,
        tension: 0
      }
      listDataSet.push(datasets);
    });

   

    this.puntajeTotalMultipleData = {
      labels: this.listLabel,
      datasets:listDataSet
    };
  }

  goLlenarGrafico6(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.periodo);
      this.listData.push(xFila.cantidad);
    });

    this.numeroAuditoriasData = {
      labels: this.listLabel,
      
      datasets: [
        {
          label: 'Numero de auditorias',
          backgroundColor: this.ColorArray[0],
          data: this.listData
        }
      
      ]
    };

  }

  goLlenarGrafico7(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];
    this.listData1 = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcionDashboard);
      this.listData.push(xFila.cantidadSI);
      this.listData1.push(xFila.cantidadNO);
    });

    this.laboratorioVacunaData = {
      labels: this.listLabel,
      
      datasets: [
        {
          label: 'Si',
          backgroundColor: this.ColorArray[0],
          data: this.listData
        },
        {
          label: 'No',
          backgroundColor: this.ColorArray[2],
          data: this.listData1
        }
      
      ]
    };

  }

  goLlenarGrafico8(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];
    this.listData1 = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcionDashboard);
      this.listData.push(xFila.cantidadSI);
      this.listData1.push(xFila.cantidadNO);
    });

    this.equipoInvetsaData = {
      labels: this.listLabel,
      
      datasets: [
        {
          label: 'Si',
          backgroundColor: this.ColorArray[0],
          data: this.listData
        },
        {
          label: 'No',
          backgroundColor: this.ColorArray[2],
          data: this.listData1
        }
      
      ]
    };

  }

  goLlenarGrafico9(data: DashboardAuditoria[]){
    this.listLabel = [];
    this.listData = [];
    this.listData1 = [];

    data.forEach(xFila => {
      this.listLabel.push(xFila.descripcionDashboard);
      this.listData.push(xFila.cantidadSI);
      this.listData1.push(xFila.cantidadNO);
    });

    this.salaVacunacionData = {
      labels: this.listLabel,
      
      datasets: [
        {
          label: 'Si',
          backgroundColor: this.ColorArray[0],
          data: this.listData
        },
        {
          label: 'No',
          backgroundColor: this.ColorArray[2],
          data: this.listData1
        }
      
      ]
    };

  }
  

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
