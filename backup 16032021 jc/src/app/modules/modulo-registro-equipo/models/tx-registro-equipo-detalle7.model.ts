export class TxRegistroEquipoDetalle7Model {
    idRegistroEquipoDetalle: number;
    idRegistroEquipo: number;
    foto: string;
    orden?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRegistroEquipoDetalle = 0;
        this.idRegistroEquipo = 0;
        this.foto = '';
        this.orden = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}