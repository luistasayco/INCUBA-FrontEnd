import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarDatosRemotosService } from './modules/modulo-repository/services/enviar-datos-remotos.service';
import { LimpiarTablasService } from './modules/modulo-base-datos-local/services/limpiar-tablas.service';
import { variableGlobal } from './interface/variable-global.interface';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  interval;

  constructor(private readonly enviarDatosRemotosService: EnviarDatosRemotosService,
              private readonly limpiarTablasService: LimpiarTablasService,
              private readonly servicioDeviceDetector: DeviceDetectorService) {}
  ngOnInit() {

    this.getDatosDispositivo();
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
    }, 600000);
  }

  getDatosDispositivo() {
    const _nombreDispositivo = this.servicioDeviceDetector.getDeviceInfo().device;
    const _esMovil: boolean = this.servicioDeviceDetector.isMobile();
    const _esTablet: boolean = this.servicioDeviceDetector.isTablet();
    const _esDesktop: boolean = this.servicioDeviceDetector.isDesktop();
    variableGlobal._DISPOSITIVO = {
      nombreDispositivo: _nombreDispositivo ? _nombreDispositivo : '',
      esMovil: _esMovil,
      esTablet: _esTablet,
      esDesktop: _esDesktop
    };
  }
}
