import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProcesoSubCutaneaModel } from '../../../models/proceso-subcutanea.model';
import { Subscription } from 'rxjs';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-proceso-subcutanea-create',
  templateUrl: './proceso-subcutanea-create.component.html',
  styleUrls: ['./proceso-subcutanea-create.component.css']
})
export class ProcesoSubcutaneaCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Proceso SubCutanea';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: ProcesoSubCutaneaModel = new ProcesoSubCutaneaModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private modeloService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vcunación SubCutanea' },
                    { label: 'Proceso Subcutanea', routerLink: ['module-su/panel-proceso-subcutanea'] },
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
    this.modelo.descripcionProcesoSubCutanea = this.maestroForm.controls['descripcion'].value;
    this.subscription = new Subscription();
    this.subscription = this.modeloService.setInsertProcesoSubCutanea(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-su/panel-proceso-subcutanea']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
