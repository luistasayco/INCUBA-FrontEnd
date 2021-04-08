import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { TxSIMModel } from '../../models/tx-sim.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SimLocalService } from '../../services/sim-local.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { UserContextService } from '../../../../services/user-context.service';

@Component({
  selector: 'app-panel-tx-sim-offline',
  templateUrl: './panel-tx-sim-offline.component.html',
  styleUrls: ['./panel-tx-sim-offline.component.css']
})
export class PanelTxSimOfflineComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Sistema Integrado Monitoreo - Offline';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloItem: TxSIMModel;
  listModelo: any[];

  columnas: any[];

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  modeloDatosCierre: TxSIMModel = new TxSIMModel();

  constructor(private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService,
              private simService: SimLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private userContextService: UserContextService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Sistema Integración Monitoreo' },
      { label: 'SIM  - Offline', routerLink: ['module-si/panel-tx-sim-offline'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.onListar();

    this.columnas = [
      { field: 'idExamenFisico', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'granja', header: 'Granja' },
      { field: 'edad', header: 'Edad' },
      { field: 'zona', header: 'Zona' },
      { field: 'usuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-sim-offline')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService
    .getTxSIM()
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

  onConfirmCerrar(data: TxSIMModel) {

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

  onToCerrar(data: TxSIMModel) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.usuarioCierre = this.userContextService.getUsuario();
    data.fecCierre = new Date();
    this.subscription$ = this.simService.setUpdateTxSIM(data)
    .subscribe(resp => {
        this.displayCierre = false;
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idSIM === data.idSIM).flgCerrado = false;
        this.listModelo.find(x => x.idSIM === data.idSIM).fecCierre = null;
        this.listModelo.find(x => x.idSIM === data.idSIM).usuarioCierre = '';
        this.listModelo.find(x => x.idSIM === data.idSIM).idUsuarioCierre = 0;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxSIMModel) {
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
    this.subscription$ = this.simService.setDeleteTxSIM(data.id)
    .subscribe(resp => {
      if (resp) {
        this.listModelo = [...this.listModelo].filter(x => x.id !== data.id);
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      }},
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToCreate() {
    this.router.navigate(['/main/module-si/tx-sim-create-offline']);
  }

  onToUpdate(data: any) {
    this.router.navigate(['/main/module-si/tx-sim-update-offline', data.id]);
  }

  onDatosCierre(data: TxSIMModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }
}
