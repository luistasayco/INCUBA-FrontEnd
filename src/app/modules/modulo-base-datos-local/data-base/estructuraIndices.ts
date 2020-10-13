import {IIndice} from '../interface/indice.interface';

export class IndiceCrear {

    public static indices: IIndice[] = [];

    public static armarIndices(version: number): IIndice[] {

        this.indices = [];
        let indice: IIndice;

        if ( version === 1 ) {
            indice = { tabla: 'empresa', nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }
        if ( version === 2 ) {
            indice = { tabla: 'planta', nombreIndice: 'idxcodigoEmpresa', campoIndice: 'codigoEmpresa', unico: false  };
            indice = { tabla: 'planta', nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }
        if ( version === 3 ) {
            indice = { tabla: 'modelo', nombreIndice: 'idxdescripcion', campoIndice: 'descripcion', unico: false  };
        }
        if ( version === 4 ) {
            indice = { tabla: 'trxRegistroEquipo', nombreIndice: 'idxidRegistroEquipo', campoIndice: 'idRegistroEquipo', unico: false  };
            indice = { tabla: 'trxRegistroEquipo', nombreIndice: 'idxfecRegistro', campoIndice: 'fecRegistro', unico: false  };
            indice = { tabla: 'trxRegistroEquipo', nombreIndice: 'idxcodigoEmpresa', campoIndice: 'codigoEmpresa', unico: false  };
            indice = { tabla: 'trxRegistroEquipo', nombreIndice: 'idxcodigoPlanta', campoIndice: 'codigoPlanta', unico: false  };
            indice = { tabla: 'trxRegistroEquipo', nombreIndice: 'idxcodigoModelo', campoIndice: 'codigoModelo', unico: false  };
            indice = { tabla: 'trxRegistroEquipo', nombreIndice: 'idxflgMigrado', campoIndice: 'flgMigrado', unico: false  };
        }

        return this.indices;
    }
}