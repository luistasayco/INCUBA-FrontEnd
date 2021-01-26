import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProcesoDetalleSprayModel } from '../../../models/proceso-detalle-spray.model';
import { Subscription } from 'rxjs';
import { VacunacionSprayService } from '../../../services/vacunacion-spray.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-proceso-detalle-spray-create',
  templateUrl: './proceso-detalle-spray-create.component.html',
  styleUrls: ['./proceso-detalle-spray-create.component.css']
})
export class ProcesoDetalleSprayCreateComponent implements OnInit {


  // Titulo del componente
  titulo = 'Proceso Detalle Spray';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: ProcesoDetalleSprayModel = new ProcesoDetalleSprayModel();

  subscription: Subscription;

  id: number;

  constructor(private fb: FormBuilder,
              private vacunacionSprayService: VacunacionSprayService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Vacunación Spray' },
                    { label: 'Proceso Detalle Spray', routerLink: ['module-sp/panel-proceso-detalle-spray'] },
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
    this.modelo.idProcesoSpray = Number(this.id);
    this.modelo.descripcionProcesoSpray = this.maestroForm.controls['descripcion'].value;
    this.modelo.valor = this.maestroForm.controls['valor'].value;
    this.subscription = new Subscription();
    this.subscription = this.vacunacionSprayService.setInsertProcesoDetalleSpray(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-sp/panel-proceso-detalle-spray']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
