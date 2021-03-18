export class TxVacunacionSprayMaquinaModel {
    idVacunacionSprayMaquina: number;
    idVacunacionSpray: number;
    idBoquilla: number;
    descripcionBoquilla: string;
    nroMaquinas: number;
    codigoModelo: string;
    descripcionModelo: string;
    codigoEquipo: string;

    constructor() {
        this.idVacunacionSprayMaquina = 0;
        this.idVacunacionSpray = 0;
        this.idBoquilla = 0;
        this.descripcionBoquilla = '';
        this.nroMaquinas = 0;
        this.codigoModelo = '';
        this.descripcionModelo = '';
        this.codigoEquipo = '';
    }
}