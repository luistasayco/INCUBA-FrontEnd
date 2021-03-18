import { NgModule } from '@angular/core';
import { PanelSincronizacionComponent } from './components/panel-sincronizacion/panel-sincronizacion.component';
import { SincronizacionRoutingModule } from './modulo-sincronizacion-routing.module';

@NgModule({
    declarations: [ PanelSincronizacionComponent ],
    imports: [ SincronizacionRoutingModule ],
    exports: [],
    providers: [],
})
export class SincronizacionModule {}