import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacunacionSprayRoutingModule } from './modulo-vacunacion-spray-routing.module';
import { VacunacionSprayPrimeNgModule } from './modulo-vacunacion-spray-primeng.module';
import { GaleriaImagenModule } from '../modulo-compartido/components/galeria-imagen/galeria-imagen.module';
import { FirmaDigitalModule } from '../modulo-compartido/components/panel-firma-digital/panel-firma-digital.module';
import { PanelBoquillaComponent } from './components/panel-boquilla/panel-boquilla.component';
import { BoquillaCreateComponent } from './components/panel-boquilla/boquilla-create/boquilla-create.component';
import { PanelProcesoSprayComponent } from './components/panel-proceso-spray/panel-proceso-spray.component';
import { ProcesoSprayCreateComponent } from './components/panel-proceso-spray/proceso-spray-create/proceso-spray-create.component';
import { PanelProcesoDetalleSprayComponent } from './components/panel-proceso-detalle-spray/panel-proceso-detalle-spray.component';
import { ProcesoDetalleSprayCreateComponent } from './components/panel-proceso-detalle-spray/proceso-detalle-spray-create/proceso-detalle-spray-create.component';
import { PanelVacunaComponent } from './components/panel-vacuna/panel-vacuna.component';
import { VacunaCreateComponent } from './components/panel-vacuna/vacuna-create/vacuna-create.component';
import { PanelVacunacionSprayComponent } from './components/panel-vacunacion-spray/panel-vacunacion-spray.component';
import { VacunacionSprayCreateComponent } from './components/panel-vacunacion-spray/vacunacion-spray-create/vacunacion-spray-create.component';
import { VacunacionSprayUpdateComponent } from './components/panel-vacunacion-spray/vacunacion-spray-update/vacunacion-spray-update.component';

@NgModule({
    declarations: [PanelBoquillaComponent,
        BoquillaCreateComponent,
        PanelProcesoSprayComponent,
        ProcesoSprayCreateComponent,
        PanelProcesoDetalleSprayComponent,
        ProcesoDetalleSprayCreateComponent,
        PanelVacunaComponent,
        VacunaCreateComponent,
        PanelVacunacionSprayComponent,
        VacunacionSprayCreateComponent,
        VacunacionSprayUpdateComponent],
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, VacunacionSprayRoutingModule, VacunacionSprayPrimeNgModule, GaleriaImagenModule, FirmaDigitalModule ],
    exports: [],
    providers: [],
})
export class VacunacionSprayModule {}