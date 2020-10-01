import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { SessionService } from '../../services/session.service';
import { UserContextService } from '../../services/user-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.css']
})
export class HeaderBreadcrumbComponent implements OnDestroy {

  subscription: Subscription;

    items: MenuItem[];

    constructor(public breadcrumbService: BreadcrumbService,
                private sessionService: SessionService,
                private userContextService: UserContextService,
                private router: Router) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    logout() {
        this.userContextService.logout();
        this.sessionService.clear();
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
