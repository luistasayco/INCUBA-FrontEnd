import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { TxSIMModel } from '../../../models/tx-sim.model';
import { TxSIMIndiceBursalModel } from '../../../models/tx-sim-indice-bursal.model';
import { SimService } from '../../../services/sim.service';
import { CompartidoService } from '../../../../modulo-compartido/services/compartido.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { SeguridadService } from '../../../../modulo-seguridad/services/seguridad.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../modulo-compartido/services/util.service';
import { TxSIMFotosModel } from '../../../models/tx-sim-fotos.model';

@Component({
  selector: 'app-tx-sim-update',
  templateUrl: './tx-sim-update.component.html',
  styleUrls: ['./tx-sim-update.component.css']
})
export class TxSimUpdateComponent implements OnInit, OnDestroy {

  subscription$: Subscription;

  // Titulo del componente
  titulo = 'Sistema Integrado de Monitoreo Nro:';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Variables de dato seleccionado
  selectedEmpresa: any;

  modeloItem: TxSIMModel = new TxSIMModel();

  displayControles: boolean;
  displaySave: boolean;

  //Columnas
  columnasIndiceBursal: any[];
  columnasRespiratorio: any[];
  columnasDigestivo: any[];
  columnasLesionBursal: any[];
  columnasLesionTimo: any[];
  columnasLesiones: any[];

  cloneListImagen: TxSIMFotosModel[] = [];
  listIma: any[];
  id: number;
  constructor(private simService: SimService,
              private compartidoService: CompartidoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private router: Router,
              private userContextService: UserContextService,
              private utilService: UtilService,
              private route: ActivatedRoute) { 
                this.breadcrumbService.setItems([
                  { label: 'Módulo Sistema Integrado de Monitoreo' },
                  { label: 'Sis. Integrado de Monitoreo', routerLink: ['module-si/panel-tx-sim'] },
                  { label: 'Actualizar'}
              ]);
              }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.goColumnasBuild();

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      
      this.onObtieneSIMId();
      
    });
  }

  onObtieneSIMId() {
    this.subscription$ = new Subscription();
      this.subscription$ = this.simService.getTxSIMPorId(this.id)
      .subscribe((data: TxSIMModel) => {
        
        this.modeloItem = data;
        this.cloneListImagen = [...this.modeloItem.listaTxSIMFotos];
        this.listImagen();
      });
  }

  goColumnasBuild() {
    this.columnasIndiceBursal= [
      { header: 'Ave' },
      { header: 'Peso Corporal (g)' },
      { header: 'Peso de Bursa (g)' },
      { header: 'Peso de Bazo (g)' },
      { header: 'Peso de Timo (g)' },
      { header: 'Peso de Higado (g)' },
      { header: 'Índice Bursal' },
      { header: 'Índice Timico' },
      { header: 'Índice Hepático' },
      { header: 'Bursometro' }
    ];

    this.columnasRespiratorio= [
      { header: 'Ave' },
      { header: 'Sacos aereos' },
      { header: 'Cornetes' },
      { header: 'Glotis' },
      { header: 'Tráquea' },
      { header: 'Pulmones' },
      { header: 'Riñones' },
      { header: 'Placas Peyer' }
    ];

    this.columnasDigestivo= [
      { header: 'Ave' },
      { header: 'Duodeno' },
      { header: 'Yeyuno' },
      { header: 'Lleon' },
      { header: 'Ciegos' },
      { header: 'Tonsilas C.' },
      { header: 'Hígado' },
      { header: 'Molleja' },
      { header: 'Proventriculo' }
    ];

    this.columnasLesionBursal= [
      { header: 'Ave' },
      { header: 'Valor' }
    ];

    this.columnasLesionTimo= [
      { header: 'Ave' },
      { header: 'Valor' }
    ];

    this.columnasLesiones= [
      { header: 'Lesiones Duodeno' },
      { header: 'Lesiones en intestino medio' },
      { header: 'Lesiones en Hígado' }
    ];
  }

  goDisplayControles() {
    this.displayControles = ! this.displayControles;
  }

  listImagen() {
    this.listIma = [];
    if (this.modeloItem.listaTxSIMFotos.length > 0 ) {
      this.modeloItem.listaTxSIMFotos.forEach(x => {
        this.listIma.push({imagen: x.foto});
      });
    }
  }

  listUpdate(event: any[]) {
    this.modeloItem.listaTxSIMFotos = [];
    event.forEach(x => {
      if (this.cloneListImagen) {
        let itemImagen = this.cloneListImagen.find(xFind => xFind.foto === x.imagen);
        if (itemImagen) {
          this.modeloItem.listaTxSIMFotos.push(itemImagen);
        } else {
          this.modeloItem.listaTxSIMFotos.push({
            idSIMFoto: 0,
            idSIM: 0,
            foto: x.imagen
          });
        }
      } else {
        this.modeloItem.listaTxSIMFotos.push({
          idSIMFoto: 0,
          idSIM: 0,
          foto: x.imagen
        });
      }
    });
  }

  onGrabar() {

    this.displaySave = true;
    
    this.subscription$ = new Subscription();
    this.subscription$ = this.simService.setUpdateTxSIM(this.modeloItem)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.displaySave = false;
      this.onBack();
    },
      (error) => {
        this.displaySave = false;
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  onBack() {
    this.router.navigate(['/main/module-si/panel-tx-sim']);
  }

}
