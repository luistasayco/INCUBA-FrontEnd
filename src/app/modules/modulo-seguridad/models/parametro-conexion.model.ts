export class ParametroConexionModel {
    idParametroConexion?: number;
    aplicacionServidor: string;
    aplicacionBaseDatos: string;
    aplicacionUsuario: string;
    aplicacionPassword: string;
    sapServidor: string;
    sapBaseDatos: string;
    sapUsuario: string;
    sapPassword: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idParametroConexion = 0;
        this.aplicacionServidor = '';
        this.aplicacionBaseDatos = '';
        this.aplicacionUsuario = '';
        this.aplicacionPassword = '';
        this.sapServidor = '';
        this.sapBaseDatos = '';
        this.sapUsuario = '';
        this.sapPassword = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}