import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelOrganoComponent } from './components/panel-organo/panel-organo.component';
import { CreateOrganoComponent } from './components/panel-organo/create-organo/create-organo.component';
import { PanelOrganoDetalleComponent } from './components/panel-organo-detalle/panel-organo-detalle.component';
import { CreateOrganoDetalleComponent } from './components/panel-organo-detalle/create-organo-detalle/create-organo-detalle.component';
import { PanelTxSinmiComponent } from './components/panel-tx-sinmi/panel-tx-sinmi.component';
import { PanelTxSinmiOfflineComponent } from './components/panel-tx-sinmi-offline/panel-tx-sinmi-offline.component';
import { CreateTxSinmiComponent } from './components/panel-tx-sinmi/create-tx-sinmi/create-tx-sinmi.component';
import { UpdateTxSinmiComponent } from './components/panel-tx-sinmi/update-tx-sinmi/update-tx-sinmi.component';
import { CreateTxSinmiOfflineComponent } from './components/panel-tx-sinmi-offline/create-tx-sinmi-offline/create-tx-sinmi-offline.component';
import { UpdateTxSinmiOfflineComponent } from './components/panel-tx-sinmi-offline/update-tx-sinmi-offline/update-tx-sinmi-offline.component';
import { PanelTxSinmiConsolidadoComponent } from './components/panel-tx-sinmi-consolidado/panel-tx-sinmi-consolidado.component';
import { TxSinmiConsolidadoCreateComponent } from './components/panel-tx-sinmi-consolidado/tx-sinmi-consolidado-create/tx-sinmi-consolidado-create.component';
import { TxSinmiConsolidadoUpdateComponent } from './components/panel-tx-sinmi-consolidado/tx-sinmi-consolidado-update/tx-sinmi-consolidado-update.component';

const routes: Routes = [
    { path: 'panel-organo', component: PanelOrganoComponent },
    { path: 'create-organo', component: CreateOrganoComponent },
    { path: 'panel-organo-detalle', component: PanelOrganoDetalleComponent },
    { path: 'create-organo-detalle/:id', component: CreateOrganoDetalleComponent },
    { path: 'panel-tx-sinmi', component: PanelTxSinmiComponent },
    { path: 'tx-sinmi-create', component: CreateTxSinmiComponent },
    { path: 'tx-sinmi-update/:id', component: UpdateTxSinmiComponent },
    { path: 'panel-tx-sinmi-offline', component: PanelTxSinmiOfflineComponent },
    { path: 'tx-sinmi-create-offline', component: CreateTxSinmiOfflineComponent },
    { path: 'tx-sinmi-update-offline/:id', component: UpdateTxSinmiOfflineComponent },
    { path: 'panel-tx-sinmi-consolidado', component: PanelTxSinmiConsolidadoComponent },
    { path: 'tx-sinmi-create-consolidado', component: TxSinmiConsolidadoCreateComponent },
    { path: 'tx-sinmi-update-consolidado/:id', component: TxSinmiConsolidadoUpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SINMIRoutingModule {}
