export class ProcesoModel {
    idProceso?: number;
    descripcion: string;
    factor?: number;
    orden?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idProceso = 0;
        this.descripcion = '';
        this.factor = 0;
        this.orden = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}