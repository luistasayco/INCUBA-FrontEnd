export class TxRegistroEquipoDetalle2Model {
    idRegistroEquipoDetalle: number;
    idRegistroEquipo: number;
    idRepuestoPorModelo: number;
    codigoRepuesto?: string;
    descripcion?: string;
    codigoEquipo?: string;
    mp?: string;
    itemMP?: {
        label: string;
        value: string;
    };
    flgValor: boolean;
    rfc?: string;
    itemRFC?: {
        label: string;
        value: string;
    };

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
        this.mp = '';
        this.flgValor = true;
        this.rfc = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}