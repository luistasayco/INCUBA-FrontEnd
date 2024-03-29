import * as moment from 'moment';
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
    codigoModelo: string;
    descripcionModelo?: string;
    firmaIncuba?: string;
    firmaPlanta?: string;
    flgCerrado?: boolean;
    responsableIncuba?: string;
    responsablePlanta?: string;
    usuarioCierre?: string;
    idUsuarioCierre?: number;
    fecCierre?: Date;
    usuarioCreacion?: string;
    nombreArchivo?: string;
    jefePlanta?: string;
    observacionesInvetsa?: string;
    observacionesPlanta?: string;

    tipoMantenimiento?: string;
    horaIngreso?: string;
    horaSalida?: string;

    // Varibles para el filtro
    fecRegistroInicio?: Date;
    fecRegistroFin?: Date;

    txRegistroEquipoDetalle1: TxRegistroEquipoDetalle1Model[];
    txRegistroEquipoDetalle2: TxRegistroEquipoDetalle2Model[];
    txRegistroEquipoDetalle2NoPredeterminado: TxRegistroEquipoDetalle2Model[];
    txRegistroEquipoDetalle3: TxRegistroEquipoDetalle3Model[];
    txRegistroEquipoDetalle4: TxRegistroEquipoDetalle4Model[];
    txRegistroEquipoDetalle5: TxRegistroEquipoDetalle5Model[];
    txRegistroEquipoDetalle6: TxRegistroEquipoDetalle6Model[];
    txRegistroEquipoDetalle6NoPredeterminado: TxRegistroEquipoDetalle2Model[];
    txRegistroEquipoDetalle6Repuestos: TxRegistroEquipoDetalle6Model[];
    txRegistroEquipoDetalle7: TxRegistroEquipoDetalle7Model[];
    flgMigrado: boolean;
    flgEnModificacion: boolean;
    
    emailFrom: string;
    emailTo: string;
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
        this.codigoModelo = '';
        this.descripcionEmpresa = '';
        this.firmaIncuba = '';
        this.firmaPlanta = '';
        this.flgCerrado = false;
        this.flgEnModificacion = false;
        this.fecRegistroInicio = null;
        this.fecRegistroFin = null;
        this.responsableIncuba = '';
        this.responsablePlanta = '';
        this.usuarioCierre = '';
        this.idUsuarioCierre = 0;
        this.fecCierre = null;
        this.tipoMantenimiento = null;
        this.horaIngreso = moment().format("HH:mm");
        this.horaSalida = null;
        this.usuarioCreacion = '';
        this.nombreArchivo = '';
        this.jefePlanta = '';
        this.txRegistroEquipoDetalle1 = [];
        this.txRegistroEquipoDetalle2 = [];
        this.txRegistroEquipoDetalle2NoPredeterminado = [];
        this.txRegistroEquipoDetalle3 = [];
        this.txRegistroEquipoDetalle4 = [];
        this.txRegistroEquipoDetalle5 = [];
        this.txRegistroEquipoDetalle6 = [];
        this.txRegistroEquipoDetalle6NoPredeterminado = [];
        this.txRegistroEquipoDetalle6Repuestos = [];
        this.txRegistroEquipoDetalle7 = [];
        this.flgMigrado = false;
        this.emailFrom = '';
        this.emailTo = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}