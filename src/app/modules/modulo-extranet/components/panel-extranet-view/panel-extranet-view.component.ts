import { Component, OnInit } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../services/extranet.service';
import { GoogleDriveFilesModel } from '../../models/google-drive-files.model';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-panel-extranet-view',
  templateUrl: './panel-extranet-view.component.html',
  styleUrls: ['./panel-extranet-view.component.css']
})
export class PanelExtranetViewComponent implements OnInit {

  // Titulo del componente
  titulo = 'Extranet';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  listModelo: GoogleDriveFilesModel[] = [];

  subscription$: Subscription;

  constructor(private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Extranet' },
      { label: 'Extranet', routerLink: ['module-ex/panel-extranet-view'] }
    ]);
  }

  ngOnInit(): void {

    this.onListar();
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.extranetService.getAllEmpresaPorUsuario()
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

  goGetFolderPorId(data: GoogleDriveFilesModel) {
    console.log(data);
    this.router.navigate(['/main/module-ex/panel-extranet-folder', data.idGoogleDrive]);
  }

}
