import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelAgujaComponent } from './components/panel-aguja/panel-aguja.component';
import { AgujaCreateComponent } from './components/panel-aguja/aguja-create/aguja-create.component';
import { PanelIrregularidadComponent } from './components/panel-irregularidad/panel-irregularidad.component';
import { IrregularidadCreateComponent } from './components/panel-irregularidad/irregularidad-create/irregularidad-create.component';
import { PanelProcesoSubcutaneaComponent } from './components/panel-proceso-subcutanea/panel-proceso-subcutanea.component';
import { ProcesoSubcutaneaCreateComponent } from './components/panel-proceso-subcutanea/proceso-subcutanea-create/proceso-subcutanea-create.component';
import { PanelProcesoDetalleSubcutaneaComponent } from './components/panel-proceso-detalle-subcutanea/panel-proceso-detalle-subcutanea.component';
import { ProcesoDetalleSubcutaneaCreateComponent } from './components/panel-proceso-detalle-subcutanea/proceso-detalle-subcutanea-create/proceso-detalle-subcutanea-create.component';
import { PanelVacunacionSubcutaneaComponent } from './components/panel-vacunacion-subcutanea/panel-vacunacion-subcutanea.component';
import { VacunacionSubcutaneaCreateComponent } from './components/panel-vacunacion-subcutanea/vacunacion-subcutanea-create/vacunacion-subcutanea-create.component';
import { VacunacionSubcutaneaUpdateComponent } from './components/panel-vacunacion-subcutanea/vacunacion-subcutanea-update/vacunacion-subcutanea-update.component';

const routes: Routes = [
    { path: 'panel-aguja', component: PanelAgujaComponent },
    { path: 'aguja-create', component: AgujaCreateComponent },
    { path: 'panel-irregularidad', component: PanelIrregularidadComponent },
    { path: 'irregularidad-create', component: IrregularidadCreateComponent },
    { path: 'panel-proceso-subcutanea', component: PanelProcesoSubcutaneaComponent },
    { path: 'proceso-subcutanea-create', component: ProcesoSubcutaneaCreateComponent },
    { path: 'panel-proceso-detalle-subcutanea', component: PanelProcesoDetalleSubcutaneaComponent },
    { path: 'proceso-detalle-subcutanea-create/:id', component: ProcesoDetalleSubcutaneaCreateComponent },
    { path: 'panel-vacunacion-subcutanea', component: PanelVacunacionSubcutaneaComponent },
    { path: 'vacunacion-subcutanea-create', component: VacunacionSubcutaneaCreateComponent },
    { path: 'vacunacion-subcutanea-update/:id', component: VacunacionSubcutaneaUpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VacunacionSubCutaneaRoutingModule {}
