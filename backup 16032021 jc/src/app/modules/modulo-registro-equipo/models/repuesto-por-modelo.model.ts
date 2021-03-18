export class RepuestoPorModeloModel {
    idRepuestoPorModelo?: number;
    idEquipoPorModelo?: number;
    codigoModelo?: string;
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
        this.codigoModelo = '';
        this.codigoRepuesto = '';
        this.descripcion = '';
        this.flgPredeterminado = false;
        this.flgAccesorio = false;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}