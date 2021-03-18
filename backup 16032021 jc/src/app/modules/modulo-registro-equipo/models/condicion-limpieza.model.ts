export class CondicionLimpiezaModel {
    idCondicionLimpieza?: number;
    orden?: number;
    descripcion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idCondicionLimpieza = 0;
        this.orden = 0;
        this.descripcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}