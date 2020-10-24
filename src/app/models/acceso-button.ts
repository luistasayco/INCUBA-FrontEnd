export class ButtonAcces {
    btnNuevo: boolean;
    btnEditar: boolean;
    btnEliminar: boolean;
    btnGrabar: boolean;
    btnCerrar: boolean;
    btnPDF: boolean;

    btnNuevoDetalle: boolean;
    btnEditarDetalle: boolean;
    btnEliminarDetalle: boolean;

    btnMenuPadre: boolean;
    btnMenuHijo: boolean;
    btnAdicionarEliminarMantenimiento: boolean;
    btnAdicionarEliminarRepuesto: boolean;
    btnAdicionarEliminar: boolean;

    constructor() {
        this.btnNuevo = true;
        this.btnEditar = true;
        this.btnEliminar = true;
        this.btnGrabar = true;
        this.btnCerrar = true;
        this.btnPDF = true;

        this.btnNuevoDetalle = true;
        this.btnEditarDetalle = true;
        this.btnEliminarDetalle = true;

        this.btnMenuPadre = true;
        this.btnMenuHijo = true;
        this.btnAdicionarEliminar = true;
        this.btnAdicionarEliminarMantenimiento = true;
        this.btnAdicionarEliminarRepuesto = true;
    }
}