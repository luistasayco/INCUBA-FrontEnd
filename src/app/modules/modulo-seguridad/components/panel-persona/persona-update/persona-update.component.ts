import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PersonaModel } from '../../../models/persona.model';
import { PerfilModel } from '../../../models/pefil.model';
import { SelectItem } from 'primeng';
import { SeguridadService } from '../../../services/seguridad.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { LayoutComponent } from '../../../../../layout/layout.component';
import { Subscription } from 'rxjs';
import { EmpresaPorUsuarioModel } from '../../../models/empresa-por-usuario';
import { SubTipoExplotacionPorUsuarioModel } from '../../../models/sub-tipo-explotacion-por-usuario.model';
import { CifrarDataService } from '../../../../../services/cifrar-data.service';
import { AprobarSubTipoExplotacionPorUsuarioModel } from '../../../models/aprobar-sub-tipo-explotacion-por-usuario';
import { PlantaPorUsuarioModel } from '../../../models/planta-por-usuario';

@Component({
  selector: 'app-persona-update',
  templateUrl: './persona-update.component.html',
  styleUrls: ['./persona-update.component.css']
})
export class PersonaUpdateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Usuario';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloForm: FormGroup;

  modelo: PersonaModel = new PersonaModel();
  modeloPerfil: PerfilModel = new PerfilModel();

  themes: any[];

  listItemPerfil: SelectItem[];

  idPersona: number;

  // Imagen
  sellersPermitString: string;
  sellersPermitFile;

  listEmpresaPorSeleccionado: EmpresaPorUsuarioModel[];
  listEmpresaSeleccionado: EmpresaPorUsuarioModel[];

  listPlantaPorSeleccionado: PlantaPorUsuarioModel[];
  listPlantaSeleccionado: PlantaPorUsuarioModel[];

  listSubTipoExplotacionPorSeleccionado: SubTipoExplotacionPorUsuarioModel[];
  lisSubTipoExplotacionSeleccionado: SubTipoExplotacionPorUsuarioModel[];

  listAprobarSubTipoExplotacionPorSeleccionado: AprobarSubTipoExplotacionPorUsuarioModel[];
  listAprobarSubTipoExplotacionSeleccionado: AprobarSubTipoExplotacionPorUsuarioModel[];

  subscription: Subscription;
  displayGrabar: boolean;
  constructor(private fb: FormBuilder,
              private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              public app: LayoutComponent,
              private readonly route: ActivatedRoute,
              private readonly cifrarDataService: CifrarDataService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Seguridad' },
                    { label: 'Usuario', routerLink: ['module-se/panel-persona'] },
                    { label: 'Actualizar'}
                ]);
              }

  ngOnInit() {

    this.themes = [
      {label: 'green'}
    ];

    this.getToObtienePerfil();

    this.route.params.subscribe((params: Params) => {
      this.idPersona = params.id;
      this.getToObtienePersonaPorId();
    });

    this.modeloForm = this.fb.group(
      {
        'apellidoPaterno' : new FormControl(this.modelo.apellidoPaterno, Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'apellidoMaterno' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'nombre' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'numeroDocumento' : new FormControl('', Validators.compose([Validators.required])),
        'numeroTelefono' : new FormControl(''),
        'flgEstado' : new FormControl(true, Validators.compose([Validators.required])),
        'usuario' : new FormControl({value: '', disabled: true}, Validators.compose(
          [Validators.required, Validators.maxLength(20), Validators.minLength(2)])),
        'password' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])),
        'email' : new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'perfil' : new FormControl('', Validators.compose([Validators.required])),
        'foto' : new FormControl(''),
        'dark' : new FormControl('true', Validators.compose([Validators.required])),
        'menu' : new FormControl('static', Validators.compose([Validators.required])),
        'theme' : new FormControl('green', Validators.compose([Validators.required])),
      }
    );
  }

  getToObtienePersonaPorId() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPersonaPorId(this.idPersona)
    .subscribe(data => {
      this.modelo = data;
      this.modeloForm.controls['apellidoPaterno'].setValue(this.modelo.apellidoPaterno);
      this.modeloForm.controls['apellidoMaterno'].setValue(this.modelo.apellidoMaterno);
      this.modeloForm.controls['nombre'].setValue(this.modelo.nombre);
      this.modeloForm.controls['numeroDocumento'].setValue(this.modelo.nroDocumento);
      this.modeloForm.controls['numeroTelefono'].setValue(this.modelo.nroTelefono);
      this.modeloForm.controls['flgEstado'].setValue(this.modelo.flgActivo);
      this.modeloForm.controls['usuario'].setValue(this.modelo.entidadUsuario.usuario);
      this.modeloForm.controls['password'].setValue(this.cifrarDataService.decrypt(this.modelo.entidadUsuario.claveOrigen));
      this.modeloForm.controls['email'].setValue(this.modelo.entidadUsuario.email);
      this.modeloForm.controls['perfil'].setValue(
        {
          label: this.modelo.entidadUsuario.descripcionPerfil, value: this.modelo.entidadUsuario.idPerfil
        });
      this.modeloForm.controls['foto'].setValue(this.modelo.entidadUsuario.imagen);
      this.sellersPermitString = this.modelo.entidadUsuario.imagen;
      this.modeloForm.controls['dark'].setValue(this.modelo.entidadUsuario.themeDark);
      this.modeloForm.controls['menu'].setValue(this.modelo.entidadUsuario.typeMenu);
      this.modeloForm.controls['theme'].setValue(this.modelo.entidadUsuario.themeColor);
      if (this.modelo.listEmpresaPorUsuario.length > 0) {
        this.listEmpresaSeleccionado = this.modelo.listEmpresaPorUsuario;
      } else {
        this.listEmpresaSeleccionado = [];
      }

      if (this.modelo.listPlantaProUsuario.length > 0) {
        this.listPlantaSeleccionado = this.modelo.listPlantaProUsuario;
      } else {
        this.listPlantaSeleccionado = [];
      }

      if (this.modelo.listSubTipoExplosionPorUsuario.length > 0) {
        this.lisSubTipoExplotacionSeleccionado = this.modelo.listSubTipoExplosionPorUsuario;
      } else {
        this.lisSubTipoExplotacionSeleccionado = [];
      }
      if (this.modelo.listAprobarSubTipoExplosionPorUsuario.length > 0) {
        this.listAprobarSubTipoExplotacionSeleccionado = this.modelo.listAprobarSubTipoExplosionPorUsuario;
      } else {
        this.listAprobarSubTipoExplotacionSeleccionado = [];
      }
      this.getEmpresaSinAccesoPorUsuario();
      this.getPlantaSinAccesoPorUsuario();
      this.getToObtieneSubTipoExplotacion();
      this.getToObtieneAprobarSubTipoExplotacion();
    });
  }

  getToObtienePerfil() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPerfil(this.modeloPerfil)
    .subscribe((data: PerfilModel[]) => {
      this.listItemPerfil = [];
      for (let item of data) {
        this.listItemPerfil.push({ label: item.descripcionPerfil, value: item.idPerfil });
      }
    });
  }

  getEmpresaSinAccesoPorUsuario() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getEmpresaSinAccesoPorUsuario(this.modelo.entidadUsuario.idUsuario)
    .subscribe((data: EmpresaPorUsuarioModel[]) => {
      this.listEmpresaPorSeleccionado = [];
      this.listEmpresaPorSeleccionado = data;
    });
  }

  getPlantaSinAccesoPorUsuario() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPlantaSinAccesoPorUsuario(this.modelo.entidadUsuario.idUsuario)
    .subscribe((data: PlantaPorUsuarioModel[]) => {
      this.listPlantaPorSeleccionado = [];
      this.listPlantaPorSeleccionado = data;
    });
  }

  getToObtieneSubTipoExplotacion() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getSubTipoExplotacionSinAccesoPorUsuario(this.modelo.entidadUsuario.idUsuario)
    .subscribe((data: SubTipoExplotacionPorUsuarioModel[]) => {
      this.listSubTipoExplotacionPorSeleccionado = [];
      this.listSubTipoExplotacionPorSeleccionado = data;
    });
  }

  getToObtieneAprobarSubTipoExplotacion() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getAprobarSubTipoExplotacionSinAccesoPorUsuario(this.modelo.entidadUsuario.idUsuario)
    .subscribe((data: AprobarSubTipoExplotacionPorUsuarioModel[]) => {
      this.listAprobarSubTipoExplotacionPorSeleccionado = [];
      this.listAprobarSubTipoExplotacionPorSeleccionado = data;
    });
  }

  onBasicUpload(event: any) {
    let fileList: FileList = event.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.sellersPermitFile = file;
      this.handleInputChange(file);
    } else {
      alert("No file selected");
    }
  }

  handleInputChange(files) {
    let file = files;
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    let base64result = reader.result
    this.sellersPermitString = base64result;
    this.modeloForm.controls['foto'].setValue(this.sellersPermitString);
  }

  onClearUpload() {
    this.modeloForm.controls['foto'].setValue(this.modelo.entidadUsuario.imagen);
    this.sellersPermitString = this.modelo.entidadUsuario.imagen;
  }

  changeDarkOrLight(activo: boolean) {
    this.app.changeDarkOrLight(activo);
  }

  onClickSave() {
    this.displayGrabar = true;
    this.modelo.listEmpresaPorUsuario = this.listEmpresaSeleccionado;
    this.modelo.listPlantaProUsuario = this.listPlantaSeleccionado;
    this.modelo.listSubTipoExplosionPorUsuario = this.lisSubTipoExplotacionSeleccionado;
    this.listAprobarSubTipoExplotacionSeleccionado.map(x => {
      x.flgAprobar = true;
    });
    this.modelo.listAprobarSubTipoExplosionPorUsuario = this.listAprobarSubTipoExplotacionSeleccionado;
    this.modelo.apellidoPaterno = this.modeloForm.controls['apellidoPaterno'].value;
    this.modelo.apellidoMaterno = this.modeloForm.controls['apellidoMaterno'].value;
    this.modelo.nombre = this.modeloForm.controls['nombre'].value;
    this.modelo.nroDocumento = this.modeloForm.controls['numeroDocumento'].value.toString();
    this.modelo.nroTelefono = this.modeloForm.controls['numeroTelefono'].value.toString();
    this.modelo.flgActivo = this.modeloForm.controls['flgEstado'].value;
    this.modelo.entidadUsuario.imagen = this.modeloForm.controls['foto'].value;
    this.modelo.entidadUsuario.usuario = this.modeloForm.controls['usuario'].value;
    this.modelo.entidadUsuario.claveOrigen = this.cifrarDataService.encrypt(this.modeloForm.controls['password'].value);
    this.modelo.entidadUsuario.email = this.modeloForm.controls['email'].value;
    if (this.modeloForm.controls['perfil'].value) {
      let itemPerfil = this.modeloForm.controls['perfil'].value;
      this.modelo.entidadUsuario.idPerfil = itemPerfil.value;
    }
    this.modelo.entidadUsuario.imagen = this.modeloForm.controls['foto'].value;
    this.modelo.entidadUsuario.themeDark = Boolean(this.modeloForm.controls['dark'].value);
    this.modelo.entidadUsuario.typeMenu = this.modeloForm.controls['menu'].value;
    this.modelo.entidadUsuario.themeColor = this.modeloForm.controls['theme'].value;
    // console.log(this.modelo);
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setUpdatePersona(this.modelo)
    .subscribe(() =>  {
      
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.displayGrabar = false;
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  back() {
    this.displayGrabar = false;
    this.router.navigate(['/main/module-se/panel-persona']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
