export class ProcesoSubCutaneaModel {
    idProcesoSubCutanea?: number;
    descripcionProcesoSubCutanea: string;
    valor?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProcesoSubCutanea = 0;
        this.descripcionProcesoSubCutanea = '';
        this.valor = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}