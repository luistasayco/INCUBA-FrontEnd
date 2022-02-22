import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { TxRegistroEquipoModel } from '../../modulo-registro-equipo/models/tx-registro-equipo.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { RegistroEquipoService } from '../../modulo-registro-equipo/services/registro-equipo.service';
import { UserContextService } from '../../../services/user-context.service';
import { TxExamenFisicoPollitoModel } from '../../modulo-examen-fisico-pollito/models/tx-examen-fisico-pollito';
import { ExamenFisicoPollitoService } from '../../modulo-examen-fisico-pollito/services/examen-fisico-pollito.service';
import { VacunacionSprayService } from '../../modulo-vacunacion-spray/services/vacunacion-spray.service';
import { VacunacionSubcutaneaService } from '../../modulo-vacunacion-subcutanea/services/vacunacion-subcutanea.service';
import { TxVacunacionSprayModel } from '../../modulo-vacunacion-spray/models/tx-vacunacion-spray.model';
import { TxVacunacionSubCutaneaModel } from '../../modulo-vacunacion-subcutanea/models/tx-vacunacion-subcutanea.model';
import { TxSIMModel } from '../../modulo-sim/models/tx-sim.model';
import { SimService } from '../../modulo-sim/services/sim.service';
import { SinmiService } from '../../modulo-sinmi/services/sinmi.service';
import { TxSINMIModel } from '../../modulo-sinmi/models/tx-sinmi.model';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosRemotosService {

  private tablasAEnviar = {
    envioTablaTrxRegistroEquipo: false,
    envioTablaTrxExamenFisicoPollito: false,
    envioTablaTrxVacunacionSpray: false,
    envioTablaTrxVacunacionSubCutanea: false,
    envioTablaTrxSIM: false,
    envioTablaTrxSINMI: false
  };

  constructor(private readonly servicioIndexedDB: NgxIndexedDBService,
              private readonly registroEquipoService: RegistroEquipoService,
              private readonly examenFisicoPollitoService: ExamenFisicoPollitoService,
              private readonly vacunacionSprayService: VacunacionSprayService,
              private readonly vacunacionSubcutaneaService: VacunacionSubcutaneaService,
              private readonly simService: SimService,
              private readonly sinmiService: SinmiService,
              private userContextService: UserContextService) { }

  private ponerEstadoDefecto() {
    this.tablasAEnviar.envioTablaTrxExamenFisicoPollito = false;
    this.tablasAEnviar.envioTablaTrxRegistroEquipo = false;
    this.tablasAEnviar.envioTablaTrxVacunacionSpray = false;
    this.tablasAEnviar.envioTablaTrxVacunacionSubCutanea = false;
    this.tablasAEnviar.envioTablaTrxSIM = false;
    this.tablasAEnviar.envioTablaTrxSINMI = false;
  }

  private validarProcesoCompletado(): boolean {
    if (
      this.tablasAEnviar.envioTablaTrxExamenFisicoPollito &&
      this.tablasAEnviar.envioTablaTrxRegistroEquipo &&
      this.tablasAEnviar.envioTablaTrxVacunacionSpray &&
      this.tablasAEnviar.envioTablaTrxVacunacionSubCutanea &&
      this.tablasAEnviar.envioTablaTrxSIM && 
      this.tablasAEnviar.envioTablaTrxSINMI
    ) {
      return true;
    }
    return false;
  }

  public enviarDatosAServidorRemoto() {

    // console.log(variableGlobal._FLAG_ENVIANDO_DATOS_A_SERVIDOR === false ?
    //   'Ninguna tarea de envío en progreso' : 'Tarea de envío en progreso. Se enviará luego');

    if (!variableGlobal._FLAG_ENVIANDO_DATOS_A_SERVIDOR) {

      this.actualizarFlagEnvio(true);
      // console.log('Envío de información a Servidor en progreso !');
      this.enviarDatosAlServidor()
      .subscribe(resultados => {
        this.actualizarFlagEnvio(false);
        // console.log('TAREA COMPLETADA 1 DE ENVIAR DATOS AL SERVIDOR');
      },
      error => {
        this.actualizarFlagEnvio(false);
        // console.log('ERROR:', error);
      },
      () => {
        this.actualizarFlagEnvio(false);
        // console.log('TAREA COMPLETADA 2 DE ENVIAR DATOS AL SERVIDOR');
        }
      );
    } else {
      // console.log('No se iniciará una tarea de envío a Servidor porque hay otra tarea de envío en progreso');
    }
  }

  actualizarFlagEnvio(enviando) {
    variableGlobal._FLAG_ENVIANDO_DATOS_A_SERVIDOR = enviando;
    variableGlobal._FLAG_OBSERVADOR_ENVIANDO_DATOS_A_SERVIDOR$.next(enviando);
  }

  private enviarDatosAlServidor(): Observable<any> {

    const user = this.userContextService.user$.getValue();

    this.ponerEstadoDefecto();

    const obsEnviar = new Observable(observer => {
      if (variableGlobal.ESTADO_INTERNET) {
        if (user) {
          this.enviarTxRegistroEquipo().subscribe(
            resultadoEquipo => {
            this.tablasAEnviar.envioTablaTrxRegistroEquipo = true;
            if (this.validarProcesoCompletado()) { observer.next(); }
          },
          error => {
            observer.error(error);
          }
          );
          this.enviarExamenFisicoPollito()
          .subscribe(resultadoExamenFisicoPollito => {
            this.tablasAEnviar.envioTablaTrxExamenFisicoPollito = true;
            if (this.validarProcesoCompletado()) { observer.next(); }
          },
          error => {
            observer.error(error);
          }
          );
          this.enviarVacunacionSpray()
          .subscribe(resultado => {
            this.tablasAEnviar.envioTablaTrxVacunacionSpray = true;
            if (this.validarProcesoCompletado()) { observer.next(); }
          },
          error => {
            observer.error(error);
          }
          );
          this.enviarVacunacionSubCutanea()
          .subscribe(resultado => {
            this.tablasAEnviar.envioTablaTrxVacunacionSubCutanea = true;
            if (this.validarProcesoCompletado()) { observer.next(); }
          },
          error => {
            observer.error(error);
          }
          );
          this.enviarSIM()
          .subscribe(resultado => {
            this.tablasAEnviar.envioTablaTrxSIM = true;
            if (this.validarProcesoCompletado()) { observer.next(); }
          },
          error => {
            observer.error(error);
          }
          );
          this.enviarSINMI()
          .subscribe(resultado => {
            this.tablasAEnviar.envioTablaTrxSINMI = true;
            if (this.validarProcesoCompletado()) { observer.next(); }
          },
          error => {
            observer.error(error);
          }
          );
        } else {
          this.tablasAEnviar.envioTablaTrxRegistroEquipo = true;
          this.tablasAEnviar.envioTablaTrxExamenFisicoPollito = true;
          this.tablasAEnviar.envioTablaTrxVacunacionSpray = true;
          this.tablasAEnviar.envioTablaTrxVacunacionSubCutanea = true;
          this.tablasAEnviar.envioTablaTrxSIM = true;
          this.tablasAEnviar.envioTablaTrxSINMI = true;
          if (this.validarProcesoCompletado()) { observer.next(); }
        }
      } else {
        // console.log('enviarDatosAlServidor: Sin Acceso a Internet. No se enviará los datos');
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
          //.filter(z => z.flgCerrado === true)
          .filter(x => x.flgMigrado === false)
          // .filter(y => y.flgEnModificacion === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.registroEquipoService.setInsertTxRegistroEquipo(item)
              .subscribe( result => {
                item.flgMigrado = true;
                // console.log('enviarTxRegistroEquipo', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, item);
              },
              errorFor => {
                // console.log('enviarTxRegistroEquipo', `Error al enviar Datos. Registro de Equipo: ${errorFor}`, item);
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
        // console.log(`Error al enviar Datos. Registro de Equipo: ${error}`);
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
          //.filter(z => z.flgCerrado === true)
          .filter(x => x.flgMigrado === false)
          .filter(y => y.flgEnModificacion === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.examenFisicoPollitoService.setInsertExamenFisicoPollito(item)
              .subscribe( result => {
                item.flgMigrado = true;
                // console.log('enviarExamenFisicoPollito', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO, item);
              },
              errorFor => {
                // console.log('enviarExamenFisicoPollito', `Error al enviar Datos. Examenes Fisicos de Pollitos: ${errorFor}`, item);
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
        // console.log(`Error al enviar Datos. Examenes Fisicos de Pollitos: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }

  private enviarVacunacionSpray() {
    const obsProcesoTerminado = new Observable (observer => {
      let registros: TxVacunacionSprayModel[] = [];
      this.servicioIndexedDB.getAll(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY)
      .subscribe(resultado => {
        if (resultado) {
          registros = [...resultado];
          registros = registros
          //.filter(z => z.flgCerrado === true)
          .filter(x => x.flgMigrado === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.vacunacionSprayService.setInsertTxVacunacionSpray(item)
              .subscribe( result => {
                item.flgMigrado = true;
                // console.log('enviarExamenFisicoPollito', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY, item);
              },
              errorFor => {
                // console.log('enviarExamenFisicoPollito', `Error al enviar Datos. Examenes Fisicos de Pollitos: ${errorFor}`, item);
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
        // console.log(`Error al enviar Datos. Examenes Fisicos de Pollitos: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }

  private enviarVacunacionSubCutanea() {
    const obsProcesoTerminado = new Observable (observer => {
      let registros: TxVacunacionSubCutaneaModel[] = [];
      this.servicioIndexedDB.getAll(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA)
      .subscribe(resultado => {
        if (resultado) {
          registros = [...resultado];
          registros = registros
          //.filter(z => z.flgCerrado === true)
          .filter(x => x.flgMigrado === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.vacunacionSubcutaneaService.setInsertTxVacunacionSubCutanea(item)
              .subscribe( result => {
                item.flgMigrado = true;
                // console.log('enviarExamenFisicoPollito', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA, item);
              },
              errorFor => {
                // console.log('enviarExamenFisicoPollito', `Error al enviar Datos. Examenes Fisicos de Pollitos: ${errorFor}`, item);
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
        // console.log(`Error al enviar Datos. Examenes Fisicos de Pollitos: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }

  private enviarSIM() {
    const obsProcesoTerminado = new Observable (observer => {
      let registros: TxSIMModel[] = [];
      this.servicioIndexedDB.getAll(ConstantesTablasIDB._TABLA_TXSIM)
      .subscribe(resultado => {
        if (resultado) {
          registros = [...resultado];
          registros = registros
          //.filter(z => z.flgCerrado === true)
          .filter(x => x.flgMigrado === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.simService.setInsertTxSIM(item)
              .subscribe( result => {
                item.flgMigrado = true;
                // console.log('enviarExamenFisicoPollito', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXSIM, item);
              },
              errorFor => {
                // console.log('enviarExamenFisicoPollito', `Error al enviar Datos. Examenes Fisicos de Pollitos: ${errorFor}`, item);
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
        // console.log(`Error al enviar Datos. Examenes Fisicos de Pollitos: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }

  private enviarSINMI() {
    const obsProcesoTerminado = new Observable (observer => {
      let registros: TxSINMIModel[] = [];
      this.servicioIndexedDB.getAll(ConstantesTablasIDB._TABLA_TXSINMI)
      .subscribe(resultado => {
        if (resultado) {
          registros = [...resultado];
          registros = registros
          //.filter(z => z.flgCerrado === true)
          .filter(x => x.flgMigrado === false);
          if ( registros.length > 0 ) {
            registros.forEach( item => {
              this.sinmiService.setInsertTxSINMI(item)
              .subscribe( result => {
                item.flgMigrado = true;
                // console.log('enviarExamenFisicoPollito', `Se migro correctamente: `, item);
                this.servicioIndexedDB.update(ConstantesTablasIDB._TABLA_TXSINMI, item);
              },
              errorFor => {
                // console.log('enviarExamenFisicoPollito', `Error al enviar Datos. Examenes Fisicos de Pollitos: ${errorFor}`, item);
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
        // console.log(`Error al enviar Datos. Examenes Fisicos de Pollitos: ${error}`);
        observer.next();
      }
      );
    });
    return obsProcesoTerminado;
  }
}
