import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { SessionService } from '../../services/session.service';
import { UserContextService } from '../../services/user-context.service';

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
              private userContextService: UserContextService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.nombre = this.sessionService.getItemDecrypt('nombre');
    this.imagen = this.sessionService.getItemDecrypt('imagen');
  }

  logout() {
    this.userContextService.logout();
  }
}
