export class TxExamenFisicoPollitoDetalleModel {
    idExamenFisicoDetalle: number;
    idExamenFisico: number;
    numeroPollito: number;
    descripcionProceso: string;
    idProcesoDetalle: number;
    descripcionProcesoDetalle: string;
    factor: number;
    valor: number;

    constructor(){
        this.idExamenFisicoDetalle = 0;
        this.idExamenFisico = 0;
        this.numeroPollito = 0;
        this.descripcionProceso = '';
        this.idProcesoDetalle = 0;
        this.descripcionProcesoDetalle = '';
        this.factor = 0;
        this.valor = 0;
    }
}