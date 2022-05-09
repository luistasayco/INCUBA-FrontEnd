import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { TxVacunacionSprayModel } from '../../models/tx-vacunacion-spray.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { EmpresaPorUsuarioModel } from '../../../modulo-seguridad/models/empresa-por-usuario';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { saveAs } from 'file-saver';
import { VacunacionSprayLocalService } from '../../services/vacunacion-spray-local.service';
import { VacunacionSprayService } from '../../services/vacunacion-spray.service';
import { UserContextService } from '../../../../services/user-context.service';
import { variableGlobal } from 'src/app/interface/variable-global.interface';

@Component({
  selector: 'app-panel-vacunacion-spray-offline',
  templateUrl: './panel-vacunacion-spray-offline.component.html',
  styleUrls: ['./panel-vacunacion-spray-offline.component.css'],
})
export class PanelVacunacionSprayOfflineComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Vacunación Spray - Offline';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloItem: TxVacunacionSprayModel;
  listModelo: any[];

  columnas: any[];

  subscription$: Subscription;

  // Variables para eliminar
  displaySave: boolean;
  displayDatosCierre: boolean;
  displayCierre: boolean;

  modeloDatosCierre: TxVacunacionSprayModel = new TxVacunacionSprayModel();
  interval;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private sessionService: SessionService,
    private menuDinamicoService: MenuDinamicoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public lenguageService: LanguageService,
    private vacunacionSprayLocalService: VacunacionSprayLocalService,
    private vacunacionSprayService: VacunacionSprayService,
    private userContextService: UserContextService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Vacunación Spray - Offline' },
      {
        label: 'Vacunación Spray - Offline',
        routerLink: ['module-sp/panel-vacunacion-spray-offline'],
      },
    ]);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.modeloItem = new TxVacunacionSprayModel();

    this.onListar();
    this.onUpdateDataVistaUsuario();
    this.columnas = [
      { header: 'Nro' },
      { header: 'Fecha' },
      { header: 'Empresa' },
      { header: 'Planta' },
      { header: 'Unidad' },
      { header: 'Usuario' },
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService
      .getObtieneOpciones('app-panel-vacunacion-spray-offline')
      .subscribe((acces) => {
        this.buttonAcces = acces;
      });
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayLocalService
      .getTxVacunacionSpray()
      .subscribe(
        (resp) => {
          if (resp) {
            this.listModelo = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onConfirmCerrar(data: TxVacunacionSprayModel) {
    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(
        null,
        'Registro seleccionado se encuentra CERRADO!!!'
      );
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
        this.mensajePrimeNgService.onToCancelMsg(
          this.globalConstants.msgCancelSummary,
          this.globalConstants.msgCancelDetail
        );
      },
    });
  }

  onToCerrar(data: any) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.fecCierre = new Date();
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.usuarioCierre = this.userContextService.getUsuario();
    this.subscription$ = this.vacunacionSprayLocalService
      .setUpdateTxVacunacionSpray(data)
      .subscribe(
        (resp) => {
          if (resp) {
            this.displayCierre = false;
            this.mensajePrimeNgService.onToExitoMsg(
              this.globalConstants.msgExitoSummary,
              this.globalConstants.msgExitoDetail
            );
          }
        },
        (error) => {
          this.displayCierre = false;
          this.listModelo.find((x) => x.id === data.id).flgCerrado = false;
          this.listModelo.find((x) => x.id === data.id).fecCierre = null;
          this.listModelo.find((x) => x.id === data.id).idUsuarioCierre = 0;
          this.listModelo.find((x) => x.id === data.id).usuarioCierre = '';
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onConfirmEliminar(data: TxVacunacionSprayModel) {
    if (data.flgCerrado) {
      this.mensajePrimeNgService.onToInfoMsg(
        null,
        'Registro seleccionado se encuentra CERRADO!!!'
      );
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
        this.mensajePrimeNgService.onToCancelMsg(
          this.globalConstants.msgCancelSummary,
          this.globalConstants.msgCancelDetail
        );
      },
    });
  }

  onToEliminar(data: any) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayLocalService
      .setDeleteTxVacunacionSpray(data.id)
      .subscribe(
        (resp) => {
          if (resp) {
            this.listModelo = [...this.listModelo].filter(
              (x) => x.id !== data.id
            );
            this.mensajePrimeNgService.onToExitoMsg(
              this.globalConstants.msgExitoSummary,
              this.globalConstants.msgExitoDetail
            );
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onToCreate() {
    this.router.navigate(['/main/module-sp/vacunacion-spray-create-offline']);
  }

  onToSync(data: any) {
    if (this.displaySave) {
      this.mensajePrimeNgService.onToErrorMsg(
        null,
        'Sincronización en curso...'
      );
      return;
    }

    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSprayService
      .setInsertFromSyncTxVacunacionSpray(data)
      .subscribe(
        (resp) => {
          this.mensajePrimeNgService.onToExitoMsg(
            this.globalConstants.msgExitoSummary,
            this.globalConstants.msgExitoDetail
          );
          this.onToEliminar(data);
          this.displaySave = false;
        },
        (error) => {
          this.displaySave = false;
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  async onToSyncAll() {
    if (this.displaySave) {
      this.mensajePrimeNgService.onToErrorMsg(
        null,
        'Sincronización en curso...'
      );
      return;
    }

    this.displaySave = true;
    if (variableGlobal.ESTADO_INTERNET) {
      if (this.listModelo) {
        if (this.listModelo.length > 0) {
          for (var _i = 0; _i < this.listModelo.length; _i++) {
            var item: any = this.listModelo[_i];
            await this.vacunacionSprayService
              .setInsertFromSyncTxVacunacionSpray(item)
              .toPromise()
              .then(async (result: any) => {
                if (result && 'resultadoCodigo' in result) {
                  if (result.resultadoCodigo === 0) {
                    await this.vacunacionSprayLocalService
                      .setDeleteTxVacunacionSpray(item.id)
                      .toPromise();
                  }
                }
              })
              .catch((error) => {
                console.log('setInsertFromSyncTxVacunacionSpray', item, error);
              });
          }
          this.mensajePrimeNgService.onToExitoMsg(
            this.globalConstants.msgExitoSummary,
            this.globalConstants.msgExitoDetail
          );
        }
      }

      this.displaySave = false;
    } else {
      this.displaySave = false;
      this.mensajePrimeNgService.onToErrorMsg(
        null,
        'No hay conexion a internet!'
      );
    }

    this.onListar();
  }

  onToUpdate(data: any) {
    this.router.navigate([
      '/main/module-sp/vacunacion-spray-update-offline',
      data.id,
    ]);
  }

  onDatosCierre(data: TxVacunacionSprayModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }

  onUpdateDataVistaUsuario() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.onListar();
    }, 60000);
  }
}
