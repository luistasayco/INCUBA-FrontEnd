export class TxVacunacionSubCutaneaIrregularidadModel {
    idVacunacionSubCutaneaDetalle: number;
    idVacunacionSubCutanea: number;
    nombreVacunador: string;
    codigoEquipo: string;
    idIrregularidad: number;
    descripcionIrregularidad: string;
    valor: number;
    id?: string;

    constructor() {
        this.idVacunacionSubCutaneaDetalle = 0;
        this.idVacunacionSubCutanea = 0;
        this.nombreVacunador = '';
        this.codigoEquipo = '';
        this.idIrregularidad = 0;
        this.descripcionIrregularidad = '';
        this.valor = 0;
        this.id = '';
    }
}