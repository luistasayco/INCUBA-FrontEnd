import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrganoModel } from '../../../models/organo.model';
import { Subscription } from 'rxjs';
import { SinmiService } from '../../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-create-organo',
  templateUrl: './create-organo.component.html',
  styleUrls: ['./create-organo.component.css']
})
export class CreateOrganoComponent implements OnInit {

  // Titulo del componente
  titulo = 'Organo';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: OrganoModel = new OrganoModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
                    { label: 'Organo', routerLink: ['module-sm/panel-organo'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
        'orden' : new FormControl(0, Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {
    this.modelo.descripcionOrgano = this.maestroForm.controls['descripcion'].value;
    this.modelo.orden = this.maestroForm.controls['orden'].value;
    this.subscription = new Subscription();
    this.subscription = this.sinmiService.setInsertOrgano(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-sm/panel-organo']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
