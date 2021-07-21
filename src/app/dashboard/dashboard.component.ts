import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Titulo del componente
  titulo = "Dashboard";

  constructor(private breadcrumbService: BreadcrumbService,
              private router: Router) {
    this.breadcrumbService.setItems([
        { label: 'Dashboard', routerLink: ['/dashboard'] }
    ]);
  }

  ngOnInit(): void {
  }

  onSync() {
    // this.router.navigate(['/main/module-si']);
  }

}
