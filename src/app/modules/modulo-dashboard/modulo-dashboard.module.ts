import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelDashboardComponent } from './components/panel-dashboard/panel-dashboard.component';
import { DashboardRoutingModule } from './modulo-dashboard-routing.module';
import { DashboardPrimeNgModule } from './modulo-dashboard-primeng.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PanelDashboardComponent],
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
