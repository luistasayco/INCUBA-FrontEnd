export class TxRegistroEquipoDetalle3Model {
    idRegistroEquipoDetalle: number;
    idRegistroEquipo: number;
    idCondicionLimpieza: number;
    descripcion?: string;
    flgValor: boolean;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRegistroEquipoDetalle = 0;
        this.idRegistroEquipo = 0;
        this.idCondicionLimpieza = 0;
        this.descripcion = '';
        this.flgValor = true;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}