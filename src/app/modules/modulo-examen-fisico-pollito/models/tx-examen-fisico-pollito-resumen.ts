export class TxExamenFisicoPollitoResumenModel {
    idExamenFisicoDetalle: number;
    idExamenFisico: number;
    idProceso: number;
    esperado: number;
    obtenido: number;

    constructor(){
        this.idExamenFisicoDetalle = 0;
        this.idExamenFisico = 0;
        this.idProceso = 0;
        this.esperado = 0;
        this.obtenido = 0;
    }
}