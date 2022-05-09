import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarDatosRemotosService } from './modules/modulo-repository/services/enviar-datos-remotos.service';
import { LimpiarTablasService } from './modules/modulo-base-datos-local/services/limpiar-tablas.service';
import { variableGlobal } from './interface/variable-global.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwUpdate } from '@angular/service-worker';
import { MensajesService } from './services/mensajes-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  interval;
  public imgs = new Array();

  constructor(
    private readonly enviarDatosRemotosService: EnviarDatosRemotosService,
    private readonly limpiarTablasService: LimpiarTablasService,
    private readonly servicioDeviceDetector: DeviceDetectorService,
    private readonly swUpdate: SwUpdate,
    private readonly servicioMensaje: MensajesService
  ) {
    this.swUpdate.available.subscribe((event) => {
      // console.log('Nueva versión disponible');
      this.descargarActualizacion();
    });
  }

  ngOnInit() {
    this.getDatosDispositivo();

    /*
    setTimeout(() => {
      this.iniciarTimerEnvioDataAServidor();
      this.limpiarDataMigrada();
    }, 30000);
    */

    //this.preload('assets/layout/images/logo_invetsa_blanco.png')
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  buscarActualizacion() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate
        .checkForUpdate()
        .then(() => {
          this.servicioMensaje._MENSAJE_INFORMACION(
            'Buscando Actualización del Software'
          );
        })
        .catch((err) => {
          this.servicioMensaje._MENSAJE_ERROR(
            'Error al buscar Actualización del Software'
          );
        });
    }
  }

  descargarActualizacion(): void {
    this.servicioMensaje._MENSAJE_INFORMACION(
      'La última versión del Software ha sido descargada'
    );
    this.swUpdate.activateUpdate().then(() => {
      const recargar = confirm(
        'La última versión del Software ha sido descargada. Desea Recargar la página ahora ?'
      );
      if (recargar) {
        document.location.reload();
      }
    });
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
    const _nombreDispositivo =
      this.servicioDeviceDetector.getDeviceInfo().device;
    const _esMovil: boolean = this.servicioDeviceDetector.isMobile();
    const _esTablet: boolean = this.servicioDeviceDetector.isTablet();
    const _esDesktop: boolean = this.servicioDeviceDetector.isDesktop();
    variableGlobal._DISPOSITIVO = {
      nombreDispositivo: _nombreDispositivo ? _nombreDispositivo : '',
      esMovil: _esMovil,
      esTablet: _esTablet,
      esDesktop: _esDesktop,
    };
  }

  preload(...args: any[]): void {
    for (var i = 0; i < args.length; i++) {
      this.imgs[i] = new Image();
      this.imgs[i].scr = args[i];
    }
  }
}
