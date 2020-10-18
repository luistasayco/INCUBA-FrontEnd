import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { IEstadoTablasDelSistema } from '../interface/IEstadoTablasDelSistema';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { DatePipe } from '@angular/common';
import { FunctionDBLocalService } from '../../modulo-base-datos-local/services/function-dblocal.service';
import { CompartidoService } from '../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../modulo-registro-equipo/services/registro-equipo.service';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';

@Injectable({
  providedIn: 'root'
})
export class TraerDatosRemotosService {

  private usuarioLogueado: any;
  subscripcionDatosCargados: Subscription;
  public datosCargadosTotalmente: Subject<boolean>;
  private tablasCompletas: IEstadoTablasDelSistema;

  constructor(private readonly formatoFecha: DatePipe,
              private readonly functionDBLocalService: FunctionDBLocalService,
              private compartidoService: CompartidoService,
              private registroEquipoService: RegistroEquipoService) { }

  private iniciarTablas() {
    this.tablasCompletas = {
      tablaMstEmpresa: false,
      tablaMstPlanta: false,
      tablaMstModelo: false,
      tablaMstCondicionLimpieza: false,
      tablaMstRequerimientoEquipo: false,
      tablaMstEquipo: false,
      tablaMstMantenimientoPorModelo: false,
      tablaMstRepuestoPorModelo: false,
    };
  }

  private informacionDelProceso(descripcion: string, objeto?: any) {
    // return; // DESCOMENTAR PARA PRUEBAS
    const hora = new Date();
    console.log('[' + hora.toString() + ']' + ' ' + descripcion, objeto ? objeto : '');
  }

  private procesoFinalizado(nameProcedimiento: string) {
    this.informacionDelProceso('Finalizó: ' + nameProcedimiento);
  }

  public obtenerDatosDesdeServidor(usuario: any) {
    this.datosCargadosTotalmente = new Subject<boolean>();
    this.usuarioLogueado = usuario;
    this.iniciarTablas();
    if (variableGlobal.ESTADO_INTERNET) {
        console.log('INICIO DE RECEPCION DE DATOS:', this.formatoFecha.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
        this.getUsuario(this.usuarioLogueado);
    } else {
        this.informacionDelProceso('obtenerDatosDesdeServidor: Sin Acceso a Internet');
        this.datosCargadosTotalmente.complete();
    }
  }

  // ***********************************************
  // USUARIO
  // ***********************************************
  private getUsuario(usuario: any) {
    // const password: string = usuario.password;
    // const recordarUsuario: number = usuario.recordarUsuario;
    // this.createUsuario(usuario);
    this.obtenerDatosRemotos();
    this.procesoFinalizado('getUsuario');
    // this.tablasCompletas.tablaUsuarios = true;
    this.emitDatosCargados();
  }

  createDataIndexDB(nameTabla: string, registros: any, etiqueta: string) {
    this.informacionDelProceso(`Inicio la insercion de ${etiqueta}`);
    this.functionDBLocalService.createEnDBLocalDesdeServidor(nameTabla, registros);
    this.informacionDelProceso(`Finalizo la insercion de  ${etiqueta}`);
  }

  private obtenerDatosRemotos() {
    this.getEmpresas('getEmpresas', 'Empresa');
    this.getPlantaPorEmpresa('getPlantaPorEmpresa', 'PlantaPorEmpresa');
    this.getModelo('getModelo', 'Modelo');
    this.getCondicionLimpieza('getCondicionLimpieza', 'CondicionLimpieza');
    this.getRequerimientoEquipo('getRequerimientoEquipo', 'RequerimientoEquipo');
    this.getEquipo('getEquipo', 'Equipo');
    this.getMantenimientoPorModelo('getMantenimientoPorModelo', 'MantenimientoPorModelo');
    this.getRepuestoPorModelo('getRepuestoPorModelo', 'RepuestoPorModelo');
  }

  private getEmpresas(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.compartidoService.getEmpresa()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTEMPRESA, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstEmpresa = true;
            this.emitDatosCargados();
        }
    );
  }

  private getPlantaPorEmpresa(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.compartidoService.getPlantaPorEmpresa()
    .subscribe(
        result => {
          this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTPLANTA, result, etiqueta);
          this.procesoFinalizado(nameProcedimiento);
          this.tablasCompletas.tablaMstPlanta = true;
          this.emitDatosCargados();
        }
    );
  }

  private getModelo(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.registroEquipoService.getModelo()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTMODELO, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstModelo = true;
            this.emitDatosCargados();
        }
    );
  }

  private getCondicionLimpieza(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.registroEquipoService.getCondicionLimpieza()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTCONDICIONLIMPIEZA, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstCondicionLimpieza = true;
            this.emitDatosCargados();
        }
    );
  }

  private getRequerimientoEquipo(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.registroEquipoService.getRequerimientoEquipo()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTREQUERIMIENTOEQUIPO, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstRequerimientoEquipo = true;
            this.emitDatosCargados();
        }
    );
  }

  private getEquipo(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.compartidoService.getEquipo()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTEQUIPO, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstEquipo = true;
            this.emitDatosCargados();
        }
    );
  }

  private getMantenimientoPorModelo(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.compartidoService.getMantenimientoPorModelo()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTMANTENIMIENTOPORMODELO, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstMantenimientoPorModelo = true;
            this.emitDatosCargados();
        }
    );
  }

  private getRepuestoPorModelo(nameProcedimiento: string, etiqueta: string) {
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.compartidoService.getRepuestoPorModelo()
    .subscribe(
        result => {
            this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTREPUESTOPORMODELO, result, etiqueta);
            this.procesoFinalizado(nameProcedimiento);
            this.tablasCompletas.tablaMstRepuestoPorModelo = true;
            this.emitDatosCargados();
        }
    );
  }

  emitDatosCargados() {
    let resultado = false;
    if (this.tablasCompletas.tablaMstEmpresa && this.tablasCompletas.tablaMstPlanta &&
        this.tablasCompletas.tablaMstModelo && this.tablasCompletas.tablaMstCondicionLimpieza &&
        this.tablasCompletas.tablaMstRequerimientoEquipo &&
        this.tablasCompletas.tablaMstEquipo &&
        this.tablasCompletas.tablaMstMantenimientoPorModelo &&
        this.tablasCompletas.tablaMstRepuestoPorModelo
        ){
      resultado = true;
      console.log('FIN DE LA SINCRONIZACION DE RECEPCION:', this.formatoFecha.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
    }
    this.datosCargadosTotalmente.next(resultado);
    if (resultado) {
      this.datosCargadosTotalmente.complete();
    }
  }
}
