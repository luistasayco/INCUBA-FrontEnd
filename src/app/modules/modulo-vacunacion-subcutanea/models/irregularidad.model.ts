export class IrregularidadModel {
    idIrregularidad?: number;
    descripcionIrregularidad: string;
    valor?: number;
    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idIrregularidad = 0;
        this.descripcionIrregularidad = '';
        this.valor = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}