import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TipoExplotacionModel } from '../../../models/tipo-explotacion.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../../services/extranet.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-tipo-explotacion-create',
  templateUrl: './tipo-explotacion-create.component.html',
  styleUrls: ['./tipo-explotacion-create.component.css']
})
export class TipoExplotacionCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Tipo Explotación';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: TipoExplotacionModel = new TipoExplotacionModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Extranet' },
                    { label: 'Tipo Explotación', routerLink: ['module-ex/panel-tipo-explotación'] },
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
    this.modelo.descripcionTipoExplotacion = this.maestroForm.controls['descripcion'].value;
    this.subscription = new Subscription();
    this.subscription = this.extranetService.setInsertTipoExplotacion(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-ex/panel-tipo-explotacion']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
