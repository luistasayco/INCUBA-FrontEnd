import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then(
  () => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/Invetsa/ngsw-worker.js');
    } else {
      // console.log('SERVICE WORKER NO REGISTRADO. ESTE NAVEGADOR O SERVIDOR NO PERMITE SERVICE WORKER');
    }
  }
)
.catch(err => console.error(err));
