import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { SeguridadService } from '../../services/seguridad.service';
import { MenuModel } from '../../models/menu.model';
import { CustomMenuItem } from '../../models/menu-item.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css']
})
export class PanelMenuComponent implements OnInit {

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  items: TreeNode[] = [];
  itemSelected: TreeNode;
  modelo: MenuModel;
  modeloNew: MenuModel;
  listModel: MenuModel[] = [];
  customMenuItem: CustomMenuItem;
  customMenuItemChildren: CustomMenuItem;

  modeloForm: FormGroup;

  evenObservable: Observable<MenuModel>;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private fb: FormBuilder) { }

  ngOnInit() {
      this.getListaMenu();

      this.getInicializaForm();
  }

  getInicializaForm() {
    this.modeloForm = this.fb.group(
      {
        'idMenu' : new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
        'descripcionTitulo' : new FormControl('', Validators.compose([Validators.required])),
        'icono' : new FormControl('', Validators.compose([Validators.required])),
        'url' : new FormControl('', Validators.compose([Validators.required])),
        'nroNivel' : new FormControl(''),
        'flgActivo' : new FormControl('', Validators.compose([Validators.required])),
        'idMenuPadre' : new FormControl('', Validators.compose([Validators.required]))
      }
    );
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

  nodeSelect(menu: any)
  {
    this.itemSelected = menu;
    this.modelo = menu.data;
    this.goDataForm(this.modelo);
  }

  goNewPadre()
  {
    this.modeloNew = {...this.modelo};
    this.modeloNew.idMenu = 0;
    this.modeloNew.descripcionTitulo = '';
    this.modeloNew.icono = 'fa fa-fw fa-gg';
    this.modeloNew.url = '/';

    if (this.itemSelected.parent === undefined) {
      this.modeloNew.idMenuPadre = 0;
      this.modeloNew.nroNivel = 1;
    } else {
      this.modeloNew.idMenuPadre = this.itemSelected.parent.data.idMenuPadre;
      this.modeloNew.nroNivel = this.itemSelected.parent.data.nroNivel;
    }
    this.goDataForm(this.modeloNew);
  }

  goDataForm(modeloMenu: MenuModel) {
    this.modeloForm.controls['idMenu'].setValue(modeloMenu.idMenu);
    this.modeloForm.controls['descripcionTitulo'].setValue(modeloMenu.descripcionTitulo);
    this.modeloForm.controls['icono'].setValue(modeloMenu.icono);
    this.modeloForm.controls['url'].setValue(modeloMenu.url);
    this.modeloForm.controls['flgActivo'].setValue(modeloMenu.flgActivo);
    this.modeloForm.controls['idMenuPadre'].setValue(modeloMenu.idMenuPadre);
    this.modeloForm.controls['nroNivel'].setValue(modeloMenu.nroNivel);
  }

  goNewChildren()
  {
    this.modeloNew = {...this.modelo};

    if (this.modeloNew.nroNivel === 3 ) {
     this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, 'Comunicarse con el Area de TI');
     return;
    }
    this.modeloNew.idMenuPadre = this.modeloNew.idMenu;
    this.modeloNew.idMenu = 0;
    this.modeloNew.descripcionTitulo = '';
    this.modeloNew.icono = 'fa fa-fw fa-gg';
    this.modeloNew.url = '/';
    this.modeloNew.nroNivel = this.modeloNew.nroNivel + 1;
    this.goDataForm(this.modeloNew);
  }

  onClickSave() {

    this.modelo.idMenu = Number(this.modeloForm.controls['idMenu'].value);
    this.modelo.descripcionTitulo = this.modeloForm.controls['descripcionTitulo'].value;
    this.modelo.icono = this.modeloForm.controls['icono'].value;
    this.modelo.url = this.modeloForm.controls['url'].value;
    this.modelo.flgActivo = Boolean(this.modeloForm.controls['flgActivo'].value);
    this.modelo.idMenuPadre = Number(this.modeloForm.controls['idMenuPadre'].value);
    this.modelo.nroNivel = Number(this.modeloForm.controls['nroNivel'].value);

    if (this.modelo.idMenu === 0) {
      this.evenObservable = this.seguridadService.setInsertMenu(this.modelo);
    } else {
      this.evenObservable = this.seguridadService.setUpdateMenu(this.modelo);
    }

    this.evenObservable.subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.getListaMenu(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }
}