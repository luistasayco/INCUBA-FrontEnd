import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { TxRegistroEquipoModel } from '../../modulo-registro-equipo/models/tx-registro-equipo.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { RegistroEquipoService } from '../../modulo-registro-equipo/services/registro-equipo.service';
import { UserContextService } from '../../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosRemotosService {

  constructor(private readonly servicioIndexedDB: NgxIndexedDBService,
              private readonly registroEquipoService: RegistroEquipoService,
              private userContextService: UserContextService) { }

  public enviarDatosAServidorRemoto() {

    const user = this.userContextService.user$.getValue();

    if (user) {
      this.enviarDatosAlServidor()
      .subscribe(resultados => {
        console.log('TAREA COMPLETADA 1 DE ENVIAR DATOS AL SERVIDOR');
      },
      error => {
        console.log('ERROR:', error);
      }
      );
    } else {
      console.log('USUARIO NO SE ENCUENTRA AUTENTIFICADO');
    }
  }

  private enviarDatosAlServidor(): Observable<any> {
    const obsEnviar = new Observable(observer => {
      if (variableGlobal.ESTADO_INTERNET) {
        this.enviarTxRegistroEquipo()
        .subscribe(resultadoEquipo => {
          observer.next();
        },
        error => {
          observer.error(error);
        }
        );
      } else {
        console.log('enviarDatosAlServidor: Sin Acceso a Internet. No se enviará los datos');
        observer.complete();
      }
    });

    return obsEnviar;
  }

  private enviarTxRegistroEquipo() {
    const obsProcesoTerminado = new Observable (observer => {
      let registros: TxRegistroEquipoModel[] = [];
      this.servicioIndexedDB.getAll(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO)
      .subscribe(resultado => {
        if (resultado) {
          registros = [...resultado];
          registros = registros
          .filter(x => x.flgMigrado === false)
          .filter(y => y.flgEnModificacion === false);

          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.registroEquipoService.setInsertTxRegistroEquipo(item)
              .subscribe( result => {
                item.flgMigrado = true;
                console.log('enviarTxRegistroEquipo', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, item);
              },
              errorFor => {
                console.log('enviarTxRegistroEquipo', `Error al enviar Datos. Empleado Asignacion de Linea: ${errorFor}`, item);
              }
              );
            });
            observer.next();
          } else {
            observer.next();
          }
        } else {
          observer.next();
        }
      },
      error => {
        console.log(`Error al enviar Datos. Empleado Asignacion de Linea: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }
}
