import { UsuarioModel } from './usuario.model';
export class PersonaModel {
    idPersona?: number;
    nombre: string;
    usuario?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombreCompleto?: string;
    nroDocumento?: string;
    nroTelefono?: string;
    flgActivo?: boolean;
    entidadUsuario?: UsuarioModel;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idPersona = 0;
        this.nombre = '';
        this.usuario = '';
        this.apellidoPaterno = '';
        this.apellidoMaterno = '';
        this.nombreCompleto = '';
        this.nroDocumento = '';
        this.nroTelefono = '';
        this.flgActivo = true;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}