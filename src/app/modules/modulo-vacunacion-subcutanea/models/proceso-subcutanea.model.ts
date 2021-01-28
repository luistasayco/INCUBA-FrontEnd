export class ProcesoSubCutaneaModel {
    idProcesoSubCutanea?: number;
    descripcionProcesoSubCutanea: string;
    valor?: number;
    idProcesoAgrupador?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProcesoSubCutanea = 0;
        this.descripcionProcesoSubCutanea = '';
        this.valor = 0;
        this.idProcesoAgrupador = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}