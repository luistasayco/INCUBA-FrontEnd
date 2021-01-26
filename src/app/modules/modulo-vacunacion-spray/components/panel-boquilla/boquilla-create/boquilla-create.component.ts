import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BoquillaModel } from '../../../models/boquilla.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-boquilla-create',
  templateUrl: './boquilla-create.component.html',
  styleUrls: ['./boquilla-create.component.css']
})
export class BoquillaCreateComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Boquilla';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: BoquillaModel = new BoquillaModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Boquilla', routerLink: ['module-sp/panel-boquilla'] },
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
    this.modelo.descripcionBoquilla = this.maestroForm.controls['descripcion'].value;
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setInsertBoquilla(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-sp/panel-boquilla']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
