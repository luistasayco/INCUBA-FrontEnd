export class TxVacunacionSprayResultadoModel {
    idVacunacionSprayDetalle: number;
    idVacunacionSpray: number;
    idProcesoAgrupador: number;
    descripcionProcesoAgrupador: string;
    valorEsperado: number;
    valorObtenido: number;
    nroProcesoAcumulado: number;

    constructor() {
        this.idVacunacionSprayDetalle = 0;
        this.idVacunacionSpray = 0;
        this.idProcesoAgrupador  = 0;
        this.descripcionProcesoAgrupador = '';
        this.valorEsperado = 0.00;
        this.valorObtenido = 0.00;
        this.nroProcesoAcumulado = 0;
    }
}