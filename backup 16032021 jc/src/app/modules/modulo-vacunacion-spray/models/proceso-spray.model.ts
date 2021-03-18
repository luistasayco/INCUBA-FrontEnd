export class ProcesoSprayModel {
    idProcesoSpray?: number;
    descripcionProcesoSpray: string;
    valor?: number;
    idProcesoAgrupador?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProcesoSpray = 0;
        this.descripcionProcesoSpray = '';
        this.valor = 0;
        this.idProcesoAgrupador= 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}