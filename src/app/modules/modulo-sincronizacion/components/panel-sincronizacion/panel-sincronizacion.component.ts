import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TraerDatosRemotosService } from '../../../modulo-repository/services/traer-datos-remotos.service';

@Component({
  selector: 'app-panel-sincronizacion',
  templateUrl: './panel-sincronizacion.component.html',
  styleUrls: ['./panel-sincronizacion.component.css']
})
export class PanelSincronizacionComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private readonly servicioTraerDatos: TraerDatosRemotosService) { }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.onSetDataLocal();
  }

  onSetDataLocal() {
    this.servicioTraerDatos.obtenerDatosDesdeServidor('Hola');
    this.servicioTraerDatos.datosCargadosTotalmente.subscribe(
      resultado => {
        if (resultado) {
          console.log('Datos obtenidos desde el Servidor. Completado: ' );
        } else {
          // console.log('AUN NO TERMINA LA SINCRONIZACION');
        }
      },
      error => {
        console.log('Error en mostrarSiguienteVista()' + error);
      }
    );
  }
}
