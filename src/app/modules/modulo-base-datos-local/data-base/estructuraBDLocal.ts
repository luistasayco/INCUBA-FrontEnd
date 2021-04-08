import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';

export const estructuraBD = {
    BASE_DE_DATOS: [
      {
          store: ConstantesTablasIDB._TABLA_MSTEMPRESA,
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: true } },
            { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
          ]
      },
      {
          store: ConstantesTablasIDB._TABLA_MSTPLANTA,
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'PlantaEmpresa', keypath: 'PlantaEmpresa', options: { unique: true } },
            { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } },
            { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
            { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
          ]
      },
      {
          store: ConstantesTablasIDB._TABLA_MSTMODELO,
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: [
            { name: 'codigoModelo', keypath: 'codigoModelo', options: { unique: true } },
            { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
          ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTCONDICIONLIMPIEZA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idCondicionLimpieza', keypath: 'idCondicionLimpieza', options: { unique: true } },
          { name: 'orden', keypath: 'orden', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTREQUERIMIENTOEQUIPO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idRequerimientoEquipo', keypath: 'idRequerimientoEquipo', options: { unique: true } },
          { name: 'orden', keypath: 'orden', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTEQUIPO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idEquipo', keypath: 'idEquipo', options: { unique: true } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } },
          { name: 'codigoModelo', keypath: 'codigoModelo', options: { unique: false } },
          { name: 'codigoEquipo', keypath: 'codigoEquipo', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTMANTENIMIENTOPORMODELO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idMantenimientoPorModelo', keypath: 'idMantenimientoPorModelo', options: { unique: true } },
          { name: 'codigoModelo', keypath: 'codigoModelo', options: { unique: false } },
          { name: 'idMantenimiento', keypath: 'idMantenimiento', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTREPUESTOPORMODELO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idRepuestoPorModelo', keypath: 'idRepuestoPorModelo', options: { unique: true } },
          { name: 'codigoModelo', keypath: 'codigoModelo', options: { unique: false } },
          { name: 'codigoRepuesto', keypath: 'codigoRepuesto', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
          { name: 'flgPredeterminado', keypath: 'flgPredeterminado', options: { unique: false } },
          { name: 'flgAccesorio', keypath: 'flgAccesorio', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idRegistroEquipo', keypath: 'idRegistroEquipo', options: { unique: false } },
          { name: 'fecRegistro', keypath: 'fecRegistro', options: { unique: false } },
          { name: 'fecHoraRegistro', keypath: 'fecHoraRegistro', options: { unique: true } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'descripcionEmpresa', keypath: 'descripcionEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } },
          { name: 'descripcionPlanta', keypath: 'descripcionPlanta', options: { unique: false } },
          { name: 'codigoModelo', keypath: 'codigoModelo', options: { unique: false } },
          { name: 'descripcionModelo', keypath: 'descripcionModelo', options: { unique: false } },
          { name: 'firmaIncuba', keypath: 'firmaIncuba', options: { unique: false } },
          { name: 'firmaPlanta', keypath: 'firmaPlanta', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle1', keypath: 'txRegistroEquipoDetalle1', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle2', keypath: 'txRegistroEquipoDetalle2', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle2NoPredeterminado',
          keypath: 'txRegistroEquipoDetalle2NoPredeterminado', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle3', keypath: 'txRegistroEquipoDetalle3', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle4', keypath: 'txRegistroEquipoDetalle4', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle5', keypath: 'txRegistroEquipoDetalle5', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle6', keypath: 'txRegistroEquipoDetalle6', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle6Repuestos', keypath: 'txRegistroEquipoDetalle6Repuestos', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle7', keypath: 'txRegistroEquipoDetalle7', options: { unique: false } },
          { name: 'flgMigrado', keypath: 'flgMigrado', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_SEGMENU,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idMenu', keypath: 'IdRepuestoPorModelo', options: { unique: true } },
          { name: 'descripcionTitulo', keypath: 'codigoModelo', options: { unique: false } },
          { name: 'icono', keypath: 'CodigoRepuesto', options: { unique: false } },
          { name: 'url', keypath: 'descripcion', options: { unique: false } },
          { name: 'nroNivel', keypath: 'FlgPredeterminado', options: { unique: false } },
          { name: 'flgActivo', keypath: 'FlgAccesorio', options: { unique: false } },
          { name: 'idMenuPadre', keypath: 'FlgAccesorio', options: { unique: false } },
          { name: 'flgChildren', keypath: 'FlgAccesorio', options: { unique: false } },
          { name: 'nombreFormulario', keypath: 'FlgAccesorio', options: { unique: false } },
          { name: 'listOpcion', keypath: 'FlgAccesorio', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTCALIDAD,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idCalidad', keypath: 'idCalidad', options: { unique: true } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
          { name: 'rangoInicial', keypath: 'rangoInicial', options: { unique: false } },
          { name: 'rangoFinal', keypath: 'rangoFinal', options: { unique: false } },
          { name: 'color', keypath: 'color', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idExamenFisico', keypath: 'idExamenFisico', options: { unique: false } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'descripcionEmpresa', keypath: 'descripcionEmpresa', options: { unique: false } },
          { name: 'unidadPlanta', keypath: 'unidadPlanta', options: { unique: false } },
          { name: 'fecRegistro', keypath: 'fecRegistro', options: { unique: false } },
          { name: 'fecHoraRegistro', keypath: 'fecHoraRegistro', options: { unique: false } },
          { name: 'responsableInvetsa', keypath: 'responsableInvetsa', options: { unique: false } },
          { name: 'responsablePlanta', keypath: 'responsablePlanta', options: { unique: false } },
          { name: 'numeroNacedora', keypath: 'numeroNacedora', options: { unique: false } },
          { name: 'lote', keypath: 'lote', options: { unique: false } },
          { name: 'pesoPromedio', keypath: 'pesoPromedio', options: { unique: false } },
          { name: 'edadReproductora', keypath: 'edadReproductora', options: { unique: false } },
          { name: 'sexo', keypath: 'sexo', options: { unique: false } },
          { name: 'lineaGenetica', keypath: 'lineaGenetica', options: { unique: false } },
          { name: 'calificacion', keypath: 'calificacion', options: { unique: false } },
          { name: 'idCalidad', keypath: 'idCalidad', options: { unique: false } },
          { name: 'descripcionCalidad', keypath: 'descripcionCalidad', options: { unique: false } },
          { name: 'firmaInvetsa', keypath: 'firmaInvetsa', options: { unique: false } },
          { name: 'firmaPlanta', keypath: 'firmaPlanta', options: { unique: false } },
          { name: 'uniformidad', keypath: 'uniformidad', options: { unique: false } },
          { name: 'listDetalleNew', keypath: 'listDetalleNew', options: { unique: false } },
          { name: 'listDetalleFotos', keypath: 'listDetalleFotos', options: { unique: false } },
          { name: 'listDetalleResumen', keypath: 'listDetalleResumen', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO_DETALLE,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'numeroPollitos', keypath: 'numeroPollitos', options: { unique: false } },
          { name: 'idProceso', keypath: 'idProceso', options: { unique: false } },
          { name: 'descripcionProceso', keypath: 'descripcionProceso', options: { unique: false } },
          { name: 'idProcesoDetalle', keypath: 'idProcesoDetalle', options: { unique: false } },
          { name: 'id1', keypath: 'id1', options: { unique: false } },
          { name: 'descripcion1', keypath: 'descripcion1', options: { unique: false } },
          { name: 'id2', keypath: 'id2', options: { unique: false } },
          { name: 'descripcion2', keypath: 'descripcion2', options: { unique: false } },
          { name: 'factor', keypath: 'factor', options: { unique: false } },
          { name: 'valor', keypath: 'valor', options: { unique: false } },
          { name: 'orden', keypath: 'orden', options: { unique: false } },
          { name: 'valorDefault', keypath: 'valorDefault', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_SOCIEDAD,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'IdDataBase', keypath: 'IdDataBase', options: { unique:true } },
          { name: 'DescripcionDataBase', keypath: 'DescripcionDataBase', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSBOQUILLA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idBoquilla', keypath: 'idBoquilla', options: { unique:true } },
          { name: 'descripcionBoquilla', keypath: 'descripcionBoquilla', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSPROCESOSPRAY,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idProcesoSpray', keypath: 'idProcesoSpray', options: { unique:true } },
          { name: 'descripcionProcesoSpray', keypath: 'descripcionProcesoSpray', options: { unique: false } },
          { name: 'valor', keypath: 'valor', options: { unique: false } },
          { name: 'idProcesoAgrupador', keypath: 'idProcesoAgrupador', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSPROCESODETALLESPRAY,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idProcesoDetalleSpray', keypath: 'idProcesoDetalleSpray', options: { unique:true } },
          { name: 'idProcesoSpray', keypath: 'idProcesoSpray', options: { unique: false } },
          { name: 'descripcionProcesoSpray', keypath: 'descripcionProcesoSpray', options: { unique: false } },
          { name: 'valor', keypath: 'valor', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSVACUNA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idVacuna', keypath: 'idVacuna', options: { unique:true } },
          { name: 'descripcionVacuna', keypath: 'descripcionVacuna', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idVacunacionSpray', keypath: 'idVacunacionSpray', options: { unique:false } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'descripcionEmpresa', keypath: 'descripcionEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } },
          { name: 'descripcionPlanta', keypath: 'descripcionPlanta', options: { unique: false } },
          { name: 'unidad', keypath: 'unidad', options: { unique: false } },
          { name: 'fecRegistro', keypath: 'fecRegistro', options: { unique: false } },
          { name: 'fecHoraRegistro', keypath: 'fecHoraRegistro', options: { unique: false } },
          { name: 'responsableInvetsa', keypath: 'responsableInvetsa', options: { unique: false } },
          { name: 'responsableIncubadora', keypath: 'responsableIncubadora', options: { unique: false } },
          { name: 'observacionInvetsa', keypath: 'observacionInvetsa', options: { unique: false } },
          { name: 'observacionPlanta', keypath: 'observacionPlanta', options: { unique: false } },
          { name: 'observacionOtros', keypath: 'observacionOtros', options: { unique: false } },
          { name: 'promedioPollos', keypath: 'promedioPollos', options: { unique: false } },
          { name: 'responsablePlanta', keypath: 'responsablePlanta', options: { unique: false } },
          { name: 'firmaInvetsa', keypath: 'firmaInvetsa', options: { unique: false } },
          { name: 'firmaPlanta', keypath: 'firmaPlanta', options: { unique: false } },
          { name: 'flgCerrado', keypath: 'flgCerrado', options: { unique: false } },
          { name: 'idUsuarioCierre', keypath: 'idUsuarioCierre', options: { unique: false } },
          { name: 'fecCierre', keypath: 'fecCierre', options: { unique: false } },
          { name: 'emailFrom', keypath: 'emailFrom', options: { unique: false } },
          { name: 'emailTo', keypath: 'emailTo', options: { unique: false } },
          { name: 'nombreArchivo', keypath: 'nombreArchivo', options: { unique: false } },
          { name: 'usuarioCierre', keypath: 'usuarioCierre', options: { unique: false } },
          { name: 'usuarioCreacion', keypath: 'usuarioCreacion', options: { unique: false } },
          { name: 'listarTxVacunacionSprayDetalle', keypath: 'listarTxVacunacionSprayDetalle', options: { unique: false } },
          { name: 'listarTxVacunacionSprayFotos', keypath: 'listarTxVacunacionSprayFotos', options: { unique: false } },
          { name: 'listarTxVacunacionSprayMaquina', keypath: 'listarTxVacunacionSprayMaquina', options: { unique: false } },
          { name: 'listarTxVacunacionSprayVacuna', keypath: 'listarTxVacunacionSprayVacuna', options: { unique: false } },
          { name: 'listarTxVacunacionSprayResultado', keypath: 'listarTxVacunacionSprayResultado', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSAGUJA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idAguja', keypath: 'idAguja', options: { unique:true } },
          { name: 'descripcionAguja', keypath: 'descripcionAguja', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSINDICEEFICIENCIA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idIndiceEficiencia', keypath: 'idIndiceEficiencia', options: { unique:true } },
          { name: 'descripcionIndiceEficiencia', keypath: 'descripcionIndiceEficiencia', options: { unique: false } },
          { name: 'rangoInicial', keypath: 'rangoInicial', options: { unique: false } },
          { name: 'rangoFinal', keypath: 'rangoFinal', options: { unique: false } },
          { name: 'puntaje', keypath: 'puntaje', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSIRREGULARIDAD,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idIrregularidad', keypath: 'idIrregularidad', options: { unique:true } },
          { name: 'descripcionIrregularidad', keypath: 'descripcionIrregularidad', options: { unique: false } },
          { name: 'valor', keypath: 'valor', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSPROCESOSUBCUTANEA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idProcesoSubCutanea', keypath: 'idProcesoSubCutanea', options: { unique:true } },
          { name: 'descripcionProcesoSubCutanea', keypath: 'descripcionProcesoSubCutanea', options: { unique: false } },
          { name: 'valor', keypath: 'valor', options: { unique: false } },
          { name: 'idProcesoAgrupador', keypath: 'idProcesoAgrupador', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSPROCESODETALLESUBCUTANEA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idProcesoDetalleSubCutanea', keypath: 'idProcesoDetalleSubCutanea', options: { unique:true } },
          { name: 'idProcesoSubCutanea', keypath: 'idProcesoSubCutanea', options: { unique: false } },
          { name: 'descripcionProcesoSubCutanea', keypath: 'descripcionProcesoSubCutanea', options: { unique: false } },
          { name: 'valor', keypath: 'valor', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idVacunacionSubCutanea', keypath: 'idVacunacionSubCutanea', options: { unique:false } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEANEW,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idVacunacionSubCutanea', keypath: 'idVacunacionSubCutanea', options: { unique:false } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAYNEW,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idVacunacionSpray', keypath: 'idVacunacionSpray', options: { unique:false } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_TXSIM,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'idSIM', keypath: 'idSIM', options: { unique:false } },
          { name: 'codigoEmpresa', keypath: 'codigoEmpresa', options: { unique: false } },
          { name: 'codigoPlanta', keypath: 'codigoPlanta', options: { unique: false } }
        ]
      }
    ]
}