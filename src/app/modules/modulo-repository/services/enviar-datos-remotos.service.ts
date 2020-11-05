import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { TxRegistroEquipoModel } from '../../modulo-registro-equipo/models/tx-registro-equipo.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { RegistroEquipoService } from '../../modulo-registro-equipo/services/registro-equipo.service';
import { UserContextService } from '../../../services/user-context.service';
import { TxExamenFisicoPollitoModel } from '../../modulo-examen-fisico-pollito/models/tx-examen-fisico-pollito';
import { ExamenFisicoPollitoLocalService } from '../../modulo-examen-fisico-pollito/services/examen-fisico-pollito-local.service';
import { ExamenFisicoPollitoService } from '../../modulo-examen-fisico-pollito/services/examen-fisico-pollito.service';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosRemotosService {

  constructor(private readonly servicioIndexedDB: NgxIndexedDBService,
              private readonly registroEquipoService: RegistroEquipoService,
              private readonly examenFisicoPollitoService: ExamenFisicoPollitoService,
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
      },
      () => {
        console.log('TAREA COMPLETADA 2 DE ENVIAR DATOS AL SERVIDOR');      }
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
        this.enviarExamenFisicoPollito()
        .subscribe(resultadoExamenFisicoPollito => {
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
                console.log('enviarTxRegistroEquipo', `Error al enviar Datos. Registro de Equipo: ${errorFor}`, item);
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
        console.log(`Error al enviar Datos. Registro de Equipo: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }

  private enviarExamenFisicoPollito() {
    const obsProcesoTerminado = new Observable (observer => {
      let registros: TxExamenFisicoPollitoModel[] = [];
      this.servicioIndexedDB.getAll(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO)
      .subscribe(resultado => {
        if (resultado) {
          registros = [...resultado];
          registros = registros
          .filter(x => x.flgMigrado === false)
          .filter(y => y.flgEnModificacion === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.examenFisicoPollitoService.setInsertExamenFisicoPollito(item)
              .subscribe( result => {
                item.flgMigrado = true;
                console.log('enviarExamenFisicoPollito', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO, item);
              },
              errorFor => {
                console.log('enviarExamenFisicoPollito', `Error al enviar Datos. Examenes Fisicos de Pollitos: ${errorFor}`, item);
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
        console.log(`Error al enviar Datos. Examenes Fisicos de Pollitos: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }
}
