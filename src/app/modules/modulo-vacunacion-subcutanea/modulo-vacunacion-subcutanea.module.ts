import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacunacionSubCutaneaPrimeNgModule } from './modulo-vacunacion-subcutanea-primeng.module';
import { VacunacionSubCutaneaRoutingModule } from './modulo-vacunacion-subcutanea-routing.module';
import { GaleriaImagenModule } from '../modulo-compartido/components/galeria-imagen/galeria-imagen.module';
import { FirmaDigitalModule } from '../modulo-compartido/components/panel-firma-digital/panel-firma-digital.module';
import { PanelAgujaComponent } from './components/panel-aguja/panel-aguja.component';
import { AgujaCreateComponent } from './components/panel-aguja/aguja-create/aguja-create.component';
import { PanelIrregularidadComponent } from './components/panel-irregularidad/panel-irregularidad.component';
import { IrregularidadCreateComponent } from './components/panel-irregularidad/irregularidad-create/irregularidad-create.component';
import { PanelProcesoSubcutaneaComponent } from './components/panel-proceso-subcutanea/panel-proceso-subcutanea.component';
import { PanelProcesoDetalleSubcutaneaComponent } from './components/panel-proceso-detalle-subcutanea/panel-proceso-detalle-subcutanea.component';
import { ProcesoDetalleSubcutaneaCreateComponent } from './components/panel-proceso-detalle-subcutanea/proceso-detalle-subcutanea-create/proceso-detalle-subcutanea-create.component';
import { PanelVacunacionSubcutaneaComponent } from './components/panel-vacunacion-subcutanea/panel-vacunacion-subcutanea.component';
import { ProcesoSubcutaneaCreateComponent } from './components/panel-proceso-subcutanea/proceso-subcutanea-create/proceso-subcutanea-create.component';
import { VacunacionSubcutaneaCreateComponent } from './components/panel-vacunacion-subcutanea/vacunacion-subcutanea-create/vacunacion-subcutanea-create.component';
import { VacunacionSubcutaneaUpdateComponent } from './components/panel-vacunacion-subcutanea/vacunacion-subcutanea-update/vacunacion-subcutanea-update.component';

@NgModule({
    declarations: [PanelAgujaComponent,
        AgujaCreateComponent,
        PanelIrregularidadComponent,
        IrregularidadCreateComponent,
        PanelProcesoSubcutaneaComponent,
        ProcesoSubcutaneaCreateComponent,
        PanelProcesoDetalleSubcutaneaComponent,
        ProcesoDetalleSubcutaneaCreateComponent,
        PanelVacunacionSubcutaneaComponent,
        VacunacionSubcutaneaCreateComponent,
        VacunacionSubcutaneaUpdateComponent],
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, VacunacionSubCutaneaPrimeNgModule, VacunacionSubCutaneaRoutingModule, GaleriaImagenModule, FirmaDigitalModule ],
    exports: [],
    providers: [],
})
export class VacunacionSubCutaneaModule {}