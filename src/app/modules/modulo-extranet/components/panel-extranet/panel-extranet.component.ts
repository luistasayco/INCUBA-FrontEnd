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

  modeloDatosCierre: TxRegistroDocumentoModel  = new TxRegistroDocumentoModel();

  // Archivos a subir
  uploadedFiles: any[] = [];
  isEnvioArchivo = false;
  progress = 0;

  // Variables para agregar files
  isNuveo = false;

  constructor(private extranetService: ExtranetService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private breadcrumbService: BreadcrumbService,
              private confirmationService: ConfirmationService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private seguridadService: SeguridadService,
              public app: LayoutComponent ) {
    this.breadcrumbService.setItems([
        { label: 'Mod. Extranet' },
        { label: 'Registro Documentos', routerLink: ['module-ex/panel-extranet'] }
    ]);
  }
  ngOnDestroy() {

    // Guardar los filtros en la session
    // this.sessionService.setItemEncrypt('filter-ex-fecha-inicio', this.modeloFind.fecInicio);
    // this.sessionService.setItemEncrypt('filter-ex-fecha-fin', this.modeloFind.fecFin);

    // if (this.selectedTipoExplotacion !== null) {
    //   this.sessionService.setItemEncrypt('filter-ex-selectedTipoExplotacion', this.selectedTipoExplotacion);
    // }
    // if (this.selectedSubTipoExplotacion !== null) {
    //   this.sessionService.setItemEncrypt('filter-ex-selectedSubTipoExplotacion', this.selectedSubTipoExplotacion);
    // }
    // if (this.selectedEmpresa !== null) {
    //   this.sessionService.setItemEncrypt('filter-ex-selectedEmpresa', this.selectedEmpresa);
    // }
    // if (this.selectedPlanta !== null) {
    //   this.sessionService.setItemEncrypt('filter-ex-selectedPlanta', this.selectedPlanta);
    // }

    // this.app.menuMode = 'static';

    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit() {
    // this.app.menuMode = 'overlay';
    this.getToObtieneTipoExplotacion();
    this.getToObtieneEmpresa();

    this.selectedEmpresa = null;
    this.selectedPlanta = null;
    this.selectedTipoExplotacion = null;
    this.selectedSubTipoExplotacion = null;

    this.modeloFind.fecInicio = new Date();
    this.modeloFind.fecFin = new Date();

    // if (this.sessionService.getItem('filter-ex-selectedTipoExplotacion')) {
    //   console.log('this.selectedTipoExplotacion', this.sessionService.getItemDecrypt('filter-ex-selectedTipoExplotacion'));
    //   if (this.sessionService.getItemDecrypt('filter-ex-selectedTipoExplotacion') !== 'null') {
    //     this.selectedTipoExplotacion = this.sessionService.getItemDecrypt('filter-ex-selectedTipoExplotacion');
    //     if (this.selectedTipoExplotacion) {
    //       console.log('this.selectedTipoExplotacion', this.selectedTipoExplotacion);
    //       this.getOnChangeTipoExplotacion();
    //     }
    //   }

    //   this.modeloFind.fecInicio = new Date(this.sessionService.getItemDecrypt('filter-ex-fecha-inicio'));
    //   this.modeloFind.fecFin = new Date(this.sessionService.getItemDecrypt('filter-ex-fecha-fin'));
    //   if (this.sessionService.getItemDecrypt('filter-ex-selectedEmpresa') !== 'null') {
    //     this.selectedEmpresa = this.sessionService.getItemDecrypt('filter-ex-selectedEmpresa');
    //     if (this.selectedEmpresa) {
    //       this.getOnChangeEmpresa();
    //     }
    //   }
    // }

    this.columnas = [
      // { field: 'idDocumento', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa'},
      { field: 'codigoPlanta', header: 'Planta'},
      // { field: 'subTipoExplotacion', header: 'Sub Tipo Explotación'},
      { field: 'nombreDocumento', header: 'Nombre Documento' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-extranet')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
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
    this.modeloPlanta.codigoEmpresa = value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoService.getPlantaPorEmpresa(this.modeloPlanta)
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcion, value: item.codigoPlanta });
      }
    });
  }

  getOnChangeModelo() {
  }

  getOnChangePlanta(){
  }

  onListar() {
    this.modeloFind.idSubTipoExplotacion = this.selectedSubTipoExplotacion === null ? 0 : Number(this.selectedSubTipoExplotacion.value);

    if (this.modeloFind.idSubTipoExplotacion === 0) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Sub Tipo Explotación');
      return;
    }

    this.modeloFind.codigoEmpresa = this.selectedEmpresa === null ? '' : this.selectedEmpresa.value;
    this.modeloFind.codigoPlanta = this.selectedPlanta === null ? '' : this.selectedPlanta.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getTxRegistroDocumento(this.modeloFind)
    // this.subscription$ = this.extranetService.getTxRegistroDocumentoDrive()
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
              console.log('Solicitud ha sido hecha!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Se ha recibido el encabezado de respuesta!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              this.isEnvioArchivo = false;
              this.mensajePrimeNgService.onToExitoMsg(null, event.body);
              setTimeout(() => {
                this.progress = 0;
                this.onListar();
              }, 1500);
          }
          this.isNuveo = false;
        },
        (error) => {
          this.isEnvioArchivo = false;
          this.isNuveo = false;
          this.progress = 0;
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onConfirmEliminar(data: TxRegistroDocumentoModel) {
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
    console.log('modelo', modelo);
    this.extranetService.getDownloadTxRegistroDocumento(modelo.idGoogleDrive)
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
          // saveAs(new Blob([resp], {type: 'application/pdf'}), 'Registros');
          // saveAs(new Blob([resp], {type: 'application/pdf'}), `RegistroEquipo#${modelo.idRegistroEquipo.toString()}`);
          let fileURL = window.URL.createObjectURL(file);
          window.open(fileURL, '_blank');
          break;
      }
    },
      (error) => {
        console.log('error', error);
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
