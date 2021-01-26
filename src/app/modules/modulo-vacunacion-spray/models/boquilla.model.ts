export class BoquillaModel {
    idBoquilla?: number;
    descripcionBoquilla: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idBoquilla = 0;
        this.descripcionBoquilla = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}