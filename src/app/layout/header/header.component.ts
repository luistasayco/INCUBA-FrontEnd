import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { SessionService } from '../../services/session.service';
import { UserContextService } from '../../services/user-context.service';
import { Router } from '@angular/router';
import { CifrarDataService } from '../../services/cifrar-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombre: string;
  imagen: string;

  constructor(public app: LayoutComponent,
              private sessionService: SessionService,
              private userContextService: UserContextService,
              private router: Router,
              private cifrarDataService: CifrarDataService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.nombre = this.cifrarDataService.decrypt(this.sessionService.getItem('nombre'));
    this.imagen = this.cifrarDataService.decrypt(this.sessionService.getItem('imagen'));
  }

  logout() {
    this.userContextService.logout();
  }
}
