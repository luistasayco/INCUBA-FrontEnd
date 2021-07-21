export class DashboardMantenimientoPorFiltro {
    fechaInicio: Date;
    fechaFin: Date;
    idDashboard: number;
    tecnico: number;
    empresa: string;
    modelo: string;
    equipo: string;

    constructor(){
        this.fechaInicio = null;
        this.fechaFin = null;
        this.tecnico = 0;
        this.idDashboard = 0;
        this.empresa = '';
        this.modelo = '';
        this.equipo = '';
    }
}


export class DashboardMantenimiento {
    periodo: string;
    mes: string;
    cantidadVisitas: number;
    nombreEmpresa: string;
    nombrePlanta: string;
    nombreModelo: string;
    nombreRepuesto: string;

    constructor(){
        this.periodo = '';
        this.mes = '';
        this.cantidadVisitas = 0;
        this.nombreEmpresa = '';
        this.nombrePlanta = '';
        this.nombreModelo = '';
        this.nombreRepuesto = '';
    }
}
