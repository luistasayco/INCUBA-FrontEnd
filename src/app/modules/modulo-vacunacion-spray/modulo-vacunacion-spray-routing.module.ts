import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelBoquillaComponent } from './components/panel-boquilla/panel-boquilla.component';
import { BoquillaCreateComponent } from './components/panel-boquilla/boquilla-create/boquilla-create.component';
import { PanelProcesoSprayComponent } from './components/panel-proceso-spray/panel-proceso-spray.component';
import { ProcesoSprayCreateComponent } from './components/panel-proceso-spray/proceso-spray-create/proceso-spray-create.component';
import { PanelVacunaComponent } from './components/panel-vacuna/panel-vacuna.component';
import { VacunaCreateComponent } from './components/panel-vacuna/vacuna-create/vacuna-create.component';
import { PanelProcesoDetalleSprayComponent } from './components/panel-proceso-detalle-spray/panel-proceso-detalle-spray.component';
import { ProcesoDetalleSprayCreateComponent } from './components/panel-proceso-detalle-spray/proceso-detalle-spray-create/proceso-detalle-spray-create.component';
import { PanelVacunacionSprayComponent } from './components/panel-vacunacion-spray/panel-vacunacion-spray.component';
import { VacunacionSprayCreateComponent } from './components/panel-vacunacion-spray/vacunacion-spray-create/vacunacion-spray-create.component';
import { VacunacionSprayUpdateComponent } from './components/panel-vacunacion-spray/vacunacion-spray-update/vacunacion-spray-update.component';
import { PanelVacunacionSprayOfflineComponent } from './components/panel-vacunacion-spray-offline/panel-vacunacion-spray-offline.component';
import { VacunacionSprayCreateOfflineComponent } from './components/panel-vacunacion-spray-offline/vacunacion-spray-create-offline/vacunacion-spray-create-offline.component';
import { VacunacionSprayUpdateOfflineComponent } from './components/panel-vacunacion-spray-offline/vacunacion-spray-update-offline/vacunacion-spray-update-offline.component';

const routes: Routes = [
    { path: 'panel-boquilla', component: PanelBoquillaComponent },
    { path: 'boquilla-create', component: BoquillaCreateComponent },
    { path: 'panel-proceso-spray', component: PanelProcesoSprayComponent },
    { path: 'proceso-spray-create', component: ProcesoSprayCreateComponent },
    { path: 'panel-proceso-detalle-spray', component: PanelProcesoDetalleSprayComponent },
    { path: 'proceso-detalle-spray-create/:id', component: ProcesoDetalleSprayCreateComponent },
    { path: 'panel-vacuna', component: PanelVacunaComponent },
    { path: 'vacuna-create', component: VacunaCreateComponent },
    // Vacunacion Spray Online
    { path: 'panel-vacunacion-spray', component: PanelVacunacionSprayComponent },
    { path: 'vacunacion-spray-create', component: VacunacionSprayCreateComponent },
    { path: 'vacunacion-spray-update/:id', component: VacunacionSprayUpdateComponent },
    // Vacunacion Spray Offline
    { path: 'panel-vacunacion-spray-offline', component: PanelVacunacionSprayOfflineComponent },
    { path: 'vacunacion-spray-create-offline', component: VacunacionSprayCreateOfflineComponent },
    { path: 'vacunacion-spray-update-offline/:id', component: VacunacionSprayUpdateOfflineComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VacunacionSprayRoutingModule {}
