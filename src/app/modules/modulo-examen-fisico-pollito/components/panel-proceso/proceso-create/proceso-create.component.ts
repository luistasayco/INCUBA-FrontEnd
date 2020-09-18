import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProcesoModel } from '../../../models/proceso.model';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ExamenFisicoPollitoService } from '../../../services/examen-fisico-pollito.service';

@Component({
  selector: 'app-proceso-create',
  templateUrl: './proceso-create.component.html',
  styleUrls: ['./proceso-create.component.css']
})
export class ProcesoCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Proceso';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: ProcesoModel = new ProcesoModel();

  constructor(private fb: FormBuilder,
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router) { }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
        'factor' : new FormControl('', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])),
        'orden' : new FormControl('', Validators.compose([Validators.required, Validators.max(1000), Validators.min(0)])),
      }
    );
  }

  onClickSave() {
    this.modelo.descripcion = this.maestroForm.controls['descripcion'].value;
    this.modelo.factor = this.maestroForm.controls['factor'].value;
    this.modelo.orden = this.maestroForm.controls['orden'].value;
    this.examenFisicoPollitoService.setInsertProceso(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-ef/panel-proceso']);
  }

}
