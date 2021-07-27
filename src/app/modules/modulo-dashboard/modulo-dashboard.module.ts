import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelDashboardComponent } from './components/panel-dashboard/panel-dashboard.component';
import { DashboardRoutingModule } from './modulo-dashboard-routing.module';
import { DashboardPrimeNgModule } from './modulo-dashboard-primeng.module';
import { FormsModule } from '@angular/forms';
import { PanelDashboardAuditoriaComponent } from './components/panel-dashboard-auditoria/panel-dashboard-auditoria.component';

@NgModule({
  declarations: [PanelDashboardComponent, PanelDashboardAuditoriaComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardPrimeNgModule,
    FormsModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule { }
