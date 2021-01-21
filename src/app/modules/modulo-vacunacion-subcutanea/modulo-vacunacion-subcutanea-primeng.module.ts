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
import { PickListModule } from 'primeng/picklist';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
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
        DropdownModule,
        AccordionModule,
        PickListModule,
        CheckboxModule,
        CalendarModule,
        ToggleButtonModule,
        DialogModule,
        ListboxModule,
        TooltipModule,
        ProgressBarModule],
    providers: [MessageService, ConfirmationService],
})
export class VacunacionSubCutaneaPrimeNgModule {}