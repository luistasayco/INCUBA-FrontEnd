import { TxExamenFisicoPollitoDetalleModel } from './tx-examen-fisico-pollito-detalle';
import { TxExamenFisicoPollitoDetalleModelNew } from './tx-examen-fisico-pollito-detalle-new';
import { TxExamenFisicoPollitoDetalleFotosModel } from './tx-examen-fisico-pollito-fotos';
import { TxExamenFisicoPollitoResumenModel } from './tx-examen-fisico-pollito-resumen';
export class TxExamenFisicoPollitoModel {
    idExamenFisico: number;
    codigoEmpresa: string;
    descripcionEmpresa: string;
    unidadPlanta: string;
    fecRegistro: Date;
    fecHoraRegistro: Date;
    responsableInvetsa: string;
    responsablePlanta: string;
    numeroNacedora: number;
    lote: number;
    pesoPromedio: number;
    edadReproductora: number;
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
    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idExamenFisico = 0;
        this.codigoEmpresa = '';
        this.descripcionEmpresa = '';
        this.unidadPlanta = '';
        this.fecRegistro = null;
        this.fecHoraRegistro = null;
        this.responsableInvetsa = '';
        this.responsablePlanta = '';
        this.numeroNacedora = 0;
        this.lote = 0;
        this.pesoPromedio = 0;
        this.edadReproductora = 0;
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
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}