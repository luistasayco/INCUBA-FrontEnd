export class TxExamenFisicoPollitoDetalleModelNew {
    numeroPollitos: number;
    idProceso: number;
    descripcionProceso: string;
    idProcesoDetalle: number;
    id1: number;
    descripcion1: string;
    id2: number;
    descripcion2: string;
    factor: number;
    valor: number;
    orden: number;
    valorDefault: number;

    constructor(){
        this.numeroPollitos = 0;
        this.idProceso = 0;
        this.descripcionProceso = '';
        this.idProcesoDetalle = 0;
        this.id1 = 0;
        this.descripcion1 = '';
        this.id2 = 0;
        this.descripcion2 = '';
        this.factor = 0;
        this.valor = 0;
        this.orden = 0;
        this.valorDefault = 0;
    }
}