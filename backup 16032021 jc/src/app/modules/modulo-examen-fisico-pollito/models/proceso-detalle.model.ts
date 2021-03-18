export class ProcesoDetalleModel {
    idProcesoDetalle?: number;
    idProceso: number;
    descripcionProceso?: string;
    descripcionProcesoDetalle?: string;
    flgDefault?: boolean;
    orden?: number;
    tipoControl?: string;
    etiqueta?: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProcesoDetalle = 0;
        this.idProceso = 0;
        this.descripcionProceso = '';
        this.descripcionProcesoDetalle = '';
        this.flgDefault = false;
        this.orden = 0;
        this.tipoControl = '';
        this.etiqueta = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}