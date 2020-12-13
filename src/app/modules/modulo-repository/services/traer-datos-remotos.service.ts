import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { IEstadoTablasDelSistema } from '../interface/IEstadoTablasDelSistema';
import { variableGlobal } from '../../../interface/variable-global.interface';
import { DatePipe } from '@angular/common';
import { FunctionDBLocalService } from '../../modulo-base-datos-local/services/function-dblocal.service';
import { CompartidoService } from '../../modulo-compartido/services/compartido.service';
import { RegistroEquipoService } from '../../modulo-registro-equipo/services/registro-equipo.service';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { SeguridadService } from '../../modulo-seguridad/services/seguridad.service';
import { EmpresaModel } from 'src/app/modules/modulo-compartido/models/empresa.model';
import { ExamenFisicoPollitoService } from '../../modulo-examen-fisico-pollito/services/examen-fisico-pollito.service';
import { CalidadModel } from '../../modulo-examen-fisico-pollito/models/calidad.model';
import { LoginService } from '../../../services/login.service';
import { DataBaseModel } from '../../modulo-seguridad/models/data-base';

@Injectable({
  providedIn: 'root'
})
export class TraerDatosRemotosService {

  private usuarioLogueado: any;
  subscripcionDatosCargados: Subscription;
  public datosCargadosTotalmente: Subject<boolean>;
  private tablasCompletas: IEstadoTablasDelSistema;
  private empresaModel: EmpresaModel = new EmpresaModel();
  private listEmpresa: EmpresaModel[];

  constructor(private readonly formatoFecha: DatePipe,
              private readonly functionDBLocalService: FunctionDBLocalService,
              private compartidoService: CompartidoService,
              private registroEquipoService: RegistroEquipoService,
              private seguridadService: SeguridadService,
              private examenFisicoPollitoService: ExamenFisicoPollitoService,
              private loginService: LoginService) { }

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
      tablaMstCalidad: false,
      tablaTrxExamenFisicoPollitoDetalle: false,
      tablaMsSociedades: false
    };
  }

  private informacionDelProceso(descripcion: string, objeto?: any) {
    // return; // DESCOMENTAR PARA PRUEBAS
    const hora = new Date();
    // console.log('[' + hora.toString() + ']' + ' ' + descripcion, objeto ? objeto : '');
  }

  private procesoFinalizado(nameProcedimiento: string) {
    this.informacionDelProceso('Finalizó: ' + nameProcedimiento);
  }

  public obtenerDatosDesdeServidor(usuario: any) {
    this.datosCargadosTotalmente = new Subject<boolean>();
    this.usuarioLogueado = usuario;
    this.iniciarTablas();
    if (variableGlobal.ESTADO_INTERNET) {
        // console.log('INICIO DE RECEPCION DE DATOS:', this.formatoFecha.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
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
    this.getSociedades('getSociedades','Sociedad');
    this.getEmpresas('getEmpresas', 'Empresa');
    this.getPlantaPorEmpresa('getPlantaPorEmpresa', 'PlantaPorEmpresa');
    this.getModelo('getModelo', 'Modelo');
    this.getCondicionLimpieza('getCondicionLimpieza', 'CondicionLimpieza');
    this.getRequerimientoEquipo('getRequerimientoEquipo', 'RequerimientoEquipo');
    this.getEquipo('getEquipo', 'Equipo');
    this.getMantenimientoPorModelo('getMantenimientoPorModelo', 'MantenimientoPorModelo');
    this.getRepuestoPorModelo('getRepuestoPorModelo', 'RepuestoPorModelo');

    // Modulo II
    this.getCalidad('getCalidad', 'Calidad');
    // Plantilla para el registro del examen fisico del pollito
    this.getExamenFisicoPollitoDetalle('getExamenFisicoPollitoDetalle', 'ExamenFisicoPollitoDetalle');

  }

  private getSociedades(nameProcedimiento: string, etiqueta: string) {
    var tablaSociedades: DataBaseModel[] = [];
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.loginService.getDataBaseAll()
    .subscribe(
        result => {
          console.log(result);
          tablaSociedades = result;
          this.createDataIndexDB( ConstantesTablasIDB._TABLA_SOCIEDAD, tablaSociedades, etiqueta);
          this.procesoFinalizado(nameProcedimiento);
          this.tablasCompletas.tablaMsSociedades = true;
          this.emitDatosCargados();
        }
    );
  }

  private getEmpresas(nameProcedimiento: string, etiqueta: string) {
    this.listEmpresa = [];
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.seguridadService.getEmpresaConAccesoPorUsuario()
    .subscribe(
        result => {

          result.forEach(x => {
            this.empresaModel = {codigoEmpresa: x.codigoEmpresa, descripcion: x.descripcionEmpresa};
            this.listEmpresa.push(this.empresaModel);
          });
          this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTEMPRESA, this.listEmpresa, etiqueta);
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

  private getCalidad(nameProcedimiento: string, etiqueta: string) {
    this.listEmpresa = [];
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    let calidadModel: CalidadModel = new CalidadModel();
    this.examenFisicoPollitoService.getCalidad(calidadModel)
    .subscribe(
        result => {
          this.createDataIndexDB( ConstantesTablasIDB._TABLA_MSTCALIDAD, result, etiqueta);
          this.procesoFinalizado(nameProcedimiento);
          this.tablasCompletas.tablaMstCalidad = true;
          this.emitDatosCargados();
        }
    );
  }

  private getExamenFisicoPollitoDetalle(nameProcedimiento: string, etiqueta: string) {
    this.listEmpresa = [];
    this.informacionDelProceso(`Inicio de ${nameProcedimiento}`);
    this.examenFisicoPollitoService.getTxExamenFisicoPollitoDetalleNew()
    .subscribe(
        result => {
          this.createDataIndexDB( ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO_DETALLE, result, etiqueta);
          this.procesoFinalizado(nameProcedimiento);
          this.tablasCompletas.tablaTrxExamenFisicoPollitoDetalle = true;
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
        this.tablasCompletas.tablaMstRepuestoPorModelo &&
        this.tablasCompletas.tablaMstCalidad &&
        this.tablasCompletas.tablaTrxExamenFisicoPollitoDetalle &&
        this.tablasCompletas.tablaMsSociedades
        ){
      resultado = true;
      // console.log('FIN DE LA SINCRONIZACION DE RECEPCION:', this.formatoFecha.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
    }
    this.datosCargadosTotalmente.next(resultado);
    if (resultado) {
      this.datosCargadosTotalmente.complete();
    }
  }
}
