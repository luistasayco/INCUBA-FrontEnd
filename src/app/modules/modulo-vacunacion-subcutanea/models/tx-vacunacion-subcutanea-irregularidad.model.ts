export class TxVacunacionSubCutaneaIrregularidadModel {
    idVacunacionSubCutaneaDetalle: number;
    idVacunacionSubCutanea: number;
    nombreVacunador: string;
    codigoEquipo: string;
    idIrregularidad: number;
    valor: number;

    constructor() {
        this.idVacunacionSubCutaneaDetalle = 0;
        this.idVacunacionSubCutanea = 0;
        this.nombreVacunador = '';
        this.codigoEquipo = '';
        this.idIrregularidad = 0;
        this.valor = 0;
    }
}