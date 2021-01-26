import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProcesoDetalleSubCutaneaModel } from '../../../models/proceso-detalle-subcutanea';
import { Subscription } from 'rxjs';
import { VacunacionSubcutaneaService } from '../../../services/vacunacion-subcutanea.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-proceso-detalle-subcutanea-create',
  templateUrl: './proceso-detalle-subcutanea-create.component.html',
  styleUrls: ['./proceso-detalle-subcutanea-create.component.css']
})
export class ProcesoDetalleSubcutaneaCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Proceso Detalle SubCutanea';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: ProcesoDetalleSubCutaneaModel = new ProcesoDetalleSubCutaneaModel();

  subscription: Subscription;

  id: number;

  constructor(private fb: FormBuilder,
              private modeloService: VacunacionSubcutaneaService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación SubCutanea' },
                    { label: 'Proceso Detalle SubCutanea', routerLink: ['module-su/panel-proceso-detalle-subcutanea'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.maestroForm = this.fb.group(
      {
        descripcion : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(4)])),
        valor : new FormControl(0, Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {
    this.modelo.idProcesoSubCutanea = Number(this.id);
    this.modelo.descripcionProcesoSubCutanea = this.maestroForm.controls['descripcion'].value;
    this.modelo.valor = this.maestroForm.controls['valor'].value;
    this.subscription = new Subscription();
    this.subscription = this.modeloService.setInsertProcesoDetalleSubCutanea(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-su/panel-proceso-detalle-subcutanea']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
