export class ConstantesTablasIDB {
    // Tablas Maestras Modulo I
    public static _TABLA_MSTEMPRESA = 'mstEmpresa';
    public static _TABLA_MSTPLANTA = 'mstPlanta';
    public static _TABLA_MSTMODELO = 'mstModelo';
    public static _TABLA_MSTCONDICIONLIMPIEZA = 'mstCondicionLimpieza';
    public static _TABLA_MSTREQUERIMIENTOEQUIPO = 'mstRequerimientoEquipo';
    public static _TABLA_MSTEQUIPO = 'mstEquipo';
    public static _TABLA_MSTMANTENIMIENTOPORMODELO = 'mstMantenimientoPorModelo';
    public static _TABLA_MSTREPUESTOPORMODELO = 'mstRepuestoPorModelo';

    // Tablas Maestras Modulo II
    public static _TABLA_MSTCALIDAD = 'mstCalidad';

    // Tablas Transaccionales Modulo I
    public static _TABLA_TXREGISTROEQUIPO = 'trxRegistroEquipo';

    // Tablas Transaccionales Modulo II
    public static _TABLA_TXEXAMENFISICOPOLLITO = 'trxExamenFisicoPollito';
    public static _TABLA_TXEXAMENFISICOPOLLITO_DETALLE = 'trxExamenFisicoPollitoDetalle';

    // Tablas de seguridad
    public static _TABLA_SEGMENU = 'segMenu';
    public static _TABLA_SOCIEDAD = 'segSociedad'

    // Tablas Maestras Modulo Vacunacion Spray
    public static _TABLA_MSBOQUILLA = 'mstBoquilla';
    public static _TABLA_MSPROCESODETALLESPRAY = 'mstProcesoDetalleSpray';
    public static _TABLA_MSVACUNA = 'mstVacuna';
    public static _TABLA_MSPROCESOSPRAY = 'mstProcesoSpray';

    // Tabla Transaccionales del Modulo Vacunacion Spray
    public static _TABLA_TXVACUNACIONSPRAYNEW = 'trxVacunacionSprayNew';
    public static _TABLA_TXVACUNACIONSPRAY = 'trxVacunacionSpray';

    // Tablas Maestras Modulo Vacunacion Subcutanea
    public static _TABLA_MSAGUJA = 'mstAguja';
    public static _TABLA_MSINDICEEFICIENCIA = 'mstIndiceEficiencia';
    public static _TABLA_MSIRREGULARIDAD = 'mstIrregularidad';
    public static _TABLA_MSPROCESODETALLESUBCUTANEA = 'mstProcesoDetalleSubCutanea';
    public static _TABLA_MSPROCESOSUBCUTANEA = 'mstProcesoSubCutanea';

    // Tabla Transaccionales del Modulo Vacunacion Subcutanea
    public static _TABLA_TXVACUNACIONSUBCUTANEANEW = 'trxVacunacionSubCutaneaNew';
    public static _TABLA_TXVACUNACIONSUBCUTANEA = 'trxVacunacionSubCutanea';
}