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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modeloLogin: LoginModel;

  constructor(private loginService: LoginService,
              private router: Router,
              public mensajePrimeNgService: MensajePrimeNgService,
              private userContextService: UserContextService,
              private menuDinamicoService: MenuDinamicoService,
              private cifrarDataService: CifrarDataService,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.modeloLogin = new LoginModel();
  }

  onClickLogin()
  {
    this.loginService.autentica(this.modeloLogin)
    .subscribe((res: any) => {
        localStorage.setItem(VARIABLES_GLOBALES.valorToken, res.token);
        this.sessionService.setItem('menu', res.listaAccesoMenu);
        this.sessionService.setItem('idUsuario', this.cifrarDataService.encrypt(res.idUsuario));
        this.sessionService.setItem('imagen', this.cifrarDataService.encrypt(res.imagen));
        this.sessionService.setItem('nombre', this.cifrarDataService.encrypt(res.nombre));
        this.userContextService.setUser(this.cifrarDataService.encrypt(res.usuario));
        this.menuDinamicoService.setArmaMenuDimamico();
        this.router.navigate(['/main/dashboard']);
      },
      (err) => {
        this.mensajePrimeNgService.onToErrorMsg('Login', 'Credenciales Incorrectas');
      }
    );
  }
}
