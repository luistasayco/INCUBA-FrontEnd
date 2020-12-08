import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { GoogleDriveFilesModel } from '../../models/google-drive-files.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

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

  constructor(private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idGoogleDrive = params.id;
      this.onListar();
    });
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getGoogleDriveFilesPorId(this.idGoogleDrive)
    .subscribe((resp: GoogleDriveFilesModel[]) => {
      if (resp) {
          this.listModelo = resp;
          console.log('this.listModelo ', this.listModelo );
        }
      },
      (error) => {
        console.log('error', error);
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
          console.log(resp);
          let file = new window.Blob([resp.body], {type: resp.body.type});
          console.log(file);
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
}
