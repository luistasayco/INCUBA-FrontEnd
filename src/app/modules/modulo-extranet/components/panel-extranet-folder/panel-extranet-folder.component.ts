import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { GoogleDriveFilesModel } from '../../models/google-drive-files.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { UserContextService } from '../../../../services/user-context.service';
import { MenuItem } from 'primeng/api';
import { Label } from 'ng2-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-panel-extranet-folder',
  templateUrl: './panel-extranet-folder.component.html',
  styleUrls: ['./panel-extranet-folder.component.css']
})
export class PanelExtranetFolderComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Extranet';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  listModelo: GoogleDriveFilesModel[] = [];
  modeloSeleccionadoVisualizar: GoogleDriveFilesModel = new GoogleDriveFilesModel();

  subscription$: Subscription;

  idGoogleDrive: string;
  nameGoogleDrive: string;
  band: string;
  correlativo: number = 0;
  typeFile: 'application/vnd.google-apps.folder';

  displayDescarga: boolean;
  displayVisualizar: boolean;
  displayVisualizarCustom: boolean;
  dataVisorCustom: any;

  items: MenuItem[];

  constructor(private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private readonly route: ActivatedRoute,
              private menuDinamicoService: MenuDinamicoService,
              private userContextService: UserContextService) { }

  ngOnInit(): void {
    this.items = [];
    this.route.queryParamMap
    .pipe(
      map((params) => {
        console.log('params', params);
        this.idGoogleDrive =  params.get('id');
        this.nameGoogleDrive =  params.get('name');
        this.band =  params.get('band');
      })
    )
    .subscribe(() => {
      this.onListar() ;
    });

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-extranet-folder')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

    
  }

  onListar() {
    if (this.band === 'S') {
      this.correlativo = 1;
      this.items.push({label: this.nameGoogleDrive, id: this.idGoogleDrive, tabindex: this.correlativo.toString(), target: this.band});
    }
    
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getGoogleDriveFilesPorId(this.idGoogleDrive)
    .subscribe((resp: GoogleDriveFilesModel[]) => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onListarChildern(data: GoogleDriveFilesModel) {
    if (data.mimeType === 'application/vnd.google-apps.folder') {
      this.correlativo += 1;
      this.router.navigate(['/main/module-ex/panel-extranet-folder'],  { queryParams: { id: data.idGoogleDrive, name: data.names, band: 'N'}});
      this.items.push({label: data.names, id: data.idGoogleDrive, tabindex: this.correlativo.toString(), target: 'N'});
    } else {
      this.onToRowDownload(data);
    }
  }

  goBreadCrumd(event: MenuItem) {

    if (event.target === 'S') {
      this.router.navigate(['/main/module-ex/panel-extranet-view']);
    } else {
      this.items = [...this.items].filter(xFila => Number(xFila.tabindex) <= Number(event.tabindex))

      this.router.navigate(['/main/module-ex/panel-extranet-folder'],  { queryParams: { id: event.id, name: event.label, band: 'N'}});
    }
    

  }

  onToRowDownload(modelo: GoogleDriveFilesModel) {
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
          // let file = new window.Blob([resp.body], {type: resp.body.type});
          saveAs(new Blob([resp.body], {type: resp.body.type}), modelo.names);
          // saveAs(new Blob([resp], {type: 'application/pdf'}), `RegistroEquipo#${modelo.idRegistroEquipo.toString()}`);
          // let fileURL = window.URL.createObjectURL(file);
          // window.open(fileURL, '_blank');
          this.displayDescarga = false;
          break;
      }
    },
      (error) => {
        this.displayDescarga = false;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onToVisorCustom(modelo: GoogleDriveFilesModel) {
    if (modelo.mimeType === 'application/pdf' || 
        modelo.mimeType === 'audio/mpeg' ||
        modelo.mimeType === 'image/jpeg' ||
        modelo.mimeType === 'image/png' ||
        modelo.mimeType === 'video/mp4'){
          this.modeloSeleccionadoVisualizar = modelo;
          this.displayVisualizar = true;
          this.subscription$ = new Subscription();
          this.subscription$ = this.extranetService.getDownloadTxRegistroDocumento(modelo.idGoogleDrive)
          .subscribe((resp: any) => {
            switch (resp.type) {
              case HttpEventType.DownloadProgress:
                this.mensajePrimeNgService.onToInfoMsg(null,  'EN PROCESO');
                break;
              case HttpEventType.Response:
                this.mensajePrimeNgService.onToInfoMsg(null, 'DESCARGA COMPLETA');
                this.dataVisorCustom = new Blob([resp.body], {type: resp.body.type});
                // this.dataVisorCustom =resp;
                this.displayVisualizarCustom = true;
                this.displayVisualizar = false;
                break;
            }
          },
            (error) => {
              this.displayVisualizar = false;
              this.mensajePrimeNgService.onToErrorMsg(null, error);
            });
    } else {
      this.mensajePrimeNgService.onToInfoMsg(null,  'FORMATO SOLO SE PUEDE DESCARGAR');
    }
  }
  ngOnDestroy() {
    this.items = [];
  }

  
}
