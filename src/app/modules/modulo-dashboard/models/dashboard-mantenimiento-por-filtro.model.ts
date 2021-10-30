export class DashboardMantenimientoPorFiltro {
    fechaInicio: Date;
    fechaFin: Date;
    idDashboard: number;
    tecnico: any[];
    // empresa: string;
    planta: any[];
    modelo: any[];
    equipo: any[];
    idUsuario: number;

    constructor(){
        this.fechaInicio = null;
        this.fechaFin = null;
        this.tecnico = [];
        this.idDashboard = 0;
        this.planta = [];
        this.modelo = [];
        this.equipo = [];
        this.idUsuario = 0;
    }
}


export class DashboardMantenimiento {
    cantidad: number;
    periodo: string;
    descripcion: string;
    descripcionDashboard: string;
    etiqueta: string;
    
    constructor(){
        this.cantidad = 0;
        this.periodo = '';
        this.descripcion = '';
        this.descripcionDashboard = '';
        this.etiqueta = '';
    }
        
}
