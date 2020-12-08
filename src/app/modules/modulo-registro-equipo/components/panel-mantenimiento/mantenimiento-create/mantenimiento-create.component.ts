import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MantenimientoModel } from '../../../models/mantenimiento.model';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { Router } from '@angular/router';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mantenimiento-create',
  templateUrl: './mantenimiento-create.component.html',
  styleUrls: ['./mantenimiento-create.component.css']
})
export class MantenimientoCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Mantenimiento';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: MantenimientoModel = new MantenimientoModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Registro Equipo' },
                    { label: 'Mantenimiento', routerLink: ['module-re/panel-mantenimiento'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
      }
    );
  }

  onClickSave() {
    this.modelo.descripcion = this.maestroForm.controls['descripcion'].value;
    this.subscription = new Subscription();
    this.subscription = this.registroEquipoService.setInsertMantenimiento(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-mantenimiento']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
