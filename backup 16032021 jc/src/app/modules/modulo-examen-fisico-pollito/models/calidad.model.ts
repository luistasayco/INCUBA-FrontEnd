export class CalidadModel {
    idCalidad?: number;
    descripcion: string;
    rangoInicial?: number;
    rangoFinal?: number;
    color?: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idCalidad = 0;
        this.descripcion = '';
        this.rangoInicial = 0;
        this.rangoFinal = 0;
        this.color = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}