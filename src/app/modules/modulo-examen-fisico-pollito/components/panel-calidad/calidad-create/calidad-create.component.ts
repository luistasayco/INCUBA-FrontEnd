import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CalidadModel } from '../../../models/calidad.model';
import { RegistroEquipoService } from 'src/app/modules/modulo-registro-equipo/services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ExamenFisicoPollitoService } from '../../../services/examen-fisico-pollito.service';

@Component({
  selector: 'app-calidad-create',
  templateUrl: './calidad-create.component.html',
  styleUrls: ['./calidad-create.component.css']
})
export class CalidadCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Calidad';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: CalidadModel = new CalidadModel();

  color: any;

  constructor(private fb: FormBuilder,
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router) { }

  ngOnInit() {
    this.maestroForm = this.fb.group(
      {
        'descripcion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(4)])),
        'rangoInicio' : new FormControl('', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])),
        'rangoFin' : new FormControl('', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])),
        'color' : new FormControl('', Validators.compose([Validators.required])),
      }
    );
  }

  onClickSave() {
    this.modelo.descripcion = this.maestroForm.controls['descripcion'].value;
    this.modelo.rangoInicial = this.maestroForm.controls['rangoInicio'].value;
    this.modelo.rangoFinal = this.maestroForm.controls['rangoFin'].value;
    this.modelo.color = this.maestroForm.controls['color'].value;
    this.examenFisicoPollitoService.setInsertCalidad(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-ef/panel-calidad']);
  }

}
