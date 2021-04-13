export class TxSINMIConsolidadoDetalle {
    idSINMIConsolidadoDetalle: number;
    idSINMIConsolidado: number;
    idSINMI: number;
    codigoPlanta: string;
    edad: number;
    motivoVisita: string;
    fecHoraRegistro: Date;

    constructor() {
        this.idSINMIConsolidadoDetalle = 0;
        this.idSINMIConsolidado = 0;
        this.idSINMI = 0;
        this.codigoPlanta = '';
        this.edad = 0;
        this.motivoVisita = '';
        this.fecHoraRegistro = null;
    }
}