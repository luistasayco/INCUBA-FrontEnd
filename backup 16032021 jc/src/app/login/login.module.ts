import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginRoutingModule } from './login.routing.module';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [ LoginComponent],
    imports: [ CommonModule,
                DropdownModule,
                ReactiveFormsModule,
                MessageModule,
                MessagesModule,
                ProgressSpinnerModule,
                DialogModule,
                LoginRoutingModule ],
    exports: [ ],
    providers: [MessageService],
})
export class LoginModule {}