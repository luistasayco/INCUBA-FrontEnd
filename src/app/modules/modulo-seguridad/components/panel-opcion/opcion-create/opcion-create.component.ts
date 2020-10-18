import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OpcionModel } from '../../../models/opcion.model';
import { SeguridadService } from '../../../services/seguridad.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opcion-create',
  templateUrl: './opcion-create.component.html',
  styleUrls: ['./opcion-create.component.css']
})
export class OpcionCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Opcion';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: OpcionModel = new OpcionModel();

  // Id del menu seleccionado
  idMenu: number;

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo Seguridad' },
                    { label: 'Opcion', routerLink: ['module-se/panel-opcion'] },
                    { label: 'Nuevo Opcion'}
                ]);
              }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.idMenu = params.id;
    });

    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
      }
    );
  }

  onClickSave() {
    this.modelo.idMenu = Number(this.idMenu);
    this.modelo.descripcionOpcion = this.maestroForm.controls['descripcion'].value;
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setInsertOpcion(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-se/panel-opcion']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
