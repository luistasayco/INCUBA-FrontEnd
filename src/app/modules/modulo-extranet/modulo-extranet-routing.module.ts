import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelExtranetComponent } from './components/panel-extranet/panel-extranet.component';
import { PanelExtranetConfigComponent } from './components/panel-extranet-config/panel-extranet-config.component';
import { PanelTipoExplotacionComponent } from './components/panel-tipo-explotacion/panel-tipo-explotacion.component';
import { TipoExplotacionCreateComponent } from './components/panel-tipo-explotacion/tipo-explotacion-create/tipo-explotacion-create.component';
import { PanelSubTipoExplotacionComponent } from './components/panel-sub-tipo-explotacion/panel-sub-tipo-explotacion.component';
import { TipoSubExplotacionCreateComponent } from './components/panel-sub-tipo-explotacion/tipo-sub-explotacion-create/tipo-sub-explotacion-create.component';
import { PanelExtranetViewComponent } from './components/panel-extranet-view/panel-extranet-view.component';
import { PanelExtranetFolderComponent } from './components/panel-extranet-folder/panel-extranet-folder.component';

const routes: Routes = [
    { path: 'panel-extranet', component: PanelExtranetComponent },
    { path: 'panel-extranet-view', component: PanelExtranetViewComponent },
    { path: 'panel-extranet-config', component: PanelExtranetConfigComponent },
    { path: 'panel-extranet-folder/:id', component: PanelExtranetFolderComponent },
    { path: 'panel-tipo-explotacion', component: PanelTipoExplotacionComponent },
    { path: 'tipo-explotacion-create', component: TipoExplotacionCreateComponent },
    { path: 'panel-sub-tipo-explotacion', component: PanelSubTipoExplotacionComponent },
    { path: 'sub-tipo-explotacion-create/:id', component: TipoSubExplotacionCreateComponent }

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExtranetRoutingModule {}
