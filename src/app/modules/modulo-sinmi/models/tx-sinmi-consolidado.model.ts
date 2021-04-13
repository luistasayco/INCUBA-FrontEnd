import { TxSINMIConsolidadoDetalle } from './tx-sinmi-consolidado-detalle.model';
export class TxSINMIConsolidado {
    idSINMIConsolidado: number;
    codigoEmpresa: string;
    descripcionEmpresa: string;
    descripcion: string;
    observacion: string;
    usuarioCreacion: string;
    fecRegistro: Date;
    fecHoraRegistro:Date;
    nombreArchivo: string;
    flgCerrado: boolean;
    idUsuarioCierre: number;
    fecCierre: Date;
    usuarioCierre: string;
    listaTxSINMIConsolidadoDetalle: TxSINMIConsolidadoDetalle[];
    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor() {
        this.idSINMIConsolidado = 0;
        this.codigoEmpresa = '';
        this.descripcionEmpresa = '';
        this.descripcion = '';
        this.observacion = '';
        this.fecRegistro = null;
        this.fecHoraRegistro = null;
        this.listaTxSINMIConsolidadoDetalle = [];
        this.usuarioCreacion = '';
        this.nombreArchivo = '';
        this.usuarioCierre = '';
        this.flgCerrado = false;
        this.idUsuarioCierre = 0;
        this.fecCierre = null;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}