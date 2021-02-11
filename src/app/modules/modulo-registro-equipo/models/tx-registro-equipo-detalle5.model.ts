export class TxRegistroEquipoDetalle5Model {
    idRegistroEquipoDetalle: number;
    idRegistroEquipo: number;
    idRepuestoPorModelo: number;
    codigoRepuesto: string;
    codigoEquipo?: string;
    descripcion?: string;
    observacion?: string;
    idKeys?: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRegistroEquipoDetalle = 0;
        this.idRegistroEquipo = 0;
        this.idRepuestoPorModelo = 0;
        this.codigoRepuesto = '';
        this.descripcion = '';
        this.codigoEquipo = '';
        this.observacion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}