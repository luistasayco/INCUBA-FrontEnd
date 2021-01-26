export class TxVacunacionSubCutaneaMaquinaModel {
    idVacunacionSubCutaneaMaquina: number;
    idVacunacionSubCutanea: number;
    idAguja: number;
    descripcionAguja: string;
    nroMaquinas: number;
    codigoModelo: string;
    descripcionModelo: string;
    codigoEquipo: string;

    constructor() {
        this.idVacunacionSubCutaneaMaquina = 0;
        this.idVacunacionSubCutanea = 0;
        this.idAguja = 0;
        this.descripcionAguja = '';
        this.nroMaquinas = 0;
        this.codigoModelo = '';
        this.descripcionModelo = '';
        this.codigoEquipo = '';
    }
}