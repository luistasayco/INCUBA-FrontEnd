import { Injectable } from '@angular/core';
import { MenuCustomModel } from '../models/menu.model';
import { MenuModel } from '../modules/modulo-seguridad/models/menu.model';
import { SessionService } from './session.service';
import { CifrarDataService } from './cifrar-data.service';

@Injectable({
  providedIn: 'root'
})
export class MenuDinamicoService {

  private listMenu: MenuCustomModel[];
  private listMenuModelo: MenuModel[];
  private modeloMenu: MenuCustomModel;

  constructor(private sessionService: SessionService) { }

  setArmaMenuDimamico(){
    let menu = this.sessionService.getItem('menu');
    this.listMenuModelo = menu;
    this.listMenu = [];

    if ( this.listMenuModelo ) {

      for (let item of this.listMenuModelo.filter( x => x.idMenuPadre === 0)) {
        this.modeloMenu = new MenuCustomModel();

        this.modeloMenu.label = item.descripcionTitulo;
        this.modeloMenu.icon = item.icono;

        if (item.flgChildren) {
          // this.modeloMenu.routerLink = null;
          this.modeloMenu.items = [];
          this.geDataChildren(item.idMenu, this.listMenuModelo);
          this.listMenu.push(this.modeloMenu);
        } else {
          this.modeloMenu.routerLink = item.url;
          this.listMenu.push(this.modeloMenu);
        }
      }
      this.sessionService.setItem('menu', this.listMenu);
    }
  }

  private geDataChildren(idMenu: number, listItem: MenuModel[]) {
    for (let item of listItem.filter( x => x.idMenuPadre === idMenu)) {

        let modelo = new MenuCustomModel();

        modelo.label = item.descripcionTitulo;
        modelo.icon = item.icono;

        if (item.flgChildren) {

          modelo.items = [];
          for (let itemChildren of listItem.filter( x => x.idMenuPadre === item.idMenu)) {
              let modeloChildren = new MenuCustomModel();
              modeloChildren.label = itemChildren.descripcionTitulo;
              modeloChildren.icon = itemChildren.icono;
              modeloChildren.routerLink = itemChildren.url;

              modelo.items.push(modeloChildren);
            }
        } else {
          modelo.routerLink = item.url;
        }

        this.modeloMenu.items.push(modelo);
    }
  }

  getObtieneMenuDinamico() {
    return this.sessionService.getItem('menu');
  }

  getMenu() {
    return  [
      { label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/'] },
      {
          label: 'Modulos', icon: 'fa fa-fw fa-gg',
          items: [
              {
                  label: 'Mod. Registro de Equipo', icon: 'fa fa-fw fa-sitemap',
                  items: [
                      { label: 'Modelo', icon: 'fa fa-fw fa-list-alt',
                      routerLink: ['module-re/panel-modelo'] },
                      { label: 'Mantenimiento', icon: 'fa fa-fw fa-list-alt',
                      routerLink: ['module-re/panel-mantenimiento'] },
                      { label: 'Condicion de Limpieza', icon: 'fa fa-fw fa-list-alt',
                      routerLink: ['module-re/panel-condicion-limpieza'] },
                      { label: 'Requerimiento Equipos', icon: 'fa fa-fw fa-list-alt',
                      routerLink: ['module-re/panel-requerimiento-equipo'] },
                      { label: 'Panel Asociación', icon: 'fa fa-fw fa-list-alt',
                      routerLink: ['module-re/panel-asociacion'] },
                      { label: 'Registro de Equipo', icon: 'fa fa-fw fa-list-alt',
                      routerLink: ['module-re/panel-registro-equipo'] },
                  ]
              },
              {
                  label: 'Mod. Examen de Pollito', icon: 'fa fa-fw fa-sitemap',
                  items: [
                      { label: 'Calidad', icon: 'fa fa-fw fa-list-alt', routerLink: ['module-ef/panel-calidad'] },
                      { label: 'Proceso', icon: 'fa fa-fw fa-list-alt', routerLink: ['module-ef/panel-proceso'] },
                  ]
              }
          ]
      },
      { label: 'Docs', icon: 'fa fa-fw fa-book', routerLink: ['/documentation'] }
  ];
  }

}
