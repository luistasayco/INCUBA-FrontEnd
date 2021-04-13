export class OrganoModel {
    idOrgano?: number;
    descripcionOrgano: string;
    orden?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idOrgano = 0;
        this.descripcionOrgano = '';
        this.orden = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}