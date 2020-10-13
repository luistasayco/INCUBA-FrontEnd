import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { CustomMenuItem } from '../../models/menu-item.model';
import { SeguridadService } from '../../services/seguridad.service';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { OpcionModel } from '../../models/opcion.model';
import { MenuModel } from '../../models/menu.model';
import { environment } from 'src/environments/environment';
import { OpcionPorPerfilModel } from '../../models/opcion-por-perfil';
import { PerfilModel } from '../../models/pefil.model';

@Component({
  selector: 'app-panel-opcion-por-perfil',
  templateUrl: './panel-opcion-por-perfil.component.html',
  styleUrls: ['./panel-opcion-por-perfil.component.css']
})
export class PanelOpcionPorPerfilComponent implements OnInit {

  // Titulo del componente
  titulo = 'Opcion';
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  items: TreeNode[] = [];
  itemSelected: TreeNode;
  modelo: MenuModel;
  modeloPerfil: PerfilModel = new PerfilModel();

  listModel: MenuModel[];
  listModelSeleccionado: OpcionPorPerfilModel[] = [];
  listModelPorSeleccionar: OpcionPorPerfilModel[] = [];
  listItemPerfil: SelectItem[];
  customMenuItem: CustomMenuItem;
  customMenuItemChildren: CustomMenuItem;

  perfilSelected: any;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                  { label: 'Modulo Seguridad' },
                  { label: 'Opcion por Perfil', routerLink: ['module-se/panel-opcion-por-perfil'] }
              ]);
              }

  ngOnInit() {
      this.getListaMenu();

      this.getToObtienePerfil();
  }

  getListaMenu() {
    this.items = [];
    this.seguridadService.getMenuAll()
    .subscribe(data => {
      this.listModel = data;
      for (const menu of this.listModel.filter(x => x.idMenuPadre === 0)) {

        this.customMenuItem = {
          label : menu.descripcionTitulo,
          data: menu,
          icon: menu.icono,
          children: []
        };

        for (const chlidernLevelOne of this.listModel.filter(x => x.idMenuPadre === menu.idMenu)) {
          this.customMenuItemChildren = {
            label: chlidernLevelOne.descripcionTitulo,
            data: chlidernLevelOne,
            icon: chlidernLevelOne.icono,
            children: []
          };

          for (const chlidernLevelTwo of this.listModel.filter(x => x.idMenuPadre === chlidernLevelOne.idMenu)) {
            this.customMenuItemChildren.children.push({
              label: chlidernLevelTwo.descripcionTitulo,
              data: chlidernLevelTwo,
              icon: chlidernLevelTwo.icono
            });
          }

          this.customMenuItem.children.push(this.customMenuItemChildren);

        }
        this.items.push(this.customMenuItem);
      }
    });
  }

  getToObtienePerfil() {
    this.seguridadService.getPerfil(this.modeloPerfil)
    .subscribe((data: PerfilModel[]) => {
      this.listItemPerfil = [];
      for (let item of data) {
        this.listItemPerfil.push({ label: item.descripcionPerfil, value: item.idPerfil });
      }
    });
  }
  
  onChangePerfil() {
    let menu = this.modelo ? this.modelo.idMenu : 0;
    this.onListar(menu);
  }

  nodeSelect(menu: any)
  {
    this.itemSelected = menu;
    this.modelo = menu.data;

    this.onListar(this.modelo.idMenu);
  }

  onListar(idMenu: number) {

    let perfil = this.perfilSelected ? this.perfilSelected.value : 0  ;

    this.seguridadService.getPorSeleccionarOpcionPorPerfil(idMenu, perfil )
    .subscribe(resp => {
      if (resp) {
          this.listModelPorSeleccionar = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );

    this.seguridadService.getSeleccionadoOpcionPorPerfil(idMenu, perfil)
    .subscribe(resp => {
      if (resp) {
          this.listModelSeleccionado = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToMoveToTarget(items: OpcionPorPerfilModel[]) {
    this.setCreateItem(items);
  }

  onToMoveToSource(items: OpcionPorPerfilModel[]) {
    this.setDeleteItem(items);
  }

  onToMoveAllToTarget(items: OpcionPorPerfilModel[]) {
    this.setCreateItem(items);
  }

  onToMoveAllToSource(items: OpcionPorPerfilModel[]) {
    this.setDeleteItem(items);
  }

  setCreateItem(event: OpcionPorPerfilModel[]) {

    event.map(dato => {
      dato.idPerfil = this.perfilSelected.value,
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion

      return dato;
    });

    this.seguridadService.setInsertOpcionPorPerfil(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItem(event: OpcionPorPerfilModel[]) {

    event.map(dato => {
      dato.idPerfil = this.perfilSelected.value,
      dato.regUsuario = environment.usuario,
      dato.regEstacion = environment.estacion
      return dato;
    });

    this.seguridadService.setDeleteOpcionPorPerfil(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }
}
