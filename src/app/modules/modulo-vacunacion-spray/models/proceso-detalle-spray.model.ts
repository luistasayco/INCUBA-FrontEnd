export class ProcesoDetalleSprayModel {
    idProcesoDetalleSpray?: number;
    idProcesoSpray?: number;
    descripcionProcesoSpray: string;
    valor?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProcesoDetalleSpray = 0;
        this.idProcesoSpray = 0;
        this.descripcionProcesoSpray = '';
        this.valor = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}