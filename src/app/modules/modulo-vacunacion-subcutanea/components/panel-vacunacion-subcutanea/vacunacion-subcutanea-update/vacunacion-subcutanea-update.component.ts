import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { VacunacionSprayService } from '../../../../modulo-vacunacion-spray/services/vacunacion-spray.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../../../modulo-registro-equipo/services/registro-equipo.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { TxVacunacionSubCutaneaModel } from '../../../models/tx-vacunacion-subcutanea.model';

@Component({
  selector: 'app-vacunacion-subcutanea-update',
  templateUrl: './vacunacion-subcutanea-update.component.html',
  styleUrls: ['./vacunacion-subcutanea-update.component.css']
})
export class VacunacionSubcutaneaUpdateComponent implements OnInit {
  titulo = 'Vacunación SubCutánea';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  subscription$: Subscription;

  displaySave: boolean;

  rowGroupMetadata: any;

  columnasMaquina: any[];
  columnasVacuna: any[];
  columnasSeleccionarMaquina: any[];
  columnasResultado: any[];
  columnasIrregularidad: any[];
  columnasNuevoIrregularidad: any[];
  columnasControlEficiencia: any[];

  modeloItem: TxVacunacionSubCutaneaModel = new TxVacunacionSubCutaneaModel();
  id: number;
  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private vacunacionSubcutaneaService: VacunacionSubcutaneaService,
              private router: Router,
              private route: ActivatedRoute) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Subcutánea' },
        { label: this.titulo, routerLink: ['module-su/panel-vacunacion-subcutanea'] },
        { label: 'Actualizar'}
    ]);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id);
      this.subscription$ = new Subscription();
      this.subscription$ = this.vacunacionSubcutaneaService.getTxVacunacionSubCutaneaPorId(this.id)
      .subscribe((data: TxVacunacionSubCutaneaModel) => {
        
        this.modeloItem = data;
        this.updateRowGroupMetaData();
      });
    });

    this.columnasMaquina = [
      { header: 'Aguja' },
      { header: 'N° máquinas' },
      { header: 'Modelo/Marca' },
      { header: 'Codigo AF' }
    ];
    this.columnasVacuna = [
      { header: 'Vacuna' },
      { header: 'Nombre Vacuna' }
    ];

    this.columnasSeleccionarMaquina = [
      {header: 'Codigo', field: 'idProcesoSubCutanea'},
      {header: 'Descripción', field: 'descripcionProcesoSubCutanea'}
    ]

    this.columnasResultado = [
      { header: 'Descripción' },
      { header: 'Valor Esperado' },
      { header: 'Valor Obtenido' }
    ];

    this.columnasIrregularidad = [
      { header: 'Descripción'},
      { header: 'Codigo AF'},
      { header: 'Irregularidad'},
      { header: 'Valor'}
    ];

    this.columnasNuevoIrregularidad = [
      {header: 'Codigo', field: 'idIrregularidad'},
      {header: 'Descripción', field: 'descripcionIrregularidad'}
    ];

    this.columnasControlEficiencia = [
      { header: 'Vacunador'},
      { header: 'Cantidad Inicial'},
      { header: 'Cantidad Final'},
      { header: 'Vac./Hora'},
      { header: 'Puntaje Productividad'},
      { header: 'Controlados'},
      { header: 'Sin Vacunar'},
      { header: 'Heridos'},
      { header: 'Mojados'},
      { header: 'Mala Posición'},
      { header: 'Vac. Correctamente'},
      { header: '% de Eficiencia'},
      { header: 'Puntaje de Eficiencia'}
    ];


    

  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }


  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.modeloItem.listarTxVacunacionSubCutaneaDetalle) {
      for (let i = 0; i < this.modeloItem.listarTxVacunacionSubCutaneaDetalle.length; i++) {
        let rowData = this.modeloItem.listarTxVacunacionSubCutaneaDetalle[i];
        let brand = rowData.descripcionProcesoSubCutanea;
        if (i === 0) {
            this.rowGroupMetadata[brand] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.modeloItem.listarTxVacunacionSubCutaneaDetalle[i - 1];
          let previousRowGroup = previousRowData.descripcionProcesoSubCutanea;
          if ( brand === previousRowGroup )
            this.rowGroupMetadata[brand].size++;
          else
            this.rowGroupMetadata[brand] = { index: i, size: 1 };
        }
      }
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listarTxVacunacionSubCutaneaFotos = [];
    event.forEach(x => {
      this.modeloItem.listarTxVacunacionSubCutaneaFotos.push({
        idVacunacionSprayDetalle: 0,
        idVacunacionSpray: 0,
        foto: x.imagen
      });
    });
  }


  onGrabar() {
    
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.setUpdateTxVacunacionSubCutanea(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.displaySave = false;
      this.onBack();
    },
      (error) => {
        this.displaySave = false;
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });

  }

  onBack() {
    this.router.navigate(['/main/module-su/panel-vacunacion-subcutanea']);
  }

}
