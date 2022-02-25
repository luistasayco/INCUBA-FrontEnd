import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonAcces } from '../../../../models/acceso-button';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { SelectItem, ConfirmationService } from 'primeng';
import { TxVacunacionSubCutaneaModel } from '../../models/tx-vacunacion-subcutanea.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { VacunacionSubcutaneaLocalService } from '../../services/vacunacion-subcutanea-local.service';
import { VacunacionSubcutaneaService } from '../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { UserContextService } from '../../../../services/user-context.service';

@Component({
  selector: 'app-panel-vacunacion-subcutanea-offline',
  templateUrl: './panel-vacunacion-subcutanea-offline.component.html',
  styleUrls: ['./panel-vacunacion-subcutanea-offline.component.css']
})
export class PanelVacunacionSubcutaneaOfflineComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Vacunación SubCutánea - Offline';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opciones de busqueda
  listItemEmpresa: SelectItem[];
  fecRegistroInicio: Date;
  fecRegistroFin: Date;

  // Variables de dato seleccionado
  selectedEmpresa: any;

  // Opcion Buscar
  modeloItem: TxVacunacionSubCutaneaModel;
  listModelo: any[];

  columnas: any[];
  rowGroupMetadata: any;

  subscription$: Subscription;

  // Variables para eliminar
  displaySave: boolean;
  displayDatosCierre: boolean;
  displayCierre: boolean;
  displayDescarga: boolean;
  modeloDatosCierre: TxVacunacionSubCutaneaModel = new TxVacunacionSubCutaneaModel();

  saveFiltros: any[];
  interval;
  constructor(private breadcrumbService: BreadcrumbService,
              private menuDinamicoService: MenuDinamicoService,
              private vacunacionSubcutaneaLocalService: VacunacionSubcutaneaLocalService,
              private vacunacionSubcutaneaService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private confirmationService: ConfirmationService,
              private router: Router,
              public lenguageService: LanguageService,
              private userContextService: UserContextService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Vacunación SubCutánea - Offline' },
      { label: 'Vacunación SubCutánea - Offline', routerLink: ['module-su/panel-vacunacion-subcutanea-offline'] }
  ]);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.modeloItem = new TxVacunacionSubCutaneaModel();

    this.columnas = [
      { header: 'Nro' },
      { header: 'Fecha' },
      { header: 'Empresa' },
      { header: 'Planta' },
      { header: 'Unidad' },
      { header: 'Usuario' }
    ];

    this.subscription$ = new Subscription();
    this.subscription$ = this.menuDinamicoService.getObtieneOpciones('app-panel-vacunacion-subcutanea-offline')
    .subscribe(acces => {
      this.buttonAcces = acces;
    });

    this.onListar();
    this.onUpdateDataVistaUsuario();
  }

  onListar() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaLocalService
    .getTxVacunacionSubcutanea()
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

  onConfirmCerrar(data: TxVacunacionSubCutaneaModel) {

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

  onToCerrar(data: any) {
    this.displayCierre = true;
    this.subscription$ = new Subscription();
    data.flgCerrado = true;
    data.fecCierre = new Date();
    data.idUsuarioCierre = this.userContextService.getIdUsuario();
    data.usuarioCierre = this.userContextService.getUsuario();
    this.subscription$ = this.vacunacionSubcutaneaLocalService.setUpdateTxVacunacionSubcutanea(data)
    .subscribe(resp => {
      if(resp) {
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        this.displayCierre = false;
        }
      },
      (error) => {
        this.displayCierre = false;
        this.listModelo.find(x => x.id === data.id).flgCerrado = false;
        this.listModelo.find(x => x.id === data.id).fecCierre = null;
        this.listModelo.find(x => x.id === data.id).usuarioCierre = '';
        this.listModelo.find(x => x.id === data.id).idUsuarioCierre = 0;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onConfirmEliminar(data: TxVacunacionSubCutaneaModel) {
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
    this.subscription$ = this.vacunacionSubcutaneaLocalService.setDeleteTxVacunacionSubcutanea(data.id)
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
    this.router.navigate(['/main/module-su/vacunacion-subcutanea-offline-create']);
  }

  onToSync(data: any) {
    if (this.displaySave)
    {
      this.mensajePrimeNgService.onToErrorMsg(null, "Sincronización en curso...");
      return;
    }
    
    this.displaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.vacunacionSubcutaneaService.setInsertFromSyncTxVacunacionSubCutanea(data)
    .subscribe(resp => {
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        this.onToEliminar(data);
        this.displaySave = false;
      },
      (error) => {
        this.displaySave = false;
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToUpdate(data: any) {
    this.router.navigate(['/main/module-su/vacunacion-subcutanea-offline-update', data.id]);
  }

  onDatosCierre(data: TxVacunacionSubCutaneaModel) {
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
