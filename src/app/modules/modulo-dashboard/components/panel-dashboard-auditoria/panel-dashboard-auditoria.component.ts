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
  listItemResponsableIncubadora: SelectItem[];

  //Variables de dato seleccionado
  selectedEmpresa: any;
  selectedPlanta: any;
  selectedResponsableInvetsa: any;
  selectedResponsableIncubadora: any;

  //Modelos
  personaModel: PersonaModel = new PersonaModel();
  txRegistroEquipoModel: TxRegistroEquipoModel = new TxRegistroEquipoModel();

  //Subscription
  subscription: Subscription;

  //Constantes Globales
  globalConstants: GlobalsConstants = new GlobalsConstants();

  constructor(private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private registroEquipoService: RegistroEquipoService) { 
    this.breadcrumbService.setItems([
      {label:'Dashboard' },
      { label: 'Auditoria', routerLink: ['/dashboard/panel-dashboard-auditoria'] }
    ]);
  }

  ngOnInit(): void {
    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedResponsableInvetsa = null;
    this.selectedResponsableIncubadora = null;

    this.getToObtieneEmpresa();
    this.getToObtieneResponsableInvetsa();
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

  getToObtieneResponsableIncubadora(){

    if(this.selectedEmpresa != null && this.selectedPlanta != null){

      /*this.txRegistroEquipoModel = 
      {
        descripcionEmpresa: this.selectedEmpresa.label,
        descripcionPlanta: this.selectedPlanta.label
        //codigoEmpresa: this.selectedEmpresa.value,
        //codigoPlanta: this.selectedPlanta.value
      };*/

      this.subscription = new Subscription();
      this.subscription = this.registroEquipoService.getTxRegistroEquipo(this.txRegistroEquipoModel)
      .subscribe((data: TxRegistroEquipoModel[])=>{
      this.listItemResponsableIncubadora = [];
      for (let item of data) {
        this.listItemResponsableIncubadora.push({ value: item.responsableIncuba });
        }
      });
    }

    
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
