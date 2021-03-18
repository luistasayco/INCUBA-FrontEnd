import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelMantenimientoComponent } from './components/panel-mantenimiento/panel-mantenimiento.component';
import { PanelCondicionLimpiezaComponent } from './components/panel-condicion-limpieza/panel-condicion-limpieza.component';
import { MantenimientoCreateComponent } from './components/panel-mantenimiento/mantenimiento-create/mantenimiento-create.component';
import { CondicionLimpiezaCreateComponent } from './components/panel-condicion-limpieza/condicion-limpieza-create/condicion-limpieza-create.component';
import { PanelModeloComponent } from './components/panel-modelo/panel-modelo.component';
import { ModeloCreateComponent } from './components/panel-modelo/modelo-create/modelo-create.component';
import { PanelAsociacionComponent } from './components/panel-asociacion/panel-asociacion.component';
import { PanelRequerimientoEquipoComponent } from './components/panel-requerimiento-equipo/panel-requerimiento-equipo.component';
import { RequerimientoEquipoCreateComponent } from './components/panel-requerimiento-equipo/requerimiento-equipo-create/requerimiento-equipo-create.component';
import { PanelRegistroEquipoComponent } from './components/panel-registro-equipo/panel-registro-equipo.component';
import { RegistroEquipoCreateComponent } from './components/panel-registro-equipo/registro-equipo-create/registro-equipo-create.component';
import { RegistroEquipoUpdateComponent } from './components/panel-registro-equipo/registro-equipo-update/registro-equipo-update.component';
import { PanelRegistroEquipoOffLineComponent } from './components/panel-registro-equipo-off-line/panel-registro-equipo-off-line.component';
import { RegistroEquipoCreateOffLineComponent } from './components/panel-registro-equipo-off-line/registro-equipo-create-off-line/registro-equipo-create-off-line.component';
import { RegistroEquipoUpdateOffLineComponent } from './components/panel-registro-equipo-off-line/registro-equipo-update-off-line/registro-equipo-update-off-line.component';

const routes: Routes = [
    { path: 'panel-mantenimiento', component: PanelMantenimientoComponent},
    { path: 'create-mantenimiento', component: MantenimientoCreateComponent},
    { path: 'panel-condicion-limpieza', component: PanelCondicionLimpiezaComponent},
    { path: 'create-condicion-limpieza', component: CondicionLimpiezaCreateComponent},
    { path: 'panel-modelo', component: PanelModeloComponent},
    { path: 'create-modelo', component: ModeloCreateComponent},
    { path: 'panel-asociacion', component: PanelAsociacionComponent},
    { path: 'panel-requerimiento-equipo', component: PanelRequerimientoEquipoComponent},
    { path: 'create-requerimiento-equipo', component: RequerimientoEquipoCreateComponent},
    { path: 'panel-registro-equipo', component: PanelRegistroEquipoComponent},
    { path: 'create-registro-equipo', component: RegistroEquipoCreateComponent},
    { path: 'update-registro-equipo/:id', component: RegistroEquipoUpdateComponent},
    { path: 'panel-registro-equipo-offline', component: PanelRegistroEquipoOffLineComponent},
    { path: 'create-registro-equipo-offline', component: RegistroEquipoCreateOffLineComponent},
    { path: 'update-registro-equipo-offline/:id', component: RegistroEquipoUpdateOffLineComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistroEquipoRoutingModule {}
