export class TxVacunacionSubCutaneaPromedioModel {
    idVacunacionSubCutaneaDetalle?: number;
    idVacunacionSubCutanea?: number;
    nombreVacunador: string;
    vacunadoPorHora?: number;
    puntajeProductividad?: number;
    controlados ?: number;
    sinVacunar?: number;
    heridos?: number;
    mojados?: number;
    malaPosicion?: number;
    vacunadoCorrectos?: number;
    porcentajeEficiencia?: number;
    puntajeEficiencia?: number;

    constructor () {
        this.idVacunacionSubCutaneaDetalle = 0;
        this.idVacunacionSubCutanea = 0;
        this.nombreVacunador = '';
        this.vacunadoPorHora = 0;
        this.puntajeProductividad = 0;
        this.controlados = 0;
        this.sinVacunar = 0;
        this.heridos = 0;
        this.mojados = 0;
        this.malaPosicion = 0;
        this.vacunadoCorrectos = 0;
        this.porcentajeEficiencia = 0;
        this.puntajeEficiencia = 0;
    }
}