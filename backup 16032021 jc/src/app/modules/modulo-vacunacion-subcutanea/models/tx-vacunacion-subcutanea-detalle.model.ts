export class TxVacunacionSubCutaneaDetalleModel {
    idVacunacionSubCutaneaDetalle: number;
    idVacunacionSubCutanea: number;
    idProcesoDetalleSubCutanea: number;
    descripcionProcesoDetalleSubCutanea: string;
    idProcesoSubCutanea: number;
    descripcionProcesoSubCutanea: string;
    valor: boolean;
    idProcesoAgrupador: number;
    valorProcesoDetalleSubCutanea: number;
    valorProcesoSubCutanea: number;

    constructor() {
        this.idVacunacionSubCutaneaDetalle = 0;
        this.idVacunacionSubCutanea = 0;
        this.idProcesoDetalleSubCutanea = 0;
        this.descripcionProcesoDetalleSubCutanea = '';
        this.idProcesoSubCutanea = 0;
        this.descripcionProcesoSubCutanea = '';
        this.valor  = false;
        this.idProcesoAgrupador = 0;
        this.valorProcesoDetalleSubCutanea = 0;
        this.valorProcesoSubCutanea = 0;
    }
}