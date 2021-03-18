export class VacunaModel {
    idVacuna?: number;
    descripcionVacuna: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idVacuna = 0;
        this.descripcionVacuna = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}