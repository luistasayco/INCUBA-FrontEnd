import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VacunaModel } from '../../../models/vacuna.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-vacuna-create',
  templateUrl: './vacuna-create.component.html',
  styleUrls: ['./vacuna-create.component.css']
})
export class VacunaCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Vacuna';
  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: VacunaModel = new VacunaModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Vacuna', routerLink: ['module-sp/panel-vacuna'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcionVacuna' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
      }
    );
  }

  onClickSave() {
    this.modelo.descripcionVacuna = this.maestroForm.controls['descripcionVacuna'].value;
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setInsertVacuna(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-sp/panel-vacuna']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
