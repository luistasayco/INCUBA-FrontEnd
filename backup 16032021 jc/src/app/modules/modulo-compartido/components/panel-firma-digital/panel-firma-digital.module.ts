import { NgModule } from '@angular/core';
import { PanelFirmaDigitalComponent } from './panel-firma-digital.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
@NgModule({
    declarations: [PanelFirmaDigitalComponent],
    imports: [ SignaturePadModule ],
    exports: [PanelFirmaDigitalComponent],
    providers: [],
})
export class FirmaDigitalModule {}