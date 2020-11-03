import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEquipoRoutingModule } from './modulo-registro-equipo-routing.module';
import { RegistroEquipoPrimeNgModule } from './modulo-registro-equipo-primeng.module';
import { PanelMantenimientoComponent } from './components/panel-mantenimiento/panel-mantenimiento.component';
import { PanelCondicionLimpiezaComponent } from './components/panel-condicion-limpieza/panel-condicion-limpieza.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RegistroEquipoUpdateOffLineComponent } from './components/panel-registro-equipo-off-line/registro-equipo-update-off-line/registro-equipo-update-off-line.component';
import { RegistroEquipoCreateOffLineComponent } from './components/panel-registro-equipo-off-line/registro-equipo-create-off-line/registro-equipo-create-off-line.component';
import { GaleriaImagenModule } from '../modulo-compartido/components/galeria-imagen/galeria-imagen.module';
import { FirmaDigitalModule } from '../modulo-compartido/components/panel-firma-digital/panel-firma-digital.module';

@NgModule({
    declarations: [PanelMantenimientoComponent,
                PanelCondicionLimpiezaComponent,
                MantenimientoCreateComponent,
                CondicionLimpiezaCreateComponent,
                PanelModeloComponent,
                ModeloCreateComponent,
                PanelAsociacionComponent,
                PanelRequerimientoEquipoComponent,
                RequerimientoEquipoCreateComponent,
                PanelRegistroEquipoComponent,
                RegistroEquipoCreateComponent,
                RegistroEquipoUpdateComponent,
                PanelRegistroEquipoOffLineComponent,
                RegistroEquipoUpdateOffLineComponent,
                RegistroEquipoCreateOffLineComponent],
    imports: [ CommonModule,
        RegistroEquipoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RegistroEquipoPrimeNgModule, GaleriaImagenModule, FirmaDigitalModule],
    exports: [],
    providers: [],
})
export class RegistroEquipoModule {}