import { Component, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrganoDetalleModel } from '../../../models/organo-detalle.model';
import { Subscription } from 'rxjs';
import { SinmiService } from '../../../services/sinmi.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-create-organo-detalle',
  templateUrl: './create-organo-detalle.component.html',
  styleUrls: ['./create-organo-detalle.component.css']
})
export class CreateOrganoDetalleComponent implements OnInit {

  // Titulo del componente
  titulo = 'Organo Detalle';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: OrganoDetalleModel = new OrganoDetalleModel();

  subscription: Subscription;

  idOrgano: number;

  constructor(private fb: FormBuilder,
              private sinmiService: SinmiService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Sistema Integral de Monitoreo Intestinal' },
                    { label: 'Organo Detalle', routerLink: ['module-sm/panel-organo-detalle'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.idOrgano = params.id;
    });

    this.maestroForm = this.fb.group(
      {
        descripcion : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(4)])),
        score : new FormControl('',Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(1)])),
        orden : new FormControl(0, Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {
    this.modelo.idOrgano = Number(this.idOrgano);
    this.modelo.descripcionOrganoDetalle = this.maestroForm.controls['descripcion'].value;
    this.modelo.score = this.maestroForm.controls['score'].value;
    this.modelo.ordenDetalle = this.maestroForm.controls['orden'].value;
    this.subscription = new Subscription();
    this.subscription = this.sinmiService.setInsertOrganoDetalle(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-sm/panel-organo-detalle']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
