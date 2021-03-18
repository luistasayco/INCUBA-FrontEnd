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
import { PanelTxExamenFisicoPollitoComponent } from './components/panel-tx-examen-fisico-pollito/panel-tx-examen-fisico-pollito.component';
import { TxExamenFisicoPollitoCreateComponent } from './components/panel-tx-examen-fisico-pollito/tx-examen-fisico-pollito-create/tx-examen-fisico-pollito-create.component';
import { TxExamenFisicoPollitoUpdateComponent } from './components/panel-tx-examen-fisico-pollito/tx-examen-fisico-pollito-update/tx-examen-fisico-pollito-update.component';
import { FirmaDigitalModule } from '../modulo-compartido/components/panel-firma-digital/panel-firma-digital.module';
import { GaleriaImagenModule } from '../modulo-compartido/components/galeria-imagen/galeria-imagen.module';
import { PanelTxExamenFisicoPollitoOfflineComponent } from './components/panel-tx-examen-fisico-pollito-offline/panel-tx-examen-fisico-pollito-offline.component';
import { TxExamenFisicoPollitoOfflineCreateComponent } from './components/panel-tx-examen-fisico-pollito-offline/tx-examen-fisico-pollito-offline-create/tx-examen-fisico-pollito-offline-create.component';
import { TxExamenFisicoPollitoOfflineUpdateComponent } from './components/panel-tx-examen-fisico-pollito-offline/tx-examen-fisico-pollito-offline-update/tx-examen-fisico-pollito-offline-update.component';

@NgModule({
    declarations: [ PanelCalidadComponent,
                    PanelProcesoComponent,
                    CalidadCreateComponent,
                    ProcesoCreateComponent,
                    ProcesoDetalleCreateComponent,
                    PanelTxExamenFisicoPollitoComponent,
                    TxExamenFisicoPollitoCreateComponent,
                    TxExamenFisicoPollitoUpdateComponent,
                    PanelTxExamenFisicoPollitoOfflineComponent,
                    TxExamenFisicoPollitoOfflineCreateComponent,
                    TxExamenFisicoPollitoOfflineUpdateComponent],
    imports: [ CommonModule,
        ExamenFisicoPollitoPrimeNgModule,
        ExamenFisicoPollitoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FirmaDigitalModule,
    GaleriaImagenModule],
    exports: [],
    providers: [],
})
export class ExamenFisicoPollitoModule {}