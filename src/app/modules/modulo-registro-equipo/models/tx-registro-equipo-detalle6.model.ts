export class TxRegistroEquipoDetalle6Model {
    idRegistroEquipoDetalle: number;
    idRegistroEquipo: number;
    codigoRepuesto: string;
    descripcion?: string;
    stockActual?: number;
    cambioPorMantenimiento?: number;
    entregado?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRegistroEquipoDetalle = 0;
        this.idRegistroEquipo = 0;
        this.codigoRepuesto = '';
        this.descripcion = '';
        this.stockActual = 0;
        this.cambioPorMantenimiento = 0;
        this.entregado = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}