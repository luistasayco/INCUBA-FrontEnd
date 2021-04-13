export class OrganoDetalleModel {
    idOrganoDetalle?: number;
    idOrgano: number;
    descripcionOrganoDetalle?: string;
    score?: string;
    ordenDetalle?: number;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idOrganoDetalle = 0;
        this.idOrgano = 0;
        this.descripcionOrganoDetalle = '';
        this.score = '';
        this.ordenDetalle = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}