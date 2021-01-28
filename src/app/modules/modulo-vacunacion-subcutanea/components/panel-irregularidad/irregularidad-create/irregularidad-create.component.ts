import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IrregularidadModel } from '../../../models/irregularidad.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../../../modulo-vacunacion-spray/services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-irregularidad-create',
  templateUrl: './irregularidad-create.component.html',
  styleUrls: ['./irregularidad-create.component.css']
})
export class IrregularidadCreateComponent implements OnInit {
  // Titulo del componente
  titulo = 'Irregularidad';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: IrregularidadModel = new IrregularidadModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private modeloService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación SubCutanea' },
                    { label: 'Irregularidad', routerLink: ['module-su/panel-irregularidad'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(4)])),
        'valor' : new FormControl(0, Validators.compose([Validators.required])),
      }
    );
  }

  onClickSave() {
    this.modelo.descripcionIrregularidad = this.maestroForm.controls['descripcion'].value;
    this.modelo.valor = this.maestroForm.controls['valor'].value;
    this.subscription = new Subscription();
    this.subscription = this.modeloService.setInsertIrregularidad(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-su/panel-irregularidad']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
