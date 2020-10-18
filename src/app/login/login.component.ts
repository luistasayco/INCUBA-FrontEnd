import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { VARIABLES_GLOBALES } from '../shared/constants';
import { Router } from '@angular/router';
import { MensajePrimeNgService } from '../modules/modulo-compartido/services/mensaje-prime-ng.service';
import { UserContextService } from '../services/user-context.service';
import { SessionService } from '../services/session.service';
import { MenuDinamicoService } from '../services/menu-dinamico.service';
import { CifrarDataService } from '../services/cifrar-data.service';
import { DataBaseModel } from '../modules/modulo-seguridad/models/data-base';
import { SelectItem } from 'primeng';
import { ConstantesDataBase } from '../constants/constantes-db';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TraerDatosRemotosService } from '../modules/modulo-repository/services/traer-datos-remotos.service';
import { estadoInternetService } from '../modules/modulo-estado-internet/estadoInternet.service';
import { Subscription } from 'rxjs';
import { variableGlobal } from '../interface/variable-global.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  modeloLogin: LoginModel;

  listItemDataBase: SelectItem[];

  formularioLogin: FormGroup;

  displayTraeData: boolean;

  displayMensaje: string;

  subscripcionInternet: Subscription;
  subscripcion: Subscription;

  constructor(private readonly loginService: LoginService,
              private readonly router: Router,
              public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly userContextService: UserContextService,
              private readonly menuDinamicoService: MenuDinamicoService,
              private readonly cifrarDataService: CifrarDataService,
              private readonly sessionService: SessionService,
              private readonly fb: FormBuilder,
              private readonly servicioTraerDatos: TraerDatosRemotosService,
              private readonly servicioInternet: estadoInternetService) { }

  ngOnInit(): void {
    this.sessionService.setItem('FLGDATABASESELECCIONADA', this.cifrarDataService.encrypt(false));

    this.modeloLogin = new LoginModel();
    this.iniciarObservableEstadoInternet();
    this.instanciarFormulario();

    this.subscripcion = new Subscription();
    this.subscripcion = this.loginService.getDataBaseAll()
    .subscribe((resultado: DataBaseModel[]) => {
      this.listItemDataBase = [];
      for (let item of resultado) {
        this.listItemDataBase.push({ label: item.descripcionDataBase, value: item.idDataBase });
      }
    });
  }

  iniciarObservableEstadoInternet() {
    this.subscripcionInternet = this.servicioInternet._ESTADO_INTERNET$.subscribe(
      estado => {
        variableGlobal.ESTADO_INTERNET = estado;
      }
    );
  }

  instanciarFormulario() {
    this.formularioLogin = this.fb.group({
      dataBase: new FormControl('', [
        Validators.required
      ]),
      login: new FormControl('', [
        Validators.minLength(4),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ])
    });
  }

  onChangeDataBase() {
    this.sessionService.setItem('FLGDATABASESELECCIONADA', this.cifrarDataService.encrypt(true));
    this.sessionService.setItem('DATABASESELECCIONADA', this.cifrarDataService.encrypt(this.formularioLogin.value.dataBase.value));
  }

  onClickLogin()
  {
    this.displayTraeData = true;
    this.modeloLogin.usuario = this.formularioLogin.value.login;
    this.modeloLogin.clave = this.formularioLogin.value.password;

    this.subscripcion = new Subscription();
    this.subscripcion = this.loginService.autentica(this.modeloLogin)
    .subscribe((res: any) => {
        localStorage.setItem(VARIABLES_GLOBALES.valorToken, res.token);
        this.displayMensaje = 'Inicio => Sincronizando Información';
        this.onEncriptaData(res);
        this.onGeneraMenu();
        this.onSetDataLocal(res);
      },
      (err) => {
        console.log('err', err);
        this.displayTraeData = false;
        this.mensajePrimeNgService.onToErrorMsg('Login', err.error);
      }
    );
  }

  onFinalizaProceso() {
    this.displayMensaje = 'Datos obtenidos desde el Servidor. Completado';
    this.router.navigate(['/main/dashboard']);
  }

  onEncriptaData(res: any) {
    this.sessionService.setItem('menu', res.listaAccesoMenu);
    this.sessionService.setItem('idUsuario', this.cifrarDataService.encrypt(res.idUsuario));
    this.sessionService.setItem('imagen', this.cifrarDataService.encrypt(res.imagen));
    this.sessionService.setItem('nombre', this.cifrarDataService.encrypt(res.nombre));
    this.userContextService.setUser(this.cifrarDataService.encrypt(res.usuario));
  }

  onGeneraMenu() {
    this.menuDinamicoService.setArmaMenuDimamico();
  }

  onSetDataLocal(resp: any) {
    this.servicioTraerDatos.obtenerDatosDesdeServidor(resp);
    this.subscripcion = new Subscription();
    this.subscripcion = this.servicioTraerDatos.datosCargadosTotalmente.subscribe(
      resultado => {
        if (resultado) {
          this.displayTraeData = false;
          this.onFinalizaProceso();
          this.displayMensaje = 'Fin => Sincronizando Información';

          console.log('Datos obtenidos desde el Servidor. Completado: ' );
        } else {
          console.log('AUN NO TERMINA LA SINCRONIZACION');
        }
      },
      error => {
        this.displayTraeData = false;
        this.userContextService.logout();
        console.log('Error en mostrarSiguienteVista()' + error);
      }
    );
  }

  ngOnDestroy() {
    this.subscripcionInternet.unsubscribe();
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
  }
  }
}
