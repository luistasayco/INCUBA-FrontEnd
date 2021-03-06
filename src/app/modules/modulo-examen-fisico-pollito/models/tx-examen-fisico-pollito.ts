import { TxExamenFisicoPollitoDetalleModel } from './tx-examen-fisico-pollito-detalle';
import { TxExamenFisicoPollitoDetalleModelNew } from './tx-examen-fisico-pollito-detalle-new';
import { TxExamenFisicoPollitoDetalleFotosModel } from './tx-examen-fisico-pollito-fotos';
import { TxExamenFisicoPollitoResumenModel } from './tx-examen-fisico-pollito-resumen';
export class TxExamenFisicoPollitoModel {
    idExamenFisico: number;
    codigoEmpresa: string;
    descripcionEmpresa: string;
    codigoPlanta: string;
    descripcionPlanta: string;
    fecRegistro: Date;
    fecHoraRegistro: Date;
    responsableInvetsa: string;
    responsablePlanta: string;
    numeroNacedora: number;
    lote: string;
    pesoPromedio: number;
    edadReproductora: string;
    sexo: string;
    lineaGenetica: string;
    calificacion: number;
    idCalidad: number;
    descripcionCalidad: string;
    firmaInvetsa: string;
    firmaPlanta: string;
    uniformidad: number;
    listDetalleNew: TxExamenFisicoPollitoDetalleModelNew[];
    listDetalleFotos: TxExamenFisicoPollitoDetalleFotosModel[];
    listDetalleResumen: TxExamenFisicoPollitoResumenModel[];
    usuarioCreacion: string;
    flgMigrado: boolean;
    flgEnModificacion: boolean;
    nombreArchivo?: string;
    // Cierre
    flgCerrado: boolean;
    fecCierre: Date;
    usuarioCierre: string;
    idUsuarioCierre: number;

    emailFrom: string;
    emailTo: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idExamenFisico = 0;
        this.codigoEmpresa = '';
        this.descripcionEmpresa = '';
        this.codigoPlanta = '';
        this.descripcionPlanta = '';
        this.fecRegistro = null;
        this.fecHoraRegistro = null;
        this.responsableInvetsa = '';
        this.responsablePlanta = '';
        this.numeroNacedora = 0;
        this.lote = '';
        this.pesoPromedio = 0;
        this.edadReproductora = '';
        this.sexo = '';
        this.lineaGenetica = '';
        this.calificacion = 0;
        this.idCalidad = 0;
        this.descripcionCalidad = '';
        this.firmaPlanta = '';
        this.firmaInvetsa = '';
        this.listDetalleNew = [];
        this.listDetalleFotos = [];
        this.listDetalleResumen = [];
        this.uniformidad = 0;
        this.usuarioCreacion = '';
        this.flgMigrado = false;
        this.flgEnModificacion = false;
        this.flgCerrado = false;
        this.fecCierre = null;
        this.nombreArchivo = '';
        this.usuarioCierre = '';
        this.emailFrom = '';
        this.emailTo = '';
        this.idUsuarioCierre = 0;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}