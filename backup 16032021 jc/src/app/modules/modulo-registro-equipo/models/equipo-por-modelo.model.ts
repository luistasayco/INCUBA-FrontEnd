export class EquipoPorModeloModel {
    codigoEmpresa: string;
    codigoPlanta: string;
    codigoModelo?: string;
    codigoEquipo?: string;

    constructor(){
        this.codigoEmpresa = '';
        this.codigoPlanta = '';
        this.codigoModelo = '';
        this.codigoEquipo = '';
    }
}