export class MantenimientoPorModeloModel {
    idMantenimientoPorModelo?: number;
    idEquipoPorModelo?: number;
    codigoModelo?: string;
    codigoEquipo?: string;
    idMantenimiento?: number;
    descripcion?: string;
    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idMantenimientoPorModelo = 0;
        this.idEquipoPorModelo = 0;
        this.codigoModelo = '';
        this.codigoEquipo = '';
        this.idMantenimiento = 0;
        this.descripcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}