export class ParametroSistemaModel {
    idParametrosSistema?: number;
    sendEmail: string;
    sendEmailPasswordOrigen: string;
    sendEmailPort: number;
    sendEmailEnabledSSL: boolean;
    sendEmailHost: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idParametrosSistema = 0;
        this.sendEmail = '';
        this.sendEmailPasswordOrigen = '';
        this.sendEmailPort = 0;
        this.sendEmailEnabledSSL = false;
        this.sendEmailHost = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}