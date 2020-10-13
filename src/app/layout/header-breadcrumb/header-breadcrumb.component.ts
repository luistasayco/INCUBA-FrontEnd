import { Component, OnDestroy, OnInit, TRANSLATIONS } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { SessionService } from '../../services/session.service';
import { UserContextService } from '../../services/user-context.service';
import { Router } from '@angular/router';
import { estadoInternetService } from '../../modules/modulo-estado-internet/estadoInternet.service';
import { variable_global } from '../../interface/variable-global.interface';

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
                private sessionService: SessionService,
                private userContextService: UserContextService,
                private router: Router,
                private readonly servicioInternet: estadoInternetService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }
    ngOnInit() {
        this.iniciarObservableEstadoInternet();
    }

    logout() {
        this.userContextService.logout();
        this.sessionService.clear();
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    iniciarObservableEstadoInternet() {
        this.subscripcionInternet = this.servicioInternet._ESTADO_INTERNET$.subscribe(
          estado => {
            if (estado) {
                variable_global.ESTADO_INTERNET = true;
                this.isNetwork = true;
            } else {
                this.isNetwork = false;
                variable_global.ESTADO_INTERNET = false;
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
