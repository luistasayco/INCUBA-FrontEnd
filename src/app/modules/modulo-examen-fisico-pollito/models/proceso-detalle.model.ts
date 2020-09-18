export class ProcesoDetalleModel {
    idProcesoDetalle?: number;
    idProceso: number;
    descripcion?: string;
    factor?: number;
    orden?: number;
    tipoControl?: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProcesoDetalle = 0;
        this.idProceso = 0;
        this.descripcion = '';
        this.factor = 0;
        this.orden = 0;
        this.tipoControl = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}