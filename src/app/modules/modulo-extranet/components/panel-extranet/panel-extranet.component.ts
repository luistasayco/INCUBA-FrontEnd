import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { PlantaModel } from '../../../modulo-compartido/models/planta.model';
import { TxRegistroDocumentoModel } from '../../models/tx-registro-documento.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { CompartidoService } from '../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { LanguageService } from '../../../../services/language.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';
import { TipoExplotacionModel } from '../../models/tipo-explotacion.model';
import { SubTipoExplotacionModel } from '../../models/sub-tipo-explotacion.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { LayoutComponent } from '../../../../layout/layout.component';
import { ProgressStatusEnum, ProgressStatus } from '../../interfaces/progress-status';
import { UserContextService } from '../../../../services/user-context.service';
import { variableGlobal } from '../../../../interface/variable-global.interface';
import { PlantaPorUsuarioModel } from '../../../modulo-seguridad/models/planta-por-usuario';

@Component({
  selector: 'app-panel-extranet',
  templateUrl: './panel-extranet.component.html',
  styleUrls: ['./panel-extranet.component.css']
})
export class PanelExtranetComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Extranet';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  listItemPlanta: SelectItem[];
  listItemTipoExplotacion: SelectItem[];
  listItemSubTipoExplotacion: SelectItem[];

  // Variables de dato seleccionado
  selectedEmpresa: any;
  selectedPlanta: any;
  selectedTipoExplotacion: any;
  selectedSubTipoExplotacion: any;

  modeloPlanta: PlantaModel = new PlantaModel();

  // Opcion Buscar
  modeloFind: TxRegistroDocumentoModel = new TxRegistroDocumentoModel();
  listModelo: TxRegistroDocumentoModel[];

  columnas: any[];

  subscription$: Subscription;

  displayDatosCierre: boolean;
  displayDescarga: boolean;

  modeloDatosCierre: TxRegistroDocumentoModel  = new TxRegistroDocumentoModel();

  // Archivos a subir
  uploadedFiles: any[] = [];
  isEnvioArchivo = false;
  progress = 0;

  // Variables para agregar files
  isNuveo = false;

  saveFiltros: any[];

  constructor(private extranetService: ExtranetService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private breadcrumbService: BreadcrumbService,
              private confirmationService: ConfirmationService,
              private userContextService: UserContextService,
              private menuDinamicoService: MenuDinamicoService,
              private sessionService: SessionService,
              private seguridadService: SeguridadService ) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Extranet' },
        { label: 'Registro Documentos', routerLink: ['module-ex/panel-extranet'] }
    ]);
  }
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    // Guardar los filtros en la session
    this.saveFiltros = [];
    this.saveFiltros.push(
      { fecInicio: this.modeloFind.fecInicio,
        fecFin: this.modeloFind.fecFin,
        selectedEmpresa: this.selectedEmpresa,
        selectedPlanta: this.selectedPlanta,
        selectedTipoExplotacion: this.selectedTipoExplotacion,
        selectedSubTipoExplotacion: this.selectedSubTipoExplotacion
    });

    this.sessionService.setItem('filter-ex', this.saveFiltros);

  }

  ngOnInit() {
    this.getToObtieneTipoExplotacion();
    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedTipoExplotacion = null;
    this.selectedSubTipoExplotacion = null;

    this.modeloFind.fecInicio = new Date();
    this.modeloFind.fecFin = new Date();

    this.columnas = [
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa'},
      { field: 'codigoPlanta', header: 'Planta'},
      { field: 'nombreDocumento', header: 'Nombre Documento' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-extranet')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  
    if (this.sessionService.getItem('filter-ex')) {
      this.saveFiltros = this.sessionService.getItem('filter-ex');
      this.modeloFind.fecInicio = new Date(this.saveFiltros[0].fecInicio);
      this.modeloFind.fecFin = new Date(this.saveFiltros[0].fecFin);
      this.selectedEmpresa = this.saveFiltros[0].selectedEmpresa === undefined ? null : this.saveFiltros[0].selectedEmpresa;
      this.selectedTipoExplotacion = this.saveFiltros[0].selectedTipoExplotacion === undefined ? null : this.saveFiltros[0].selectedTipoExplotacion ;
      

      if (this.selectedEmpresa !== null) {
        this.getOnChangeEmpresa();
      } else {
        this.selectedPlanta = this.saveFiltros[0].selectedPlanta === undefined ? null : this.saveFiltros[0].selectedPlanta ;
      }

      if (this.selectedTipoExplotacion !== null) {
        this.getToObtieneSubTipoExplotacion();
      } else {
        this.selectedSubTipoExplotacion = this.saveFiltros[0].selectedSubTipoExplotacion === undefined ? null : this.saveFiltros[0].selectedSubTipoExplotacion ;
      }

      this.onListar();
    }
  
  }

  onToBuscar() {
    this.onListar();
  }

  getToObtieneTipoExplotacion() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getTipoExplotacionPorUsuario()
    .subscribe((data: TipoExplotacionModel[]) => {
      this.listItemTipoExplotacion = [];
      for (let item of data) {
        this.listItemTipoExplotacion.push({ label: item.descripcionTipoExplotacion, value: item.idTipoExplotacion });
      }
    });
  }

  getOnChangeTipoExplotacion() {
    if (this.selectedTipoExplotacion !== null) {
      this.getToObtieneSubTipoExplotacion();
    }
  }

  getToObtieneSubTipoExplotacion() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getSubTipoExplotacionPorUsuario(this.selectedTipoExplotacion.value)
    .subscribe((data: SubTipoExplotacionModel[]) => {
      this.listItemSubTipoExplotacion = [];
      for (let item of data) {
        this.listItemSubTipoExplotacion.push({ label: item.descripcionSubTipoExplotacion, value: item.idSubTipoExplotacion });
      }

      if (this.saveFiltros.length > 0) {
        this.selectedSubTipoExplotacion = this.saveFiltros[0].selectedSubTipoExplotacion === undefined ? null : this.saveFiltros[0].selectedSubTipoExplotacion ;
      }

    });
  }

  getToObtieneEmpresa() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.seguridadService.getEmpresaConAccesoPorUsuario()
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
    } else {
      this.listItemPlanta = [];
    }
    this.selectedPlanta = null;
  }

  getToObtienePlantaPorEmpresa(value: string) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.seguridadService.getPlantaConAccesoPorUsuarioPorEmpresa(value)
    .subscribe((data: PlantaPorUsuarioModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcionPlanta, value: item.codigoPlanta });
      }

      if (this.saveFiltros.length > 0) {
        this.selectedPlanta = this.saveFiltros[0].selectedPlanta === undefined ? null : this.saveFiltros[0].selectedPlanta ;
      }

    });
  }

  getOnChangeModelo() {
  }

  getOnChangePlanta(){
  }

  onListar() {
    this.modeloFind.idSubTipoExplotacion = this.selectedSubTipoExplotacion === null ? 0 : Number(this.selectedSubTipoExplotacion.value);

    this.modeloFind.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.modeloFind.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getTxRegistroDocumento(this.modeloFind)
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

  myUploader(event: any) {
    this.uploadedFiles = [];
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.onSaveData();
  }

  onToVisualizar(data: TxRegistroDocumentoModel) {

  }

  onSaveData() {

    if (this.selectedTipoExplotacion === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Tipo Explotación');
      return;
    }
    if (this.selectedSubTipoExplotacion === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Sub Tipo Explotación');
      return;
    }
    if (this.selectedEmpresa === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Empresa');
      return;
    }
    if (this.selectedPlanta === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Planta');
      return;
    }

    let modeloRegistroDocumento: TxRegistroDocumentoModel = new TxRegistroDocumentoModel();
    modeloRegistroDocumento.idDocumento = 0;
    modeloRegistroDocumento.idTipoExplotacion = this.selectedTipoExplotacion.value;
    modeloRegistroDocumento.descripcionTipoExplotacion = this.selectedTipoExplotacion.label;
    modeloRegistroDocumento.idSubTipoExplotacion = this.selectedSubTipoExplotacion.value;
    modeloRegistroDocumento.descripcionSubTipoExplotacion = this.selectedSubTipoExplotacion.label;
    modeloRegistroDocumento.codigoEmpresa = this.selectedEmpresa.value;
    modeloRegistroDocumento.descripcionEmpresa = this.selectedEmpresa.label;
    modeloRegistroDocumento.codigoPlanta = this.selectedPlanta.value;
    modeloRegistroDocumento.descripcionPlanta = this.selectedPlanta.label;
    modeloRegistroDocumento.regUsuario = this.userContextService.getIdUsuario();
    modeloRegistroDocumento.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
    modeloRegistroDocumento.flgCerrado = false;
    const apiFinal = JSON.stringify(modeloRegistroDocumento);
    this.registerReq(apiFinal, this.uploadedFiles);
  }

  registerReq(data, formData) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService
      .setInsertTxRegistroDocumento(data, formData)
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.isEnvioArchivo = true;
              // console.log('Solicitud ha sido hecha!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Se ha recibido el encabezado de respuesta!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100) - 25;
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              this.isEnvioArchivo = false;
              this.progress = 100;
              this.isNuveo = false;
              this.mensajePrimeNgService.onToExitoMsg(null, event.body);
              setTimeout(() => {
                this.progress = 0;
                this.onListar();
              }, 1500);
          }
        },
        (error) => {
          this.isEnvioArchivo = false;
          this.isNuveo = false;
          this.progress = 0;
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onConfirmCerrar(data: TxRegistroDocumentoModel) {
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

  onToCerrar(data: TxRegistroDocumentoModel) {
    this.displayDatosCierre = true;
    this.subscription$ = new Subscription();

    this.subscription$ = this.extranetService.setUpdateStatusTxRegistroDocumento(data)
    .subscribe(resp => {
      this.listModelo.find((x: TxRegistroDocumentoModel) => x.idDocumento === data.idDocumento).flgCerrado = true;

      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.displayDatosCierre = false;
      },
      (error) => {
        this.listModelo.find((x: TxRegistroDocumentoModel) => x.idDocumento === data.idDocumento).flgCerrado = false;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
        this.displayDatosCierre = false;
      }
    );
  }

  onConfirmEliminar(data: TxRegistroDocumentoModel) {
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
    this.subscription$ = this.extranetService.setDeleteTxRegistroDocumento(data)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = [...this.listModelo].filter(x => x.idDocumento !== data.idDocumento);

      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, resp);
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowDownload(modelo: TxRegistroDocumentoModel) {
    this.displayDescarga = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getDownloadTxRegistroDocumento(modelo.idGoogleDrive)
    .subscribe((resp: any) => {
      switch (resp.type) {
        case HttpEventType.DownloadProgress:
          // let progressStatus: ProgressStatus =
          // {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((resp.loaded / resp.total) * 100)};
          this.mensajePrimeNgService.onToInfoMsg(null,  'EN PROCESO');
          // this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((resp.loaded / resp.total) * 100)});
          break;
        case HttpEventType.Response:
          this.mensajePrimeNgService.onToInfoMsg(null, 'DESCARGA COMPLETA');
          let file = new window.Blob([resp.body], {type: resp.body.type});
          let fileURL = window.URL.createObjectURL(file);
          window.open(fileURL, '_blank');
          this.displayDescarga = false;
          break;
      }
    },
      (error) => {
        this.displayDescarga = false;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onToCreate() {
    this.isNuveo = true;
  } 

  onToRegresar() {
    this.isNuveo = false;
    this.onListar();
  }
}
