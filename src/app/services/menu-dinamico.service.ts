import { Injectable } from '@angular/core';
import { MenuCustomModel } from '../models/menu.model';
import { MenuModel } from '../modules/modulo-seguridad/models/menu.model';
import { SessionService } from './session.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { OpcionModel } from '../modules/modulo-seguridad/models/opcion.model';
import { ConstantesTablasIDB } from '../constants/constantes-tablas-indexdb';
import { ButtonAcces } from '../models/acceso-button';

@Injectable({
  providedIn: 'root'
})
export class MenuDinamicoService {

  private listMenu: MenuCustomModel[];
  private listMenuModelo: MenuModel[];
  private modeloMenu: MenuCustomModel;
  private listOpcion: OpcionModel[];
  private buttonAcces: ButtonAcces = new ButtonAcces();

  constructor(private sessionService: SessionService,
              private dbService: NgxIndexedDBService) { }

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
      { 
        label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/'] 
      },
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

  // Se tiene que mejorar el acceso a las opciones
  // http://blog.enriqueoriol.com/2017/08/angular-dom-renderer.html
  // https://pablolazaro.github.io/2016/10/13/Angular-2-Controlando-componentes-hijos-con-ViewChild-y-ViewChildren/
  getObtieneOpciones(nombreFormulario: string): Observable<ButtonAcces> {
    this.buttonAcces = new ButtonAcces();
    const observadorBorrar = new Observable<ButtonAcces>( observer => {
      this.dbService.getAll(ConstantesTablasIDB._TABLA_SEGMENU)
      .subscribe((data: MenuModel[]) => {
      if (data) {
          this.listOpcion  = [...data].find(x => x.nombreFormulario === nombreFormulario).listaOpciones;

          this.listOpcion.forEach(element => {
            if (element.keyOpcion === 'btn-nuevo') {
              this.buttonAcces.btnNuevo = false;
            }
            if (element.keyOpcion === 'btn-editar') {
              this.buttonAcces.btnEditar = false;
            }
            if (element.keyOpcion === 'btn-eliminar') {
              this.buttonAcces.btnEliminar = false;
            }

            if (element.keyOpcion === 'btn-adicionar-eliminar') {
              this.buttonAcces.btnAdicionarEliminar = false;
            }
            if (element.keyOpcion === 'btn-cerrar') {
              this.buttonAcces.btnCerrar = false;
            }
            if (element.keyOpcion === 'btn-editar-detalle') {
              this.buttonAcces.btnEditarDetalle = false;
            }
            if (element.keyOpcion === 'btn-eliminar-detalle') {
              this.buttonAcces.btnEliminarDetalle = false;
            }
            if (element.keyOpcion === 'btn-grabar') {
              this.buttonAcces.btnGrabar = false;
            }
            if (element.keyOpcion === 'btn-menu-hijo') {
              this.buttonAcces.btnMenuHijo = false;
            }
            if (element.keyOpcion === 'btn-menu-padre') {
              this.buttonAcces.btnMenuPadre = false;
            }
            if (element.keyOpcion === 'btn-nuevo-detalle') {
              this.buttonAcces.btnNuevoDetalle = false;
            }
            if (element.keyOpcion === 'btn-pdf') {
              this.buttonAcces.btnPDF = false;
            }
            if (element.keyOpcion === 'btn-adicionar-eliminar-mant') {
              this.buttonAcces.btnAdicionarEliminarMantenimiento = false;
            }
            if (element.keyOpcion === 'btn-adicionar-eliminar-repuesto') {
              this.buttonAcces.btnAdicionarEliminarRepuesto = false;
            }
            if (element.keyOpcion === 'btn-download') {
              this.buttonAcces.btnDownload = false;
            }
            if (element.keyOpcion === 'btn-visualizar') {
              this.buttonAcces.btnVisualizar = false;
            }
          });

          observer.next(this.buttonAcces);
          observer.complete();
        } else {
          observer.next(this.buttonAcces);
          observer.complete();
        }
      });
    });

    return observadorBorrar;
  }
}
