import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderBreadcrumbComponent } from './layout/header-breadcrumb/header-breadcrumb.component';
import { MenuComponent } from './layout/menu/menu.component';

import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';

import { MenuitemComponent } from './layout/menu/menuitem/menuitem.component';
import { ConfigComponent } from './layout/config/config.component';

import localePy from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';


import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { DomSeguroImagenBase64Pipe } from './pipes/dom-seguro-imagen-base64.pipe';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    HeaderBreadcrumbComponent,
    MenuComponent,
    MenuitemComponent,
    ConfigComponent,
    LoginComponent,
    DomSeguroImagenBase64Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressBarModule,
    InputSwitchModule,
    TabViewModule,
    MessageModule,
    MessagesModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
