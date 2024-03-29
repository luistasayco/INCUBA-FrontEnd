import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstants } from '../../../../modulo-compartido/models/globals-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PersonaModel } from '../../../models/persona.model';
import { SeguridadService } from '../../../services/seguridad.service';
import { MensajePrimeNgService } from '../../../../modulo-compartido/services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { LayoutComponent } from '../../../../../layout/layout.component';
import { SelectItem } from 'primeng';
import { PerfilModel } from '../../../models/pefil.model';
import { UsuarioModel } from '../../../models/usuario.model';
import { Subscription } from 'rxjs';
import { EmpresaPorUsuarioModel } from '../../../models/empresa-por-usuario';
import { SubTipoExplotacionPorUsuarioModel } from '../../../models/sub-tipo-explotacion-por-usuario.model';
import { CifrarDataService } from '../../../../../services/cifrar-data.service';
import { AprobarSubTipoExplotacionPorUsuarioModel } from '../../../models/aprobar-sub-tipo-explotacion-por-usuario';
import { ConstantesVarios } from '../../../../../constants/constantes-varios';
import { PlantaPorUsuarioModel } from '../../../models/planta-por-usuario';

@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.css']
})
export class PersonaCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Usuario';

  // Name de los botones de accion
  globalConstants: GlobalsConstants = new GlobalsConstants();

  modeloForm: FormGroup;

  modelo: PersonaModel = new PersonaModel();
  modeloPerfil: PerfilModel = new PerfilModel();

  themes: any[];

  listItemPerfil: SelectItem[];

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
              private cifrarDataService: CifrarDataService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Seguridad' },
                    { label: 'Usuario', routerLink: ['module-se/panel-persona'] },
                    { label: 'Nuevo'}
                ]);
              }

  ngOnInit() {
    this.sellersPermitString = '';
    this.listEmpresaPorSeleccionado = [];
    this.listEmpresaSeleccionado = [];
    this.listPlantaPorSeleccionado = [];
    this.listPlantaSeleccionado = [];
    this.lisSubTipoExplotacionSeleccionado = [];
    this.listAprobarSubTipoExplotacionSeleccionado = [];
    this.themes = [
      {label: 'green'}
    ];

    this.getToObtienePerfil();
    this.getEmpresaSinAccesoPorUsuario();
    this.getPlantaSinAccesoPorUsuario();
    this.getToObtieneSubTipoExplotacion();
    this.getToObtieneAprobarSubTipoExplotacion();

    this.modeloForm = this.fb.group(
      {
        'apellidoPaterno' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'apellidoMaterno' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'nombre' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'numeroDocumento' : new FormControl('', Validators.compose([Validators.required])),
        'numeroTelefono' : new FormControl(''),
        'flgEstado' : new FormControl({value: true, disabled: true}, Validators.compose([Validators.required])),
        'usuario' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(2)])),
        'password' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(4)])),
        'email' : new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'perfil' : new FormControl('', Validators.compose([Validators.required])),
        'foto' : new FormControl(''),
        'dark' : new FormControl('true', Validators.compose([Validators.required])),
        'menu' : new FormControl('static', Validators.compose([Validators.required])),
        'theme' : new FormControl('green', Validators.compose([Validators.required])),
      }
    );
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
    this.subscription = this.seguridadService.getEmpresaSinAccesoPorUsuario(0)
    .subscribe((data: EmpresaPorUsuarioModel[]) => {
      this.listEmpresaPorSeleccionado = [];
      this.listEmpresaPorSeleccionado = data;
    });
  }

  getPlantaSinAccesoPorUsuario() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPlantaSinAccesoPorUsuario(0)
    .subscribe((data: PlantaPorUsuarioModel[]) => {
      this.listPlantaPorSeleccionado = [];
      this.listPlantaPorSeleccionado = data;
    });
  }

  getToObtieneSubTipoExplotacion() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getSubTipoExplotacionSinAccesoPorUsuario(0)
    .subscribe((data: SubTipoExplotacionPorUsuarioModel[]) => {
      this.listSubTipoExplotacionPorSeleccionado = [];
      this.listSubTipoExplotacionPorSeleccionado = data;
    });
  }

  getToObtieneAprobarSubTipoExplotacion() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getAprobarSubTipoExplotacionSinAccesoPorUsuario(0)
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
    this.modeloForm.controls['foto'].setValue('');
    this.sellersPermitString = '';
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
    this.modelo.entidadUsuario = new UsuarioModel();
    this.modelo.entidadUsuario.imagen = this.modeloForm.controls['foto'].value;
    this.modelo.entidadUsuario.usuario = this.modeloForm.controls['usuario'].value;
    this.modelo.entidadUsuario.claveOrigen = this.cifrarDataService.encrypt(this.modeloForm.controls['password'].value);
    this.modelo.entidadUsuario.email = this.modeloForm.controls['email'].value;
    
    if (this.modeloForm.controls['perfil'].value) {
      let itemPerfil = this.modeloForm.controls['perfil'].value;
      this.modelo.entidadUsuario.idPerfil = itemPerfil.value;
    }

    if(this.sellersPermitString === '') {
      this.modelo.entidadUsuario.imagen = ConstantesVarios._IMAGEDEFAULT;
    } else {
      this.modelo.entidadUsuario.imagen = this.modeloForm.controls['foto'].value;
    }
    
    this.modelo.entidadUsuario.themeDark = Boolean(this.modeloForm.controls['dark'].value);
    this.modelo.entidadUsuario.typeMenu = this.modeloForm.controls['menu'].value;
    this.modelo.entidadUsuario.themeColor = this.modeloForm.controls['theme'].value;
    
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setInsertPersona(this.modelo)
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
