import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelSincronizacionComponent } from './components/panel-sincronizacion/panel-sincronizacion.component';

const routes: Routes = [
    { path: '', component: PanelSincronizacionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SincronizacionRoutingModule {}
