import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelCalidadComponent } from './components/panel-calidad/panel-calidad.component';
import { PanelProcesoComponent } from './components/panel-proceso/panel-proceso.component';
import { CalidadCreateComponent } from './components/panel-calidad/calidad-create/calidad-create.component';
import { ProcesoCreateComponent } from './components/panel-proceso/proceso-create/proceso-create.component';
import { ProcesoDetalleCreateComponent } from './components/panel-proceso/proceso-detalle-create/proceso-detalle-create.component';
import { PanelTxExamenFisicoPollitoComponent } from './components/panel-tx-examen-fisico-pollito/panel-tx-examen-fisico-pollito.component';
import { TxExamenFisicoPollitoCreateComponent } from './components/panel-tx-examen-fisico-pollito/tx-examen-fisico-pollito-create/tx-examen-fisico-pollito-create.component';
import { TxExamenFisicoPollitoUpdateComponent } from './components/panel-tx-examen-fisico-pollito/tx-examen-fisico-pollito-update/tx-examen-fisico-pollito-update.component';
import { PanelTxExamenFisicoPollitoOfflineComponent } from './components/panel-tx-examen-fisico-pollito-offline/panel-tx-examen-fisico-pollito-offline.component';
import { TxExamenFisicoPollitoOfflineCreateComponent } from './components/panel-tx-examen-fisico-pollito-offline/tx-examen-fisico-pollito-offline-create/tx-examen-fisico-pollito-offline-create.component';
import { TxExamenFisicoPollitoOfflineUpdateComponent } from './components/panel-tx-examen-fisico-pollito-offline/tx-examen-fisico-pollito-offline-update/tx-examen-fisico-pollito-offline-update.component';

const routes: Routes = [
    { path: 'panel-calidad', component: PanelCalidadComponent },
    { path: 'create-calidad', component: CalidadCreateComponent },
    { path: 'panel-proceso', component: PanelProcesoComponent },
    { path: 'create-proceso', component: ProcesoCreateComponent },
    { path: 'create-proceso-detalle/:id', component: ProcesoDetalleCreateComponent },
    { path: 'panel-tx-examen-fisico-pollito', component: PanelTxExamenFisicoPollitoComponent },
    { path: 'create-tx-examen-fisico-pollito', component: TxExamenFisicoPollitoCreateComponent },
    { path: 'update-tx-examen-fisico-pollito/:id', component: TxExamenFisicoPollitoUpdateComponent },
    { path: 'panel-tx-examen-fisico-pollito-offline', component: PanelTxExamenFisicoPollitoOfflineComponent },
    { path: 'create-tx-examen-fisico-pollito-offline', component: TxExamenFisicoPollitoOfflineCreateComponent },
    { path: 'update-tx-examen-fisico-pollito-offline/:id', component: TxExamenFisicoPollitoOfflineUpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamenFisicoPollitoRoutingModule {}
