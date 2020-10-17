import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarDatosRemotosService } from './modules/modulo-repository/services/enviar-datos-remotos.service';
import { LimpiarTablasService } from './modules/modulo-base-datos-local/services/limpiar-tablas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'INCUBA-FrontEnd';

  interval;

  constructor(private readonly enviarDatosRemotosService: EnviarDatosRemotosService,
              private readonly limpiarTablasService: LimpiarTablasService) {}
  ngOnInit() {
    setTimeout(() => {
      this.iniciarTimerEnvioDataAServidor();
      this.limpiarDataMigrada();
    }, 10000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

  limpiarDataMigrada() {
    this.limpiarTablasService.depurarTablas();
  }

  iniciarTimerEnvioDataAServidor() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.enviarDatosRemotosService.enviarDatosAServidorRemoto();
    }, 20000);
  }
}
