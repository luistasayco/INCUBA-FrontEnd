import { SubTipoExplotacionModel } from './sub-tipo-explotacion.model';
export class TxRegistroDocumentoModel {
    idDocumento?: number;
    idTipoExplotacion?: number;
    descripcionTipoExplotacion: string;
    idSubTipoExplotacion?: number;
    descripcionSubTipoExplotacion: string;
    codigoEmpresa: string;
    descripcionEmpresa: string;
    codigoPlanta: string;
    descripcionPlanta: string;
    ano: number;
    mes: number;
    idGoogleDrive: string;
    nombreArchivo: string;
    tipoArchivo: string;
    flgActivo: boolean;
    fecRegistro: Date;
    fecHoraRegistro: Date;

    fecInicio: Date;
    fecFin: Date;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idDocumento = 0;
        this.idTipoExplotacion = 0;
        this.descripcionTipoExplotacion = '';
        this.idSubTipoExplotacion = 0;
        this.descripcionSubTipoExplotacion = '';
        this.codigoEmpresa = '';
        this.codigoPlanta = '';
        this.ano = 0;
        this.mes = 0;
        this.idGoogleDrive = '';
        this.nombreArchivo = '';
        this.tipoArchivo = '';
        this.flgActivo = false;
        this.fecRegistro = null;
        this.fecHoraRegistro = null;

        this.fecInicio = null;
        this.fecFin = null;

        this.regUsuario = 0;
        this.regEstacion = '';
    }
}