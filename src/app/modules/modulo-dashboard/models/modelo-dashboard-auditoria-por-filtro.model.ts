export class ModeloDashboardAuditoriaPorFiltro {
    empresa: string;
    planta: string;
    responsableInvetsa: number;
    responsablePlanta: string;
    tipo: number;
    lineaGenetica: number;
    vacunador: string;
    fechaInicio: Date;
    fechaFin: Date;
    idDashboard: number;
    idUsuario: number;

    constructor(){
        this.empresa = '';
        this.planta = '';
        this.responsableInvetsa = 0;
        this.responsablePlanta = '';
        this.tipo = 0;
        this.lineaGenetica = 0;
        this.vacunador = '';
        this.fechaInicio = null;
        this.fechaFin = null;
        this.idDashboard = 0;
        this.idUsuario = 0;
    }
}

export class DashboardAuditoria {
    cantidad: number;
    cantidadSI: number;
    cantidadNO: number;
    periodo: string;
    descripcion: string;
    descripcionDashboard: string;
    etiqueta: string;
    puntajeProductividad: number;
    porcentajeEficiencia: number;
    valorObtenido: number;
    nombreVacunador: string;

    constructor() {
        this.cantidad = 0;
        this.cantidadSI = 0;
        this.cantidadNO = 0;
        this.periodo = '';
        this.descripcion = '';
        this.descripcionDashboard = '';
        this.etiqueta = '';
        this.puntajeProductividad = 0;
        this.porcentajeEficiencia = 0;
        this.nombreVacunador = '';
    }
}
