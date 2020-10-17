export class GlobalsConstants {
    // Variables Etiquetas
    cEditar: string;
    cBuscar: string;
    cNuevo: string;
    cEliminar: string;
    cGrabar: string;
    cCancelar: string;
    cRegresar: string;

    // Variables de Etiquetas para la Firma Digital
    cFirma1: string;
    cFirma2: string;
    cFirmaOk1: string;
    cFirmaOk2: string;
    cFirmaClear: string;

    // Variables Iconos
    icoEditar: string;
    icoNuevo: string;
    icoBuscar: string;
    icoGrabar: string;
    icoEliminar: string;
    icoCancelar: string;
    icoRegresar: string;
    icoPDF: string;
    icoCerrado: string;
    icoAbierto: string;
    icoVisualizar: string;

    // Variables titulos
    titleEliminar: string;
    subTitleEliminar: string;

    titleCierre: string;
    subTitleCierre: string;

    // Variables mensaje
    msgExitoSummary: string;
    msgExitoDetail: string;

    msgErrorSummary: string;

    msgCancelDetail: string;
    msgCancelSummary: string;

    msgInfoDetail: string;
    msgInfoSummary: string;

    // Variables size Page
    sizePage: number;

    constructor() {
        // Etiqueta de Controles
        this.cNuevo = 'Nuevo';
        this.cBuscar = 'Buscar';
        this.cGrabar = 'Grabar';
        this.cCancelar = 'Cancelar';
        this.cEliminar = 'Eliminar';
        this.cRegresar = 'Regresar';

        this.cFirmaOk1 = 'Firma Invetsa Finalizada';
        this.cFirmaOk2 = 'Firma Planta Finalizada';
        this.cFirma1 = 'Firma Invetsa';
        this.cFirma2 = 'Firma Planta';
        this.cFirmaClear = 'Limpiar Firma';

        // Iconos
        this.icoEditar = 'pi pi-pencil';
        this.icoNuevo = 'pi pi-plus';
        this.icoBuscar = 'pi pi-search';
        this.icoGrabar = 'pi pi-save';
        this.icoEliminar = 'pi pi-trash';
        this.icoCancelar = 'pi pi-times';
        this.icoRegresar = 'pi pi-sign-out';
        this.icoPDF = 'fa fa-file-pdf-o';
        this.icoCerrado = 'fa fa-lock';
        this.icoAbierto = 'fa fa-unlock';
        this.icoVisualizar = 'fa fa-eye';

        // Titulo
        this.titleEliminar = 'Confimación de Eliminación';
        this.subTitleEliminar = '¿Seguro de Eliminar el registro seleccionado?';

        this.titleCierre = 'Confimación de Cierre';
        this.subTitleCierre = '¿Seguro de Cerrar el registro seleccionado?';

        // Msg Prime Ng
        this.msgExitoSummary = 'Mensaje de Éxito : ';
        this.msgExitoDetail = 'Se realizo correctamente...!!!';

        this.msgErrorSummary = 'Mensaje de Error : ';

        this.msgCancelSummary = 'Mensaje de Cancelación : ';
        this.msgCancelDetail = 'Se cancelo la accion con Éxito...!!!';

        this.msgInfoSummary = 'Mensaje de Información : ';
        this.msgInfoDetail = 'Se informo con Éxito...!!!';

        // Numero de Filas
        this.sizePage = 10;
    }

}