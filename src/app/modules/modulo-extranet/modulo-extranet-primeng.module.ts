import { NgModule } from '@angular/core';

// Module PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
// Sevices
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [],
    exports: [InputTextModule,
        ButtonModule,
        ToastModule,
        TableModule,
        MessageModule,
        MessagesModule,
        PanelModule,
        ConfirmDialogModule,
        DropdownModule,
        DialogModule,
        CheckboxModule,
        InputTextareaModule,
        CalendarModule,
        TabMenuModule,
        FileUploadModule,
        CardModule,
        MultiSelectModule,
        TooltipModule,
        BreadcrumbModule,
    ],
    providers: [ConfirmationService, MessageService],
})
export class ExtranetPrimeNgModule {}