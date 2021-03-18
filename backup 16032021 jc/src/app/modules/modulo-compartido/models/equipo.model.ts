export class EquipoModel {
    idEquipo?: string;
    codigoEmpresa?: string;
    codigoPlanta?: string;
    codigoModelo?: string;
    codigoEquipo?: string;
    descripcion: string;

    constructor(){
        this.idEquipo = '';
        this.codigoEmpresa =  '';
        this.codigoPlanta =  '';
        this.codigoModelo =  '';
        this.codigoEquipo =  '';
        this.descripcion = '';
    }
}