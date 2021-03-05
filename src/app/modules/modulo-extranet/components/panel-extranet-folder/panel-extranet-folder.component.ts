import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-panel-extranet-folder',
  templateUrl: './panel-extranet-folder.component.html',
  styleUrls: ['./panel-extranet-folder.component.css']
})
export class PanelExtranetFolderComponent implements OnInit {

  // Titulo del componente
  titulo = 'Extranet';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  listModelo: GoogleDriveFilesModel[] = [];

  subscription$: Subscription;

  idGoogleDrive: string;

  typeFile: 'application/vnd.google-apps.folder';

  displayDescarga: boolean;
  displayVisualizar: boolean;
  constructor(private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private readonly route: ActivatedRoute,
              private menuDinamicoService: MenuDinamicoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idGoogleDrive = params.id;
      this.onListar();
    });

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-extranet-folder')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onListar() {
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
      this.router.navigate(['/main/module-ex/panel-extranet-folder', data.idGoogleDrive]);
    } else {
      this.onToRowDownload(data);
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

  onToVisualizar(data: GoogleDriveFilesModel) {
    this.displayVisualizar = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getGetUrlFilePorId(data.idGoogleDrive, "", 'reader')
    .subscribe((resp: boolean) => {
      this.displayVisualizar = false;
      window.open(`https://drive.google.com/open?id=${data.idGoogleDrive}`, '_blank');
      },
      (error) => {
        this.displayVisualizar = false;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }
}
