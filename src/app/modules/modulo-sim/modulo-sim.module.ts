import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SIMPrimeNgModule } from './modulo-sim-primeng.module';
import { PanelTxSimComponent } from './components/panel-tx-sim/panel-tx-sim.component';
import { PanelTxSimOfflineComponent } from './components/panel-tx-sim-offline/panel-tx-sim-offline.component';
import { TxSimCreateComponent } from './components/panel-tx-sim/tx-sim-create/tx-sim-create.component';
import { TxSimUpdateComponent } from './components/panel-tx-sim/tx-sim-update/tx-sim-update.component';
import { SimRoutingModule } from './modulo-sim-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaleriaImagenModule } from '../modulo-compartido/components/galeria-imagen/galeria-imagen.module';
import { FirmaDigitalModule } from '../modulo-compartido/components/panel-firma-digital/panel-firma-digital.module';
import { TxSimCreateOfflineComponent } from './components/panel-tx-sim-offline/tx-sim-create-offline/tx-sim-create-offline.component';
import { TxSimUpdateOfflineComponent } from './components/panel-tx-sim-offline/tx-sim-update-offline/tx-sim-update-offline.component';
import { PanelTxSimConsolidadoComponent } from './components/panel-tx-sim-consolidado/panel-tx-sim-consolidado.component';
import { TxSimConsolidadoCreateComponent } from './components/panel-tx-sim-consolidado/tx-sim-consolidado-create/tx-sim-consolidado-create.component';
import { TxSimConsolidadoUpdateComponent } from './components/panel-tx-sim-consolidado/tx-sim-consolidado-update/tx-sim-consolidado-update.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
    declarations: [PanelTxSimComponent,
            PanelTxSimOfflineComponent,
            TxSimCreateComponent,
            TxSimUpdateComponent,
            TxSimCreateOfflineComponent,
            TxSimUpdateOfflineComponent,
        PanelTxSimConsolidadoComponent,
        TxSimConsolidadoCreateComponent,
        TxSimConsolidadoUpdateComponent],
    imports: [ CommonModule, SIMPrimeNgModule, SimRoutingModule, 
        FormsModule,
        ReactiveFormsModule, GaleriaImagenModule, FirmaDigitalModule, ChartsModule],
    exports: [],
    providers: [],
})
export class SIMModule {}