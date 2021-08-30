import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PanelDashboardComponent } from "./components/panel-dashboard/panel-dashboard.component";
import { PanelDashboardAuditoriaComponent } from './components/panel-dashboard-auditoria/panel-dashboard-auditoria.component';
import { PanelDashboardSinmiComponent } from './components/panel-dashboard-sinmi/panel-dashboard-sinmi.component';

const routes: Routes = [
    {path: 'panel-dashboard', component: PanelDashboardComponent},
    {path: 'panel-dashboard-auditoria', component: PanelDashboardAuditoriaComponent},
    {path: 'panel-dashboard-sinmi' , component: PanelDashboardSinmiComponent}
];    

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}