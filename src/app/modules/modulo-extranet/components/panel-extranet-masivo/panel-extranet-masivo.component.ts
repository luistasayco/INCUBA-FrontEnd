import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { PlantaModel } from '../../../modulo-compartido/models/planta.model';
import { TxRegistroDocumentoModel } from '../../models/tx-registro-documento.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { CompartidoService } from '../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { LanguageService } from '../../../../services/language.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { UserContextService } from '../../../../services/user-context.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { TipoExplotacionModel } from '../../models/tipo-explotacion.model';
import { SubTipoExplotacionModel } from '../../models/sub-tipo-explotacion.model';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { variableGlobal } from '../../../../interface/variable-global.interface';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-extranet-masivo',
  templateUrl: './panel-extranet-masivo.component.html',
  styleUrls: ['./panel-extranet-masivo.component.css']
})
export class PanelExtranetMasivoComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Extranet - Masivo';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemPlanta: SelectItem[];
  listItemTipoExplotacion: SelectItem[];
  listItemSubTipoExplotacion: SelectItem[];

  // Variables de dato seleccionado
  selectedPlanta: any;
  selectedTipoExplotacion: any;
  selectedSubTipoExplotacion: any;

  modeloPlanta: PlantaModel = new PlantaModel();

  subscription$: Subscription;

  // Archivos a subir
  uploadedFiles: any[] = [];
  isEnvioArchivo = false;
  progress = 0;

  constructor(private extranetService: ExtranetService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public lenguageService: LanguageService,
              private breadcrumbService: BreadcrumbService,
              private userContextService: UserContextService,
              private menuDinamicoService: MenuDinamicoService) { 
    this.breadcrumbService.setItems([
      { label: 'Módulo Extranet' },
      { label: 'Registro Masivo', routerLink: ['module-ex/panel-extranet'] }
    ]);
  }

  ngOnInit(): void {
    this.getToObtieneTipoExplotacion();
    this.getToObtienePlantas();

    this.selectedPlanta = null;
    this.selectedTipoExplotacion = null;
    this.selectedSubTipoExplotacion = null;

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-extranet-masivo')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
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

  getToObtienePlantas() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.compartidoService.getPlantaAll()
    .subscribe((data: PlantaModel[]) => {
      this.listItemPlanta = [];
      for (let item of data) {
        this.listItemPlanta.push({ label: item.descripcionEmpresa + '/' + item.descripcion, value:{id: item.codigoPlanta , name: item.descripcionEmpresa, code: item.codigoEmpresa, planta: item.descripcion} });
      }
    });
  }
 
  myUploader(event: any) {
    this.uploadedFiles = [];
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.onSaveData();
  }

  onSaveData() {

    if (this.selectedPlanta === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Planta');
      return;
    }

    if (this.selectedTipoExplotacion === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Tipo Explotación');
      return;
    }

    if (this.selectedSubTipoExplotacion === null) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccionar Sub Tipo Explotación');
      return;
    }
   
    let listRegistroDocumento: TxRegistroDocumentoModel[] = [];

    this.selectedPlanta.forEach(element => {
      let modeloRegistroDocumento: TxRegistroDocumentoModel = new TxRegistroDocumentoModel();
      modeloRegistroDocumento.idDocumento = 0;
      modeloRegistroDocumento.idTipoExplotacion = this.selectedTipoExplotacion.value;
      modeloRegistroDocumento.descripcionTipoExplotacion = this.selectedTipoExplotacion.label;
      modeloRegistroDocumento.idSubTipoExplotacion = this.selectedSubTipoExplotacion.value;
      modeloRegistroDocumento.descripcionSubTipoExplotacion = this.selectedSubTipoExplotacion.label;
      modeloRegistroDocumento.codigoEmpresa = element.value.code;
      modeloRegistroDocumento.descripcionEmpresa = element.value.name;
      modeloRegistroDocumento.codigoPlanta = element.value.id;
      modeloRegistroDocumento.descripcionPlanta = element.value.planta;
      modeloRegistroDocumento.regUsuario = this.userContextService.getIdUsuario();
      modeloRegistroDocumento.regEstacion = variableGlobal._DISPOSITIVO.nombreDispositivo;
      modeloRegistroDocumento.flgCerrado = false;
  
      listRegistroDocumento.push(modeloRegistroDocumento);
    });
    const apiFinal = JSON.stringify(listRegistroDocumento);
    this.registerReq(apiFinal, this.uploadedFiles);
  }

  registerReq(data, formData) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService
      .setInsertTxRegistroDocumentoList(data, formData)
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
              this.mensajePrimeNgService.onToExitoMsg(null, event.body);
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        },
        (error) => {
          this.isEnvioArchivo = false;
          this.progress = 0;
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

}
