export class EquipoPorModeloModel {
    idEquipoPorModelo?: number;
    codigoEmpresa: string;
    codigoPlanta: string;
    idModelo?: number;
    codigoEquipo?: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idEquipoPorModelo = 0;
        this.codigoEmpresa = '';
        this.codigoPlanta = '';
        this.idModelo = 0;
        this.codigoEquipo = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}