export class ModeloDashboardFormularioPorFiltro {
    filtro: number;

    constructor(){
        this.filtro = 0;
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
