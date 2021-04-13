import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem } from 'primeng';
import { TxSINMIModel } from '../../models/tx-sinmi.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { SinmiLocalService } from '../../services/sinmi-local.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { SeguridadService } from '../../../modulo-seguridad/services/seguridad.service';
import { UserContextService } from '../../../../services/user-context.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';

@Component({
  selector: 'app-panel-tx-sinmi-offline',
  templateUrl: './panel-tx-sinmi-offline.component.html',
  styleUrls: ['./panel-tx-sinmi-offline.component.css']
})
export class PanelTxSinmiOfflineComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Sistema Integral de Monitoreo Intestinal - Offline';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  modeloItem: any;
  listModelo: any[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displayDatosCierre: boolean;
  displayCierre: boolean;
  modeloDatosCierre: TxSINMIModel = new TxSINMIModel();

  saveFiltros: any[];

  constructor(private breadcrumbService: BreadcrumbService,
              private sessionService: SessionService,
              private menuDinamicoService: MenuDinamicoService,
              private sinmiService: SinmiLocalService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private seguridadService: SeguridadService,
              private userContextService: UserContextService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Sistema Integral de Monitoreo Intestinal - Offline' },
      { label: 'SINMI - Offline', routerLink: ['module-sm/panel-tx-sinmi-offline'] }
  ]);
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    
    this.modeloItem = new TxSINMIModel();
    
    this.modeloItem.idSINMI = 0;

    this.columnas = [
      { field: 'idSINMI', header: 'Nro' },
      { field: 'fecRegistro', header: 'Fecha' },
      { field: 'codigoEmpresa', header: 'Empresa' },
      { field: 'granja', header: 'Granja' },
      { field: 'edad', header: 'Edad' },
      { field: 'motivoVisita', header: 'Motivo Visita' },
      { field: 'usuarioCreacion', header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-tx-sinmi-offline')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

    this.onListar();
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.sinmiService
    .getTxSINMI()
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

  onConfirmCerrar(data: TxSINMIModel) {

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

  onToCerrar(data: TxSINMIModel) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.usuarioCierre = this.userContextService.getUsuario();
    data.fecCierre = new Date();
    this.subscription$ = this.sinmiService.setUpdateTxSINMI(data)
    .subscribe(resp => {
      this.displayCierre = false;
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).flgCerrado = false;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).fecCierre = null;
        this.listModelo.find(x => x.idSINMI === data.idSINMI).usuarioCierre = '';
        this.listModelo.find(x => x.idSINMI === data.idSINMI).idUsuarioCierre = 0;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxSINMIModel) {
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
    this.subscription$ = this.sinmiService.setDeleteTxSINMI(data.id)
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
    this.router.navigate(['/main/module-sm/tx-sinmi-create-offline']);
  }

  onToUpdate(data: any) {
    this.router.navigate(['/main/module-sm/tx-sinmi-update-offline', data.id]);
  }

  onDatosCierre(data: TxSINMIModel) {
    this.displayDatosCierre = true;
    this.modeloDatosCierre = data;
  }

}
