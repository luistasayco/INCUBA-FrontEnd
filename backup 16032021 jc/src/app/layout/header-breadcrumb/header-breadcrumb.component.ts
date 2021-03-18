import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { SessionService } from '../../services/session.service';
import { UserContextService } from '../../services/user-context.service';
import { Router } from '@angular/router';
import { estadoInternetService } from '../../modules/modulo-estado-internet/estadoInternet.service';
import { variableGlobal } from '../../interface/variable-global.interface';

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.css']
})
export class HeaderBreadcrumbComponent implements OnDestroy, OnInit {

    subscription: Subscription;

    items: MenuItem[];
    // Variable para detectar el estado del internet
    subscripcionInternet: Subscription;
    isNetwork: boolean;

    constructor(public breadcrumbService: BreadcrumbService,
                private userContextService: UserContextService,
                private readonly servicioInternet: estadoInternetService,
                private readonly router: Router) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }
    ngOnInit() {
        this.iniciarObservableEstadoInternet();
    }

    logout() {
        this.userContextService.logout();
    }

    cambiarPassword() {
        this.router.navigate(['/main/module-se/panel-recuperar-clave']);
    }

    iniciarObservableEstadoInternet() {
        this.subscripcionInternet = this.servicioInternet._ESTADO_INTERNET$.subscribe(
          estado => {
            variableGlobal.ESTADO_INTERNET = estado;
            if (estado) {
                this.isNetwork = estado;
            } else {
                this.isNetwork = estado;
            }
          }
        );
      }

    ngOnDestroy() {
        this.subscripcionInternet.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
