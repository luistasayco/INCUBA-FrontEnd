export class RequerimientoEquipoModel {
    idRequerimientoEquipo?: number;
    orden?: number;
    descripcion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRequerimientoEquipo = 0;
        this.orden = 0;
        this.descripcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}