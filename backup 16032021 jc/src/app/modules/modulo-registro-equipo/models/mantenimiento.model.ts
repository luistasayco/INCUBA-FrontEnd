export class MantenimientoModel {
    idMantenimiento?: number;
    descripcion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idMantenimiento = 0;
        this.descripcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}