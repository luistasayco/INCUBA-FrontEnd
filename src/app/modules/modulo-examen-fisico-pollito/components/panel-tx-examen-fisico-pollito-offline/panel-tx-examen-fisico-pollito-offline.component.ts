import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { TxExamenFisicoPollitoModel } from '../../models/tx-examen-fisico-pollito';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { ExamenFisicoPollitoLocalService } from '../../services/examen-fisico-pollito-local.service';
import { ExamenFisicoPollitoService } from '../../services/examen-fisico-pollito.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { UserContextService } from '../../../../services/user-context.service';
import { variableGlobal } from 'src/app/interface/variable-global.interface';

@Component({
  selector: 'app-panel-tx-examen-fisico-pollito-offline',
  templateUrl: './panel-tx-examen-fisico-pollito-offline.component.html',
  styleUrls: ['./panel-tx-examen-fisico-pollito-offline.component.css'],
})
export class PanelTxExamenFisicoPollitoOfflineComponent
  implements OnInit, OnDestroy
{
  // Titulo del componente
  titulo = 'Examen Físico (Offline)';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloItem: TxExamenFisicoPollitoModel;
  listModelo: TxExamenFisicoPollitoModel[];

  columnas: any[];

  subscription$: Subscription;

  // Variables para eliminar
  displaySave: boolean;
  displayDatosCierre: boolean;

  modeloDatosCierre: TxExamenFisicoPollitoModel =
    new TxExamenFisicoPollitoModel();

  interval;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private sessionService: SessionService,
    private menuDinamicoService: MenuDinamicoService,
    private examenFisicoPollitoLocalService: ExamenFisicoPollitoLocalService,
    private examenFisicoPollitoService: ExamenFisicoPollitoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public lenguageService: LanguageService,
    public userContextService: UserContextService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Examen Físico' },
      {
        label: 'Examen Físico (Offline)',
        routerLink: ['module-ef/panel-tx-examen-fisico-pollito-offline'],
      },
    ]);
  }

  ngOnInit(): void {
    this.modeloItem = new TxExamenFisicoPollitoModel();

    this.columnas = [
      { field: 'idExamenFisico', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'calificacion', header: 'Calificacion' },
      { field: 'descripcionCalidad', header: 'Calidad' },
      { field: 'usuarioCreacion', header: 'Usuario' },
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService
      .getObtieneOpciones('app-panel-tx-examen-fisico-pollito-offline')
      .subscribe((acces) => {
        this.buttonAcces = acces;
      });

    this.onListar();
    this.onUpdateDataVistaUsuario();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.examenFisicoPollitoLocalService
      .getExamenFisicoPollito()
      .subscribe(
        (resp) => {
          if (resp) {
            let filterData = [...resp].filter((x) => x.flgMigrado === false);
            this.listModelo = filterData;
            // this.listModelo = resp;
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onConfirmCerrar(data: TxExamenFisicoPollitoModel) {
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
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.fecCierre = new Date();
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.usuarioCierre = this.sessionService.getItemDecrypt('usuario');
    this.subscription$ = this.examenFisicoPollitoLocalService
      .setUpdateTxExamenFisicoPollito(data)
      .subscribe(
        (resp) => {
          if (resp) {
            this.mensajePrimeNgService.onToExitoMsg(
              this.globalConstants.msgExitoSummary,
              this.globalConstants.msgExitoDetail
            );
          }
        },
        (error) => {
          this.listModelo.find((x: any) => x.id === data.id).flgCerrado = false;
          this.listModelo.find(
            (x) => x.idExamenFisico === data.idExamenFisico
          ).fecCierre = null;
          this.listModelo.find(
            (x) => x.idExamenFisico === data.idExamenFisico
          ).usuarioCierre = '';
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onConfirmEliminar(data: any) {
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
    this.subscription$ = this.examenFisicoPollitoLocalService
      .setDeleteTxExamenFisicoPollito(data.id)
      .subscribe(
        (resp) => {
          if (resp) {
            this.listModelo = [...this.listModelo].filter(
              (x: any) => x.id !== data.id
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
    this.router.navigate([
      '/main/module-ef/create-tx-examen-fisico-pollito-offline',
    ]);
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
    this.subscription$ = this.examenFisicoPollitoService
      .setInsertFromSyncExamenFisicoPollito(data)
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
            await this.examenFisicoPollitoService
              .setInsertFromSyncExamenFisicoPollito(item)
              .toPromise()
              .then(async (result: any) => {
                if (result && 'resultadoCodigo' in result) {
                  if (result.resultadoCodigo === 0) {
                    await this.examenFisicoPollitoLocalService
                      .setDeleteTxExamenFisicoPollito(item.id)
                      .toPromise();
                  }
                }
              })
              .catch((error) => {
                console.log(
                  'setInsertFromSyncExamenFisicoPollito',
                  item,
                  error
                );
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
    this.subscription$ = new Subscription();
    data.flgEnModificacion = true;
    this.subscription$ = this.examenFisicoPollitoLocalService
      .setUpdateTxExamenFisicoPollito(data)
      .subscribe(
        (resp) => {
          if (resp) {
            this.router.navigate([
              '/main/module-ef/update-tx-examen-fisico-pollito-offline',
              data.id,
            ]);
          }
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(null, error);
        }
      );
  }

  onDatosCierre(data: TxExamenFisicoPollitoModel) {
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
