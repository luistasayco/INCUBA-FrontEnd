import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { Subscription } from 'rxjs';
import { TxVacunacionSubCutaneaModel } from '../../../models/tx-vacunacion-subcutanea.model';
import { TxVacunacionSubCutaneaFotosModel } from '../../../models/tx-vacunacion-subcutanea-fotos.model';
import { VacunacionSubcutaneaLocalService } from '../../../services/vacunacion-subcutanea-local.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-vacunacion-subcutanea-offline-update',
  templateUrl: './vacunacion-subcutanea-offline-update.component.html',
  styleUrls: ['./vacunacion-subcutanea-offline-update.component.css']
})
export class VacunacionSubcutaneaOfflineUpdateComponent implements OnInit, OnDestroy {
  titulo = 'Vacunación SubCutánea-Offline';
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
  columnasPromedio: any[];

  modeloItem: TxVacunacionSubCutaneaModel = new TxVacunacionSubCutaneaModel();
  id: number;

  listIma: any[];
  cloneListImagen: TxVacunacionSubCutaneaFotosModel[] = [];

  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private vacunacionSubcutaneaLocalService: VacunacionSubcutaneaLocalService,
              private router: Router,
              private route: ActivatedRoute) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Subcutánea-Offline' },
        { label: this.titulo, routerLink: ['module-su/panel-vacunacion-subcutanea-Offline'] },
        { label: 'Actualizar'}
    ]);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      
      this.onObtieneVacunacionSubCutaneaId();
      
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

    this.columnasPromedio = [
      { header: 'Vacunador'},
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

  onObtieneVacunacionSubCutaneaId() {
    let vId = Number(this.id);
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.getTxVacunacionSubcutaneaPorId(vId)
    .subscribe((data: TxVacunacionSubCutaneaModel) => {
      console.log('data', data);
      this.modeloItem = data;
      this.cloneListImagen = [...this.modeloItem.listarTxVacunacionSubCutaneaFotos];
      this.listImagen();
      this.updateRowGroupMetaData();
    });
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

  listImagen() {
    this.listIma = [];
    if (this.modeloItem.listarTxVacunacionSubCutaneaFotos.length > 0 ) {
      this.modeloItem.listarTxVacunacionSubCutaneaFotos.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listarTxVacunacionSubCutaneaFotos = [];
    event.forEach(x => {
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listarTxVacunacionSubCutaneaFotos.push(itemImagen);
        } else {
          this.modeloItem.listarTxVacunacionSubCutaneaFotos.push({
            idVacunacionSubCutaneaDetalle: 0,
            idVacunacionSubCutanea: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listarTxVacunacionSubCutaneaFotos.push({
          idVacunacionSubCutaneaDetalle: 0,
          idVacunacionSubCutanea: 0,
          foto: x.imagen
        });
      }
    });
  }


  onGrabar() {
    
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.setUpdateTxVacunacionSubcutanea(this.modeloItem)
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
    this.router.navigate(['/main/module-su/panel-vacunacion-subcutanea-offline']);
  }

}
