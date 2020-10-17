import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { LoginRoutingModule } from './login.routing.module';

import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [ LoginComponent],
    imports: [ CommonModule, DropdownModule, FormsModule, MessageModule, MessagesModule, LoginRoutingModule ],
    exports: [ ],
    providers: [MessageService],
})
export class LoginModule {}