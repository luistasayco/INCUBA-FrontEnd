import { NgModule } from '@angular/core';

// Module PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
// Sevices
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [],
    exports: [ InputTextModule,
            ButtonModule,
            ToastModule,
            TableModule,
            MessageModule,
            MessagesModule,
            ConfirmDialogModule,
            PanelModule,
            InputTextareaModule,
            InputSwitchModule,
            ColorPickerModule],
    providers: [MessageService, ConfirmationService],
})
export class ExamenFisicoPollitoPrimeNgModule {}