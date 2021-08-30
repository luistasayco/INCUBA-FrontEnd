export class ModeloDashboardSINMIPorFiltro {
    empresa: string;
    planta: string;
    responsableInvetsa: number;
    responsableCompañia: string;
    tipoModulo: number;
    linea: string;
    edad: number;
    fechaInicio: Date;
    fechaFin: Date;
    idDashboard: number;
    idUsuario: number;

    constructor(){
        this.empresa = '';
        this.planta = '';
        this.responsableInvetsa = 0;
        this.responsableCompañia = '';
        this.tipoModulo = 0;
        this.linea = '';
        this.edad = 0;
        this.fechaInicio = null;
        this.fechaFin = null;
        this.idDashboard = 0;
        this.idUsuario = 0;
    }
}

export class ModeloDashboardSINMI{
    scoreGeneral: number;
    periodo: string;

    constructor(){
        this.scoreGeneral = 0;
        this.periodo = '';
    }
}
