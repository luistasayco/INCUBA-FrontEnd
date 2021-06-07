import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

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


import { DomSeguroImagenBase64Pipe } from './pipes/dom-seguro-imagen-base64.pipe';
import { HeaderInterceptorService } from './interceptors/header-interceptor.service';
import { ModuloEstadoInternetModule } from './modules/modulo-estado-internet/modulo-estado-internet.module';
import { ModuloBaseDatosLocalModule } from './modules/modulo-base-datos-local/modulo-base-datos-local.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { LoginModule } from './login/login.module';
import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

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
    ModuloEstadoInternetModule,
    ModuloBaseDatosLocalModule,
    LoginModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PdfViewerModule,
    NgxDocViewerModule
  ],
  providers: [ DatePipe,
    { provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
