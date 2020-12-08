import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubTipoExplotacionModel } from '../../../models/sub-tipo-explotacion.model';
import { Subscription } from 'rxjs';
import { ExtranetService } from '../../../services/extranet.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-tipo-sub-explotacion-create',
  templateUrl: './tipo-sub-explotacion-create.component.html',
  styleUrls: ['./tipo-sub-explotacion-create.component.css']
})
export class TipoSubExplotacionCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Sub Tipo Explotación';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  maestroForm: FormGroup;

  modelo: SubTipoExplotacionModel = new SubTipoExplotacionModel();

  subscription: Subscription;

  idTipoExplotacion: number;

  constructor(private fb: FormBuilder,
              private extranetService: ExtranetService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Extranet' },
                    { label: 'Sub Tipo Explotación', routerLink: ['module-ex/panel-sub-tipo-explotacion'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.idTipoExplotacion = params.id;
    });

    this.maestroForm = this.fb.group(
      {
        descripcion : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(4)])),
        nombreDocumento : new FormControl('',
          Validators.compose([Validators.required, Validators.maxLength(300), Validators.minLength(4)])),
        flgRequiereFormato : new FormControl(true, Validators.compose([Validators.required])),
        flgExisteDigital : new FormControl(true, Validators.compose([Validators.required])),
        flgParaCliente : new FormControl(true, Validators.compose([Validators.required])),
        flgParaInvetsa : new FormControl(true, Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {
    this.modelo.idTipoExplotacion = Number(this.idTipoExplotacion);
    this.modelo.descripcionSubTipoExplotacion = this.maestroForm.controls['descripcion'].value;
    this.modelo.nombreDocumento = this.maestroForm.controls['nombreDocumento'].value;
    this.modelo.flgRequiereFormato = this.maestroForm.controls['flgRequiereFormato'].value;
    this.modelo.flgExisteDigital = this.maestroForm.controls['flgExisteDigital'].value;
    this.modelo.flgParaCliente = this.maestroForm.controls['flgParaCliente'].value;
    this.modelo.flgParaInvetsa = this.maestroForm.controls['flgParaInvetsa'].value;
    this.subscription = new Subscription();
    this.subscription = this.extranetService.setInsertSubTipoExplotacion(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.router.navigate(['/main/module-ex/panel-sub-tipo-explotacion']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
