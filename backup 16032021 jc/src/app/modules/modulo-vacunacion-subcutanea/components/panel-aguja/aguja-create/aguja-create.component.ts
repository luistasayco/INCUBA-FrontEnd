import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgujaModel } from '../../../models/aguja.model';
import { Subscription } from 'rxjs';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-aguja-create',
  templateUrl: './aguja-create.component.html',
  styleUrls: ['./aguja-create.component.css']
})
export class AgujaCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Aguja';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: AgujaModel = new AgujaModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private modeloService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación SubCutanea' },
                    { label: 'Aguja', routerLink: ['module-su/panel-aguja'] },
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
    this.modelo.descripcionAguja = this.maestroForm.controls['descripcion'].value;
    this.subscription = new Subscription();
    this.subscription = this.modeloService.setInsertAguja(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-su/panel-aguja']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
