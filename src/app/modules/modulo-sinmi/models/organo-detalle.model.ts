export class OrganoDetalleModel {
    idOrganoDetalle?: number;
    idOrgano: number;
    descripcionOrganoDetalle?: string;
    score?: string;
    ordenDetalle?: number;
    scoreInicio?: number;
    scoreFin?: number;
    factorImpacto?: number;
    flgMedia?: boolean;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idOrganoDetalle = 0;
        this.idOrgano = 0;
        this.descripcionOrganoDetalle = '';
        this.score = '';
        this.ordenDetalle = 0;
        this.scoreInicio = 0;
        this.scoreFin = 0;
        this.factorImpacto = 0;
        this.flgMedia = false;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}