import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaleriaImagenModule } from '../modulo-compartido/components/galeria-imagen/galeria-imagen.module';
import { FirmaDigitalModule } from '../modulo-compartido/components/panel-firma-digital/panel-firma-digital.module';
import { SINMIPrimeNgModule } from './modulo-sinmi-primeng.module';
import { SINMIRoutingModule } from './modulo-sinmi-routing.module';
import { PanelOrganoComponent } from './components/panel-organo/panel-organo.component';
import { CreateOrganoComponent } from './components/panel-organo/create-organo/create-organo.component';
import { PanelOrganoDetalleComponent } from './components/panel-organo-detalle/panel-organo-detalle.component';
import { CreateOrganoDetalleComponent } from './components/panel-organo-detalle/create-organo-detalle/create-organo-detalle.component';
import { PanelTxSinmiComponent } from './components/panel-tx-sinmi/panel-tx-sinmi.component';
import { CreateTxSinmiComponent } from './components/panel-tx-sinmi/create-tx-sinmi/create-tx-sinmi.component';
import { UpdateTxSinmiComponent } from './components/panel-tx-sinmi/update-tx-sinmi/update-tx-sinmi.component';
import { CreateTxSinmiOfflineComponent } from './components/panel-tx-sinmi-offline/create-tx-sinmi-offline/create-tx-sinmi-offline.component';
import { UpdateTxSinmiOfflineComponent } from './components/panel-tx-sinmi-offline/update-tx-sinmi-offline/update-tx-sinmi-offline.component';
import { PanelTxSinmiOfflineComponent } from './components/panel-tx-sinmi-offline/panel-tx-sinmi-offline.component';
import { PanelTxSinmiConsolidadoComponent } from './components/panel-tx-sinmi-consolidado/panel-tx-sinmi-consolidado.component';
import { TxSinmiConsolidadoCreateComponent } from './components/panel-tx-sinmi-consolidado/tx-sinmi-consolidado-create/tx-sinmi-consolidado-create.component';
import { TxSinmiConsolidadoUpdateComponent } from './components/panel-tx-sinmi-consolidado/tx-sinmi-consolidado-update/tx-sinmi-consolidado-update.component';
@NgModule({
    declarations: [PanelOrganoComponent,
    CreateOrganoComponent,
    PanelOrganoDetalleComponent,
    CreateOrganoDetalleComponent,
    PanelTxSinmiComponent,
    CreateTxSinmiComponent,
    UpdateTxSinmiComponent,
    CreateTxSinmiOfflineComponent,
    UpdateTxSinmiOfflineComponent,
    PanelTxSinmiOfflineComponent,
    PanelTxSinmiConsolidadoComponent,
    TxSinmiConsolidadoCreateComponent,
    TxSinmiConsolidadoUpdateComponent],
    imports: [ CommonModule, SINMIPrimeNgModule, SINMIRoutingModule, 
        FormsModule,
        ReactiveFormsModule, GaleriaImagenModule, FirmaDigitalModule],
    exports: [],
    providers: [],
})
export class SINMIModule {}