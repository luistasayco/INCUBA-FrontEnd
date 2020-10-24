import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { TxRegistroEquipoModel } from '../../models/tx-registro-equipo.model';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng';
import { EmpresaModel } from '../../../modulo-compartido/models/empresa.model';
import { PlantaModel } from '../../../modulo-compartido/models/planta.model';
import { ModeloModel } from '../../../modulo-compartido/models/modelo.model';
import { CompartidoService } from '../../../modulo-compartido/services/compartido.service';
import { LanguageService } from '../../../../services/language.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';
import { SessionService } from '../../../../services/session.service';
import { ButtonAcces } from '../../../../models/acceso-button';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';

@Component({
  selector: 'app-panel-registro-equipo',
  templateUrl: './panel-registro-equipo.component.html',
  styleUrls: ['./panel-registro-equipo.component.css']
})
export class PanelRegistroEquipoComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Registros de Equipos';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
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

  displayDatosCierre: boolean;

  modeloDatosCierre: TxRegistroEquipoModel  = new TxRegistroEquipoModel();

  constructor(private registroEquipoService: RegistroEquipoService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private confirmationService: ConfirmationService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService) {
    this.breadcrumbService.setItems([
        { label: 'Modulo' },
        { label: 'Registro de Equipo', routerLink: ['module-re/panel-registro-equipo'] }
    ]);
  }
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.sessionService.setItemEncrypt('filter-re-idRegistroEquipo', this.modeloFind.idRegistroEquipo);
    this.sessionService.setItemEncrypt('filter-re-fecRegistroInicio', this.modeloFind.fecRegistroInicio);
    this.sessionService.setItemEncrypt('filter-re-fecRegistroFin', this.modeloFind.fecRegistroFin);
    this.sessionService.setItemEncrypt('filter-re-selectedEmpresa', this.selectedEmpresa);
    this.sessionService.setItemEncrypt('filter-re-selectedPlanta', this.selectedPlanta);
    this.sessionService.setItemEncrypt('filter-re-selectedModelo', this.selectedModelo);
  }

  ngOnInit() {

    this.getToObtieneEmpresa();
    this.getToObtieneModelo();

    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedModelo = null;

    this.modeloFind.fecRegistroInicio = new Date();
    this.modeloFind.fecRegistroFin = new Date();

    if (this.sessionService.getItem('filter-re-idRegistroEquipo')) {


      this.modeloFind.idRegistroEquipo = this.sessionService.getItemDecrypt('filter-re-idRegistroEquipo');
      this.modeloFind.fecRegistroInicio = new Date(this.sessionService.getItemDecrypt('filter-re-fecRegistroInicio'));
      this.modeloFind.fecRegistroFin = new Date(this.sessionService.getItemDecrypt('filter-re-fecRegistroFin'));
      if (this.sessionService.getItemDecrypt('filter-re-selectedEmpresa') !== 'null') {
        this.selectedEmpresa = this.sessionService.getItemDecrypt('filter-re-selectedEmpresa');
        if (this.selectedEmpresa) {
          this.getOnChangeEmpresa();
        }
      }
      if ( this.sessionService.getItemDecrypt('filter-re-selectedModelo') !== 'null') {
        this.selectedModelo = this.sessionService.getItemDecrypt('filter-re-selectedModelo');
      }
    }

    this.columnas = [
      { field: 'idRegistroEquipo', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'codigoPlanta', header: 'Planta' },
      { field: 'idModelo', header: 'Modelo' },
      { field: 'UsuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-registro-equipo')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  getToObtieneEmpresa() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoService.getEmpresa(this.modeloEmpresa)
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
    this.modeloPlanta.codigoEmpresa = value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoService.getPlantaPorEmpresa(this.modeloPlanta)
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
      if (this.sessionService.getItem('filter-re-selectedPlanta')) {
        this.selectedPlanta = this.sessionService.getItemDecrypt('filter-re-selectedPlanta');
        this.onListar();
      }
    });
  }

  getToObtieneModelo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.getModelo(this.modeloModelo)
    .subscribe((data: ModeloModel[]) => {
      this.listItemModelo = [];
      for (let item of data) {
        this.listItemModelo.push({ label: item.descripcion, value: item.codigoModelo });
      }
    });
  }

  getOnChangeModelo() {
  }

  getOnChangePlanta(){
  }

  onListar() {
    this.modeloFind.idRegistroEquipo = this.modeloFind.idRegistroEquipo === null ? 0 : this.modeloFind.idRegistroEquipo;
    this.modeloFind.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.modeloFind.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    this.modeloFind.codigoModelo = this.selectedModelo === null ? '' : this.selectedModelo.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.getTxRegistroEquipo(this.modeloFind)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmCerrar(data: TxRegistroEquipoModel) {

    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }

    this.confirmationService.confirm({
        message: this.globalConstants.subTitleCierre,
        header: this.globalConstants.titleCierre,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToCerrar(data);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToCerrar(data: TxRegistroEquipoModel) {
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    this.subscription$ = this.registroEquipoService.setUpdateStatusTxRegistroEquipo(data)
    .subscribe((resp: IMensajeResultadoApi) => {
        this.listModelo.find(x => x.idRegistroEquipo === data.idRegistroEquipo).flgCerrado = true;
        this.listModelo.find(x => x.idRegistroEquipo === data.idRegistroEquipo).fecCierre = new Date();
        this.listModelo
        .find(x => x.idRegistroEquipo === data.idRegistroEquipo)
        .usuarioCierre = this.sessionService.getItemDecrypt('usuario');

        this.mensajePrimeNgService.onToExitoMsg(null, resp);
      },
      (error) => {
        this.listModelo.find(x => x.idRegistroEquipo === data.idRegistroEquipo).flgCerrado = false;
        this.listModelo.find(x => x.idRegistroEquipo === data.idRegistroEquipo).fecCierre = null;
        this.listModelo.find(x => x.idRegistroEquipo === data.idRegistroEquipo).usuarioCierre = '';
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: any) {
    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToEliminar(data);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToEliminar(data: any) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.registroEquipoService.setDeleteTxRegistroEquipo(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idRegistroEquipo !== data.idRegistroEquipo);

      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectPDF(modelo: any) {

    if (!modelo.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Registro seleccionado se encuentra CERRADO!!!');
      return;
    }

    this.registroEquipoService.setPDFTxRegistroEquipo(modelo.idRegistroEquipo)
    .subscribe((resp: any) => {

      console.log(resp);

      // let file = new window.Blob([resp], {type: 'application/pdf'});
      saveAs(new Blob([resp], {type: 'application/pdf'}), 'Registros');
      // let fileURL = window.URL.createObjectURL(file);
      // window.open(fileURL, '_blank');
    },
      (error) => {
        console.log('error', error);
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onToCreate() {
    this.router.navigate(['/main/module-re/create-registro-equipo']);
  }

  onToUpdate(data: any) {
    this.router.navigate(['/main/module-re/update-registro-equipo', data.idRegistroEquipo]);
  }

  onDatosCierre(data: TxRegistroEquipoModel) {
    this.displayDatosCierre = true;

    this.modeloDatosCierre = data;
  }
}
