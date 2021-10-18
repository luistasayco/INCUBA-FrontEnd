export class GoogleDriveFilesModel {
    codigoEmpresa: string;
    idGoogleDrive: string;
    names: string;
    size: number;
    version: number;
    createdTime: Date;
    mimeType: string;
    // Auditoria
    regUsuario?: number;

    constructor(){
        this.codigoEmpresa = '';
        this.idGoogleDrive = '';
        this.names = '';
        this.size = 0;
        this.version = 0;
        this.createdTime = null;
        this.mimeType = '';
        this.regUsuario = 0;
    }
}