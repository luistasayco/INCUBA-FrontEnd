export class IrregularidadModel {
    idIrregularidad?: number;
    descripcionIrregularidad: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idIrregularidad = 0;
        this.descripcionIrregularidad = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}