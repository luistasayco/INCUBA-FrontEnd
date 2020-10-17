import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modeloLogin: LoginModel;

  listItemDataBase: SelectItem[];

  selectedData: any;

  constructor(private loginService: LoginService,
              private router: Router,
              public mensajePrimeNgService: MensajePrimeNgService,
              private userContextService: UserContextService,
              private menuDinamicoService: MenuDinamicoService,
              private cifrarDataService: CifrarDataService,
              private sessionService: SessionService) { }

  ngOnInit(): void {

    ConstantesDataBase._FLGDATABASESELECCIONADA = false;

    this.modeloLogin = new LoginModel();

    this.loginService.getDataBaseAll()
    .subscribe((resultado: DataBaseModel[]) => {
      this.listItemDataBase = [];
      for (let item of resultado) {
        this.listItemDataBase.push({ label: item.descripcionDataBase, value: item.idDataBase });
      }
    });
  }

  onChangeDataBase() {
    ConstantesDataBase._FLGDATABASESELECCIONADA = true;
    ConstantesDataBase._DATABASESELECCIONADA = this.selectedData.value;
  }

  onClickLogin()
  {
    if (!this.selectedData) { return; }
    this.loginService.autentica(this.modeloLogin)
    .subscribe((res: any) => {
        localStorage.setItem(VARIABLES_GLOBALES.valorToken, res.token);
        this.onEncriptaData(res);
        this.onGeneraMenu();
        this.router.navigate(['/main/dashboard']);
      },
      (err) => {
        console.log('err', err);
        this.mensajePrimeNgService.onToErrorMsg('Login', 'Credenciales Incorrectas');
      }
    );
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
}
