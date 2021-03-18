export class SubTipoExplotacionModel {
    idSubTipoExplotacion?: number;
    idTipoExplotacion: number;
    descripcionSubTipoExplotacion?: string;
    nombreDocumento?: string;
    flgRequiereFormato?: boolean;
    flgExisteDigital?: boolean;
    flgParaCliente?: boolean;
    flgParaInvetsa?: boolean;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idSubTipoExplotacion = 0;
        this.idTipoExplotacion = 0;
        this.descripcionSubTipoExplotacion = '';
        this.nombreDocumento = '';
        this.flgRequiereFormato = false;
        this.flgExisteDigital = false;
        this.flgParaCliente = false;
        this.flgParaInvetsa = false;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}