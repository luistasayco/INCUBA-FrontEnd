export class ModeloModel {
    idModelo?: number;
    descripcion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idModelo = 0;
        this.descripcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}