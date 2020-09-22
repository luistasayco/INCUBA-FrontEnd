import { TxRegistroEquipoDetalle1Model } from './tx-registro-equipo-detalle1.model';
import { TxRegistroEquipoDetalle2Model } from './tx-registro-equipo-detalle2.model';
import { TxRegistroEquipoDetalle3Model } from './tx-registro-equipo-detalle3.model';
import { TxRegistroEquipoDetalle4Model } from './tx-registro-equipo-detalle4.model';
import { TxRegistroEquipoDetalle5Model } from './tx-registro-equipo-detalle5.model';
import { TxRegistroEquipoDetalle6Model } from './tx-registro-equipo-detalle6.model';
import { TxRegistroEquipoDetalle7Model } from './tx-registro-equipo-detalle7.model';

export class TxRegistroEquipoModel {
    idRegistroEquipo: number;
    fecRegistro?: Date;
    fecHoraRegistro?: Date;
    codigoEmpresa?: string;
    descripcionEmpresa?: string;
    codigoPlanta?: string;
    descripcionPlanta?: string;
    idModelo: number;
    descripcionModelo?: string;
    firmaIncuba?: string;
    firmaPlanta?: string;

    //Varibles para el filtro
    fecRegistroInicio?: Date;
    fecRegistroFin?: Date;

    txRegistroEquipoDetalle1: TxRegistroEquipoDetalle1Model[];
    txRegistroEquipoDetalle2: TxRegistroEquipoDetalle2Model[];
    txRegistroEquipoDetalle3: TxRegistroEquipoDetalle3Model[];
    txRegistroEquipoDetalle4: TxRegistroEquipoDetalle4Model[];
    txRegistroEquipoDetalle5: TxRegistroEquipoDetalle5Model[];
    txRegistroEquipoDetalle6: TxRegistroEquipoDetalle6Model[];
    txRegistroEquipoDetalle6Repuestos: TxRegistroEquipoDetalle6Model[];
    txRegistroEquipoDetalle7: TxRegistroEquipoDetalle7Model[];

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idRegistroEquipo = 0;
        this.fecRegistro = null;
        this.fecHoraRegistro = null;
        this.codigoEmpresa = '';
        this.descripcionEmpresa = '';
        this.codigoPlanta = '';
        this.descripcionEmpresa = '';
        this.idModelo = 0;
        this.descripcionEmpresa = '';
        this.firmaIncuba = '';
        this.firmaPlanta = '';
        this.fecRegistroInicio = null;
        this.fecRegistroFin = null;

        this.txRegistroEquipoDetalle1 = [];
        this.txRegistroEquipoDetalle2 = [];
        this.txRegistroEquipoDetalle3 = [];
        this.txRegistroEquipoDetalle4 = [];
        this.txRegistroEquipoDetalle5 = [];
        this.txRegistroEquipoDetalle6 = [];
        this.txRegistroEquipoDetalle6Repuestos = [];
        this.txRegistroEquipoDetalle7 = [];

        this.regUsuario = 0;
        this.regEstacion = '';
    }
}