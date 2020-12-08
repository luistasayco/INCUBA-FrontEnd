import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../modulo-compartido/services/mensaje-prime-ng.service';
import { GlobalsConstants } from '../../../modulo-compartido/models/globals-constants';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SeguridadService } from '../../services/seguridad.service';
import { ParametroConexionModel } from '../../models/parametro-conexion.model';

@Component({
  selector: 'app-panel-conexion',
  templateUrl: './panel-conexion.component.html',
  styleUrls: ['./panel-conexion.component.css']
})
export class PanelConexionComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Parametros de Conexión';
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloForm: FormGroup;

  subscription$: Subscription;

  modelo: ParametroConexionModel = new ParametroConexionModel();


  constructor(private fb: FormBuilder,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService) {
    this.breadcrumbService.setItems([
      { label: 'Modulo Seguridad' },
      { label: 'Parametro Conexión', routerLink: ['module-se/panel-parametro-conexion'] }
    ]);
  }

  ngOnInit(): void {
    this.onInicializaFormulario();
  }

  onInicializaFormulario() {
    this.modeloForm = this.fb.group({
      aplicacionServidor : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      aplicacionBaseDatos : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      aplicacionUsuario : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      aplicacionPassword : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(20), Validators.minLength(5)])),
      sapServidor : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sapBaseDatos : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sapUsuario : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sapPassword : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(20), Validators.minLength(5)])),
      });
  }

  onClickSave() {
    // this.modelo.descripcion = this.modeloForm.controls['aplicacionServidor'].value;
    // this.subscription$ = new Subscription();
    // this.subscription$ = this.seguridadService.setInsertMantenimiento(this.modelo)
    // .subscribe(() =>  {
    //   this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    // },
    //   (error) => {
    //     this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    // });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
