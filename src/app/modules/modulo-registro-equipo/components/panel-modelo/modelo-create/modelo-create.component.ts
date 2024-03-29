import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from 'src/app/modules/modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModeloModel } from '../../../models/modelo.model';
import { RegistroEquipoService } from '../../../services/registro-equipo.service';
import { MensajePrimeNgService } from 'src/app/modules/modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-modelo-create',
  templateUrl: './modelo-create.component.html',
  styleUrls: ['./modelo-create.component.css']
})
export class ModeloCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Modelo';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: ModeloModel = new ModeloModel();

  constructor(private fb: FormBuilder,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Registro Equipo' },
                    { label: 'Modelo', routerLink: ['module-re/panel-modelo'] },
                    { label: 'Nuevo modelo'}
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
  }

  back() {
    this.router.navigate(['/main/module-re/panel-modelo']);
  }
}
