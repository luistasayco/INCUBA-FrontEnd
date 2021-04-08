import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelTxSimComponent } from './components/panel-tx-sim/panel-tx-sim.component';
import { PanelTxSimOfflineComponent } from './components/panel-tx-sim-offline/panel-tx-sim-offline.component';
import { TxSimCreateComponent } from './components/panel-tx-sim/tx-sim-create/tx-sim-create.component';
import { TxSimUpdateComponent } from './components/panel-tx-sim/tx-sim-update/tx-sim-update.component';
import { TxSimCreateOfflineComponent } from './components/panel-tx-sim-offline/tx-sim-create-offline/tx-sim-create-offline.component';
import { TxSimUpdateOfflineComponent } from './components/panel-tx-sim-offline/tx-sim-update-offline/tx-sim-update-offline.component';
import { PanelTxSimConsolidadoComponent } from './components/panel-tx-sim-consolidado/panel-tx-sim-consolidado.component';
import { TxSimConsolidadoCreateComponent } from './components/panel-tx-sim-consolidado/tx-sim-consolidado-create/tx-sim-consolidado-create.component';
import { TxSimConsolidadoUpdateComponent } from './components/panel-tx-sim-consolidado/tx-sim-consolidado-update/tx-sim-consolidado-update.component';

const routes: Routes = [
    { path: 'panel-tx-sim', component: PanelTxSimComponent },
    { path: 'tx-sim-create', component: TxSimCreateComponent },
    { path: 'tx-sim-update/:id', component: TxSimUpdateComponent },
    { path: 'panel-tx-sim-offline', component: PanelTxSimOfflineComponent },
    { path: 'tx-sim-create-offline', component: TxSimCreateOfflineComponent },
    { path: 'tx-sim-update-offline/:id', component: TxSimUpdateOfflineComponent },

    { path: 'panel-tx-sim-consolidado', component: PanelTxSimConsolidadoComponent },
    { path: 'tx-sim-create-consolidado', component: TxSimConsolidadoCreateComponent },
    { path: 'tx-sim-update-consolidado/:id', component: TxSimConsolidadoUpdateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimRoutingModule {}
