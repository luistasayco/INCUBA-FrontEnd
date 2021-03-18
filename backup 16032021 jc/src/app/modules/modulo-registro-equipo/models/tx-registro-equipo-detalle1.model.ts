export class TxRegistroEquipoDetalle1Model {
    idRegistroEquipoDetalle: number;
    idRegistroEquipo: number;
    idMantenimientoPorModelo: number;
    descripcion?: string;
    codigoEquipo?: string;
    flgValor: boolean;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRegistroEquipoDetalle = 0;
        this.idRegistroEquipo = 0;
        this.idMantenimientoPorModelo = 0;
        this.descripcion = '';
        this.codigoEquipo = '';
        this.flgValor = true;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}