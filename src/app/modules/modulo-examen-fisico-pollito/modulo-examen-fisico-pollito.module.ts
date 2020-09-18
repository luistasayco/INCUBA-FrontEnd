import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelCalidadComponent } from './components/panel-calidad/panel-calidad.component';
import { PanelProcesoComponent } from './components/panel-proceso/panel-proceso.component';
import { ExamenFisicoPollitoPrimeNgModule } from './modulo-examen-fisico-pollito-primeng.module';
import { ExamenFisicoPollitoRoutingModule } from './modulo-examen-fisico-pollito-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalidadCreateComponent } from './components/panel-calidad/calidad-create/calidad-create.component';
import { ProcesoCreateComponent } from './components/panel-proceso/proceso-create/proceso-create.component';
import { ProcesoDetalleCreateComponent } from './components/panel-proceso/proceso-detalle-create/proceso-detalle-create.component';

@NgModule({
    declarations: [ PanelCalidadComponent,
                    PanelProcesoComponent,
                    CalidadCreateComponent,
                    ProcesoCreateComponent,
                    ProcesoDetalleCreateComponent],
    imports: [ CommonModule, ExamenFisicoPollitoPrimeNgModule, ExamenFisicoPollitoRoutingModule, FormsModule, ReactiveFormsModule ],
    exports: [],
    providers: [],
})
export class ExamenFisicoPollitoModule {}