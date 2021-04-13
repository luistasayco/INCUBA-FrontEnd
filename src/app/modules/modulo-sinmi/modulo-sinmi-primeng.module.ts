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
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
// Sevices
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
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
        DropdownModule,
        AccordionModule,
        CheckboxModule,
        CalendarModule,
        ToggleButtonModule,
        DialogModule,
        ProgressBarModule,
        FieldsetModule],
    providers: [MessageService, ConfirmationService],
})
export class SINMIPrimeNgModule {}