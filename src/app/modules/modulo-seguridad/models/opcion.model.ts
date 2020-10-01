export class OpcionModel {
    idOpcion?: number;
    idMenu?: number;
    descripcionOpcion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idOpcion = 0;
        this.idMenu = 0;
        this.descripcionOpcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}