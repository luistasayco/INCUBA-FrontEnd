import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequerimientoEquipoModel } from '../../../models/requerimiento-equipo.model';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-requerimiento-equipo-create',
  templateUrl: './requerimiento-equipo-create.component.html',
  styleUrls: ['./requerimiento-equipo-create.component.css']
})
export class RequerimientoEquipoCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Requerimiento de equipo';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: RequerimientoEquipoModel = new RequerimientoEquipoModel();

  constructor(private fb: FormBuilder,
              private registroEquipoService: RegistroEquipoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Modulo' },
                    { label: 'Requerimiento equipo', routerLink: ['module-re/panel-requerimiento-equipo'] },
                    { label: 'Nuevo requerimiento equipo'}
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
    this.registroEquipoService.setInsertRequerimientoEquipo(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-re/panel-requerimiento-equipo']);
  }

}
