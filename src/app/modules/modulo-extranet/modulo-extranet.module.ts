import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelExtranetComponent } from './components/panel-extranet/panel-extranet.component';
import { ExtranetCreateComponent } from './components/panel-extranet/extranet-create/extranet-create.component';
import { PanelExtranetConfigComponent } from './components/panel-extranet-config/panel-extranet-config.component';
import { ExtranetPrimeNgModule } from './modulo-extranet-primeng.module';
import { ExtranetRoutingModule } from './modulo-extranet-routing.module';
import { PanelTipoExplotacionComponent } from './components/panel-tipo-explotacion/panel-tipo-explotacion.component';
import { TipoExplotacionCreateComponent } from './components/panel-tipo-explotacion/tipo-explotacion-create/tipo-explotacion-create.component';
import { PanelSubTipoExplotacionComponent } from './components/panel-sub-tipo-explotacion/panel-sub-tipo-explotacion.component';
import { TipoSubExplotacionCreateComponent } from './components/panel-sub-tipo-explotacion/tipo-sub-explotacion-create/tipo-sub-explotacion-create.component';

@NgModule({
    declarations: [ PanelExtranetComponent,
        ExtranetCreateComponent,
        PanelExtranetConfigComponent,
        PanelTipoExplotacionComponent,
        TipoExplotacionCreateComponent,
        PanelSubTipoExplotacionComponent,
        TipoSubExplotacionCreateComponent],
    imports: [ CommonModule,
        ExtranetPrimeNgModule,
        ExtranetRoutingModule,
        FormsModule,
        ReactiveFormsModule],
    exports: [],
    providers: [],
})
export class ExtranetModule {}