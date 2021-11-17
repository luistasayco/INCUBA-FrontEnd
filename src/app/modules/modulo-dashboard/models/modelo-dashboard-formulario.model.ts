export class ModeloDashboardFormularioPorFiltro {
    filtro: number;
    planta?: string;

    constructor(){
        this.filtro = 0;
        this.planta = ''
    }
}

export class ModeloDashboardFormulario {
    responsableIncubadora: string;
    nombreVacunador: string;
    descripcion: string;

    constructor() {
        this.responsableIncubadora = '';
        this.nombreVacunador = '';
        this.descripcion = '';
    }
}
