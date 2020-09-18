export class RepuestoPorModeloModel {
    idRepuestoPorModelo?: number;
    idEquipoPorModelo?: number;
    codigoEmpresa: string;
    codigoPlanta: string;
    idModelo?: number;
    codigoEquipo?: string;
    codigoRepuesto?: string;
    descripcion?: string;
    flgPredeterminado?: boolean;
    flgAccesorio?: boolean;
    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRepuestoPorModelo = 0;
        this.idEquipoPorModelo = 0;
        this.codigoEmpresa = '';
        this.codigoPlanta = '';
        this.idModelo = 0;
        this.codigoEquipo = '';
        this.codigoRepuesto = '';
        this.descripcion = '';
        this.flgPredeterminado = false;
        this.flgAccesorio = false;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}