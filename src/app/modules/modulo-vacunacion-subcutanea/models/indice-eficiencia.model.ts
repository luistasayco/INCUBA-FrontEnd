export class IndiceEficienciaModel {
    idIndiceEficiencia?: number;
    descripcionIndiceEficiencia: string;
    rangoInicial?: number;
    rangoFinal?: number;
    puntaje?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idIndiceEficiencia = 0;
        this.descripcionIndiceEficiencia = '';
        this.rangoInicial = 0;
        this.rangoFinal = 0;
        this.puntaje = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}