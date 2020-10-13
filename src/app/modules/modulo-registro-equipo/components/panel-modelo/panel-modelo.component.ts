import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { ModeloModel } from '../../models/modelo.model';
import { RegistroEquipoService } from '../../services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng';
import { IMensajeResultadoApi } from 'src/app/modules/modulo-compartido/models/mensaje-resultado-api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-panel-modelo',
  templateUrl: './panel-modelo.component.html',
  styleUrls: ['./panel-modelo.component.css']
})
export class PanelModeloComponent implements OnInit {

  // Titulo del componente
  titulo = 'Modelo';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: ModeloModel;
  listModelo: ModeloModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: ModeloModel; } = {};

  // Opcion Eliminar
  modeloEliminar: ModeloModel;

  constructor(private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Modelo', routerLink: ['module-re/panel-modelo'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' }
    ];

    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcion: this.descripcionFind};
    this.registroEquipoService.getModelo(this.modeloFind)
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
}
