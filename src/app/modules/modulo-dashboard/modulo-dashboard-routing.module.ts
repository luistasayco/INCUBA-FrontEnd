import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PanelDashboardComponent } from "./components/panel-dashboard/panel-dashboard.component";

const routes: Routes = [
    {path: '', component: PanelDashboardComponent}

];    

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}