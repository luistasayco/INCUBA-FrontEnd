export class PlantaPorUsuarioModel {
    idPlantaPorUsuario?: number;
    codigoEmpresa: string;
    descripcionEmpresa: string;
    codigoPlanta: string;
    descripcionPlanta: string;
    idUsuario?: number;

    constructor(){
        this.idPlantaPorUsuario = 0;
        this.codigoEmpresa = '';
        this.descripcionEmpresa = '';
        this.codigoPlanta = '';
        this.descripcionPlanta = '';
        this.idUsuario = 0;
    }
}