import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProcesoSprayModel } from '../../../models/proceso-spray.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-proceso-spray-create',
  templateUrl: './proceso-spray-create.component.html',
  styleUrls: ['./proceso-spray-create.component.css']
})
export class ProcesoSprayCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Tipo Explotación';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: ProcesoSprayModel = new ProcesoSprayModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Proceso Spray', routerLink: ['module-sp/panel-proceso-spray'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
        'valor': new FormControl(0, Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {
    this.modelo.descripcionProcesoSpray = this.maestroForm.controls['descripcion'].value;
    this.modelo.valor = this.maestroForm.controls['valor'].value;

    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setInsertProcesoSpray(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-sp/panel-proceso-spray']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
