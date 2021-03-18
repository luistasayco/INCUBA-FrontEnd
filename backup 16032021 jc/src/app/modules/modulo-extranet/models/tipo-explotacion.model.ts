export class TipoExplotacionModel {
    idTipoExplotacion?: number;
    descripcionTipoExplotacion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idTipoExplotacion = 0;
        this.descripcionTipoExplotacion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}