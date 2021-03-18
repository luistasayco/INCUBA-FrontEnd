export class TxVacunacionSprayDetalleModel {
    idVacunacionSprayDetalle: number;
    idVacunacionSpray: number;
    idProcesoDetalleSpray: number;
    descripcionProcesoDetalleSpray: string;
    idProcesoSpray: number;
    descripcionProcesoSpray: string;
    valor: boolean;
    idProcesoAgrupador: number;
    valorProcesoDetalleSpray: number;
    valorProcesoSpray: number;

    constructor() {
        this.idVacunacionSprayDetalle = 0;
        this.idVacunacionSpray = 0;
        this.idProcesoDetalleSpray = 0;
        this.descripcionProcesoDetalleSpray = '';
        this.idProcesoSpray = 0;
        this.descripcionProcesoSpray = '';
        this.valor  = false;
        this.idProcesoAgrupador = 0;
        this.valorProcesoDetalleSpray = 0;
        this.valorProcesoSpray = 0;
    }
}