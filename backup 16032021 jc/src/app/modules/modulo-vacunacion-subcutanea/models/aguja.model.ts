export class AgujaModel {
    idAguja?: number;
    descripcionAguja: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idAguja = 0;
        this.descripcionAguja = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}