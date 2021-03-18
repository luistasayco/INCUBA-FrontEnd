import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxVacunacionSprayModel } from '../../../models/tx-vacunacion-spray.model';
import { EmpresaModel } from '../../../../modulo-compartido/models/empresa.model';
import { ProcesoSprayModel } from '../../../models/proceso-spray.model';
import { ProcesoDetalleSprayModel } from '../../../models/proceso-detalle-spray.model';
import { Subscription } from 'rxjs';
import { TxVacunacionSprayVacunaModel } from '../../../models/tx-vacunacion-spray-vacuna.model';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { VacunacionSprayService } from '../../../services/vacunacion-spray.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../../../modulo-registro-equipo/services/registro-equipo.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { EmpresaPorUsuarioModel } from '../../../../modulo-seguridad/models/empresa-por-usuario';
import { PlantaModel } from '../../../../modulo-compartido/models/planta.model';
import { VacunaModel } from '../../../models/vacuna.model';
import { BoquillaModel } from '../../../models/boquilla.model';
import { EquipoPorModeloModel } from '../../../../modulo-registro-equipo/models/equipo-por-modelo.model';
import { ModeloModel } from '../../../../modulo-compartido/models/modelo.model';
import { TxVacunacionSprayMaquinaModel } from '../../../models/tx-vacunacion-spray-maquina.model';
import { TxVacunacionSprayFotosModel } from '../../../models/tx-vacunacion-spray-fotos.model';

@Component({
  selector: 'app-vacunacion-spray-update',
  templateUrl: './vacunacion-spray-update.component.html',
  styleUrls: ['./vacunacion-spray-update.component.css']
})
export class VacunacionSprayUpdateComponent implements OnInit, OnDestroy {
  titulo = 'Vacunación Spray';
  value: boolean;
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloItem: TxVacunacionSprayModel = new TxVacunacionSprayModel();
  modeloEmpresa: EmpresaModel = new EmpresaModel();

  listProceso: ProcesoSprayModel[];
  listProcesoDetalle: ProcesoDetalleSprayModel[];

  columnasMaquina: any[];
  columnasVacuna: any[];
  columnasResultado: any[];

  subscription$: Subscription;

  displaySave: boolean;

  rowGroupMetadata: any;

  displayVacuna: boolean;
  displayMaquina: boolean;

  nombreVacuna: string;

  clonedVacuna: { [s: string]: TxVacunacionSprayVacunaModel; } = {};

  id: number;
  listIma: any[];
  cloneListImagen: TxVacunacionSprayFotosModel[] = [];
  displayControles: boolean;
  constructor(public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private vacunacionSprayService: VacunacionSprayService,
              private router: Router,
              private route: ActivatedRoute) {
      this.breadcrumbService.setItems([
        { label: 'Módulo Vacunación Spray' },
        { label: this.titulo, routerLink: ['module-sp/panel-vacunacion-spray'] },
        { label: 'Actualizar'}
    ]);
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id);
      this.onObtieneVacunacionSprayPorId();
    });

    this.columnasMaquina = [
      { header: 'Máquina' },
      { header: 'N° máquinas' },
      { header: 'Modelo/Marca' },
      { header: 'Codigo AF' }
    ];
    this.columnasVacuna = [
      { header: 'Vacuna' },
      { header: 'Nombre Vacuna' }
    ];

    this.columnasResultado = [
      { header: 'Descripción' },
      { header: 'Valor Esperado' },
      { header: 'Valor Obtenido' }
    ];
  }

  onObtieneVacunacionSprayPorId () {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.getTxVacunacionSprayPorId(this.id)
    .subscribe((data: TxVacunacionSprayModel) => {
      
      this.modeloItem = data;
      console.log('object', this.modeloItem);
      this.cloneListImagen = [...this.modeloItem.listarTxVacunacionSprayFotos];
      this.updateRowGroupMetaData();
      this.listImagen();
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  getAsignaValoresVacunacionPorId() {

  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.modeloItem.listarTxVacunacionSprayDetalle) {
      for (let i = 0; i < this.modeloItem.listarTxVacunacionSprayDetalle.length; i++) {
        let rowData = this.modeloItem.listarTxVacunacionSprayDetalle[i];
        let brand = rowData.descripcionProcesoSpray;
        if (i === 0) {
            this.rowGroupMetadata[brand] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.modeloItem.listarTxVacunacionSprayDetalle[i - 1];
          let previousRowGroup = previousRowData.descripcionProcesoSpray;
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
    if (this.modeloItem.listarTxVacunacionSprayFotos.length > 0 ) {
      this.modeloItem.listarTxVacunacionSprayFotos.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listarTxVacunacionSprayFotos = [];
    event.forEach(x => {
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listarTxVacunacionSprayFotos.push(itemImagen);
        } else {
          this.modeloItem.listarTxVacunacionSprayFotos.push({
            idVacunacionSprayDetalle: 0,
            idVacunacionSpray: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listarTxVacunacionSprayFotos.push({
          idVacunacionSprayDetalle: 0,
          idVacunacionSpray: 0,
          foto: x.imagen
        });
      }
    });
  }

  onGrabar() {
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService.setUpdateTxVacunacionSpray(this.modeloItem)
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
    this.router.navigate(['/main/module-sp/panel-vacunacion-spray']);
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }
}
