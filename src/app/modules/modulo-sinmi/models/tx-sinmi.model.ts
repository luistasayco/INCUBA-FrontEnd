import { TxSINMIDetalleModel } from './tx-sinmi-detalle.model';
import { TxSINMIFotosModel } from './tx-sinmi-foto.model';

export class TxSINMIModel {
    idSINMI: number;
    codigoEmpresa: string;
    codigoPlanta: string;
    edad: number;
    sexo: string;
    motivoVisita: string;
    fecRegistro: Date;
    fecHoraRegistro:Date;
    responsableInvetsa: string;
    responsableIncubadora: string;
    observacionInvetsa: string;
    observacionPlanta: string;
    flgCerrado: boolean;
    idUsuarioCierre: number;
    fecCierre: Date;
    emailFrom: string;
    emailTo: string;
    usuarioCierre: string;
    nombreArchivo: string;
    descripcionEmpresa: string;
    descripcionPlanta: string;
    descripcionTipoExplotacion: string;
    descripcionSubTipoExplotacion: string;
    idSubTipoExplotacion: number;
    usuarioCreacion: string;
    flgMigrado: boolean;
    listaTxSINMIDetalle: TxSINMIDetalleModel[];
    listaTxSINMIFotos: TxSINMIFotosModel[];

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor() {
        this.idSINMI = 0;
        this.codigoEmpresa = '';
        this.codigoPlanta = '';
        this.edad = 0;
        this.sexo = '';
        this.motivoVisita = '';
        this.fecRegistro = null;
        this.fecHoraRegistro = null;
        this.responsableInvetsa = '';
        this.responsableIncubadora = '';
        this.observacionInvetsa = '';
        this.observacionPlanta = '';
        this.flgCerrado = false;
        this.idUsuarioCierre = 0;
        this.fecCierre = null;
        this.emailFrom = '';
        this.emailTo = '';
        this.usuarioCreacion = '';
        this.nombreArchivo = '';
        this.descripcionEmpresa = '';
        this.descripcionPlanta = '';
        this.descripcionTipoExplotacion = '';
        this.descripcionSubTipoExplotacion = '';
        this.idSubTipoExplotacion = 0;
        this.usuarioCierre = '';
        this.flgMigrado = false;
        this.listaTxSINMIDetalle = [];
        this.listaTxSINMIFotos = [];

        this.regUsuario = 0;
        this.regEstacion = '';
    }
}