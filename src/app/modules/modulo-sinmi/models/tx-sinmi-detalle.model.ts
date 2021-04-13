export class TxSINMIDetalleModel {
    idSINMIDetalle: number;
    idSINMI: number;
    idOrganoDetalle: number;
    idOrgano: number;
    descripcionOrgano: string;
    orden: number;
    descripcionOrganoDetalle: string;
    score: string;
    ordenDetalle: number;
    ave1: number;
    ave2: number;
    ave3: number;
    ave4: number;
    ave5: number;

    constructor() {
        this.idSINMIDetalle = 0;
        this.idSINMI = 0;
        this.idOrganoDetalle = 0;
        this.idOrgano = 0;
        this.descripcionOrgano = '';
        this.orden = 0;
        this.descripcionOrganoDetalle = '';
        this.score = '';
        this.ordenDetalle = 0;
        this.ave1 = 0;
        this.ave2 = 0;
        this.ave3 = 0;
        this.ave4 = 0;
        this.ave5 = 0;
    }
}