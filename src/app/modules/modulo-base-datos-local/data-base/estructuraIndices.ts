import {IIndice} from '../interface/indice.interface';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';

export class IndiceCrear {

    public static indices: IIndice[] = [];

    public static armarIndices(version: number): IIndice[] {

        this.indices = [];
        let indice: IIndice;

        if ( version === 1 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSTEMPRESA,
                nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }
        if ( version === 2 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSTPLANTA,
                nombreIndice: 'idxcodigoEmpresa', campoIndice: 'codigoEmpresa', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_MSTPLANTA,
                nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }
        if ( version === 3 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSTMODELO,
                nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }
        if ( version === 4 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
                nombreIndice: 'idxidRegistroEquipo', campoIndice: 'idRegistroEquipo', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
                nombreIndice: 'idxfecRegistro', campoIndice: 'fecRegistro', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
                nombreIndice: 'idxcodigoEmpresa', campoIndice: 'codigoEmpresa', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
                nombreIndice: 'idxcodigoPlanta', campoIndice: 'codigoPlanta', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
                nombreIndice: 'idxcodigoModelo', campoIndice: 'codigoModelo', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO,
                nombreIndice: 'idxflgMigrado', campoIndice: 'flgMigrado', unico: false  };
        }

        if ( version === 5 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_SEGMENU,
                nombreIndice: 'idxidMenu', campoIndice: 'idMenu', unico: true  };
            indice = { tabla: ConstantesTablasIDB._TABLA_SEGMENU,
                nombreIndice: 'idxnombreFormulario', campoIndice: 'nombreFormulario', unico: false  };
        }

        if ( version === 6 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO,
                nombreIndice: 'idxidExamenFisico', campoIndice: 'idExamenFisico', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO,
                nombreIndice: 'idxcodigoEmpresa', campoIndice: 'codigoEmpresa', unico: false  };
        }

        if ( version === 7 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSTCALIDAD,
                nombreIndice: 'idxidCalidad', campoIndice: 'idCalidad', unico: true  };
            indice = { tabla: ConstantesTablasIDB._TABLA_MSTCALIDAD,
                nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }

        if ( version === 8 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO_DETALLE,
                nombreIndice: 'idxnumeroPollitos', campoIndice: 'numeroPollitos', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXEXAMENFISICOPOLLITO_DETALLE,
                nombreIndice: 'idxidProceso', campoIndice: 'idProceso', unico: false  };
        }

        if ( version === 9 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_SOCIEDAD,
                nombreIndice: 'idxidDataBase', campoIndice: 'IdDataBase', unico: false  };
        }

        if ( version === 10 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSBOQUILLA,
                nombreIndice: 'idxidBoquilla', campoIndice: 'idBoquilla', unico: false  };
        }

        if ( version === 11 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSPROCESOSPRAY,
                nombreIndice: 'idxidProcesoSpray', campoIndice: 'idProcesoSpray', unico: false  };
        }

        if ( version === 12 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSPROCESODETALLESPRAY,
                nombreIndice: 'idxidProcesoDetalleSpray', campoIndice: 'idProcesoDetalleSpray', unico: false  };
        }

        if ( version === 13 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSVACUNA,
                nombreIndice: 'idVacuna', campoIndice: 'idVacuna', unico: false  };
        }

        if ( version === 14 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY,
                nombreIndice: 'idxidVacunacionSpray', campoIndice: 'idVacunacionSpray', unico: false  };
            indice = { tabla: ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAY,
                nombreIndice: 'idxfecHoraRegistro', campoIndice: 'fecHoraRegistro', unico: false  };
        }

        if ( version === 15 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSAGUJA,
                nombreIndice: 'idAguja', campoIndice: 'idAguja', unico: false  };
        }

        if ( version === 16 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSINDICEEFICIENCIA,
                nombreIndice: 'idIndiceEficiencia', campoIndice: 'idIndiceEficiencia', unico: false  };
        }

        if ( version === 17 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSIRREGULARIDAD,
                nombreIndice: 'idIrregularidad', campoIndice: 'idIrregularidad', unico: false  };
        }

        if ( version === 18 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSPROCESOSUBCUTANEA,
                nombreIndice: 'idProcesoSubCutanea', campoIndice: 'idProcesoSubCutanea', unico: false  };
        }

        if ( version === 19 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_MSPROCESODETALLESUBCUTANEA,
                nombreIndice: 'idProcesoDetalleSubCutanea', campoIndice: 'idProcesoDetalleSubCutanea', unico: false  };
        }

        if ( version === 20 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEA,
                nombreIndice: 'idVacunacionSubCutanea', campoIndice: 'idVacunacionSubCutanea', unico: false  };
        }

        if ( version === 21 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXVACUNACIONSUBCUTANEANEW,
                nombreIndice: 'idVacunacionSubCutanea', campoIndice: 'idVacunacionSubCutanea', unico: false  };
        }

        if ( version === 22 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXVACUNACIONSPRAYNEW,
                nombreIndice: 'idyidVacunacionSpray', campoIndice: 'idVacunacionSpray', unico: false  };
        }

        if ( version === 23 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXSIM,
                nombreIndice: 'idySIM', campoIndice: 'idSIM', unico: false  };
        }

        if ( version === 24 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXSINMI,
                nombreIndice: 'idySINMI', campoIndice: 'idSINMI', unico: false  };
        }

        if ( version === 25 ) {
            indice = { tabla: ConstantesTablasIDB._TABLA_TXSINMI_DETALLE_NEW,
                nombreIndice: 'idySINMIDetalle', campoIndice: 'idSINMIDetalle', unico: false  };
        }
        
        return this.indices;
    }
}