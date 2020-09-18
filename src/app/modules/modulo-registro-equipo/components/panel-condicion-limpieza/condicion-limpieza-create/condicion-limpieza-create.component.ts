import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CondicionLimpiezaModel } from '../../../models/condicion-limpieza.model';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-condicion-limpieza-create',
  templateUrl: './condicion-limpieza-create.component.html',
  styleUrls: ['./condicion-limpieza-create.component.css']
})
export class CondicionLimpiezaCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Condición de Limpieza';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: CondicionLimpiezaModel = new CondicionLimpiezaModel();

  constructor(private fb: FormBuilder,
              private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Condición de limpieza', routerLink: ['module-re/panel-condicion-limpieza'] },
                    { label: 'Nuevo Condición de limpieza'}
                ]);
              }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
        'orden' : new FormControl('', Validators.compose([Validators.required, Validators.max(1000), Validators.min(0)])),
      }
    );
  }

  onClickSave() {
    this.modelo.descripcion = this.maestroForm.controls['descripcion'].value;
    this.modelo.orden = this.maestroForm.controls['orden'].value;
    this.registroEquipoService.setInsertCondicionLimpieza(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-condicion-limpieza']);
  }

}
