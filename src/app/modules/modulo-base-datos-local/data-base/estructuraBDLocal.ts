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
          { name: 'IdMantenimientoPorModelo', keypath: 'IdMantenimientoPorModelo', options: { unique: true } },
          { name: 'CodigoModelo', keypath: 'CodigoModelo', options: { unique: false } },
          { name: 'IdMantenimiento', keypath: 'IdMantenimiento', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
        ]
      },
      {
        store: ConstantesTablasIDB._TABLA_MSTREPUESTOPORMODELO,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'IdRepuestoPorModelo', keypath: 'IdRepuestoPorModelo', options: { unique: true } },
          { name: 'codigoModelo', keypath: 'codigoModelo', options: { unique: false } },
          { name: 'CodigoRepuesto', keypath: 'CodigoRepuesto', options: { unique: false } },
          { name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
          { name: 'FlgPredeterminado', keypath: 'FlgPredeterminado', options: { unique: false } },
          { name: 'FlgAccesorio', keypath: 'FlgAccesorio', options: { unique: false } }
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
          { name: 'txRegistroEquipoDetalle2NoPredeterminado', keypath: 'txRegistroEquipoDetalle2NoPredeterminado', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle3', keypath: 'txRegistroEquipoDetalle3', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle4', keypath: 'txRegistroEquipoDetalle4', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle5', keypath: 'txRegistroEquipoDetalle5', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle6', keypath: 'txRegistroEquipoDetalle6', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle6Repuestos', keypath: 'txRegistroEquipoDetalle6Repuestos', options: { unique: false } },
          { name: 'txRegistroEquipoDetalle7', keypath: 'txRegistroEquipoDetalle7', options: { unique: false } },
          { name: 'flgMigrado', keypath: 'flgMigrado', options: { unique: false } }
        ]
      }
    ]
}