import { NgModule } from '@angular/core';
import { PanelFirmaDigitalComponent } from './panel-firma-digital.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [PanelFirmaDigitalComponent],
    imports: [ SignaturePadModule, ButtonModule , FormsModule],
    exports: [PanelFirmaDigitalComponent],
    providers: [],
})
export class FirmaDigitalModule {}