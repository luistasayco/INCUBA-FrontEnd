export class TxSIMConsolidadoDetalle {
    idSIMConsolidadoDetalle: number;
    idSIMConsolidado: number;
    idSIM: number;
    codigoPlanta: string;
    edad: number;
    sexo: string;
    zona: string;
    galpon: number;
    nroPollos: number;
    fecHoraRegistro: Date;

    constructor() {
        this.idSIMConsolidadoDetalle = 0;
        this.idSIMConsolidado = 0;
        this.idSIM = 0;
        this.codigoPlanta = '';
        this.edad = 0;
        this.sexo = '';
        this.zona = '';
        this.galpon = 0;
        this.nroPollos = 0;
        this.fecHoraRegistro = null;
    }
}