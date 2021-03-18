export class TxVacunacionSubCutaneaResultadoModel {
    idVacunacionSubCutaneaDetalle: number;
    idVacunacionSubCutanea: number;
    idProcesoAgrupador: number;
    descripcionProcesoAgrupador: string;
    valorEsperado: number;
    valorObtenido: number;
    nroProcesoAcumulado: number;

    constructor() {
        this.idVacunacionSubCutaneaDetalle = 0;
        this.idVacunacionSubCutanea = 0;
        this.idProcesoAgrupador  = 0;
        this.descripcionProcesoAgrupador = '';
        this.valorEsperado = 0.00;
        this.valorObtenido = 0.00;
        this.nroProcesoAcumulado = 0;
    }
}