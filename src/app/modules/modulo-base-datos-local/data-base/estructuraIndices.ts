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

        return this.indices;
    }
}