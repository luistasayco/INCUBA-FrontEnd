export class TxSIMIndiceBursalModel {
    idSIMIndiceBursal: number;
    idSIM: number;
    ave: number;
    pesoCorporal: number;
    pesoBursa: number;
    pesoBazo: number;
    pesoTimo: number;
    pesoHigado: number;
    indiceBursal: number;
    indiceTimico: number;
    indiceHepatico: number;
    bursometro: number;
    flgPromedio: boolean;

    constructor() {
        this.idSIMIndiceBursal = 0;
        this.idSIM = 0;
        this.ave = 0;
        this.pesoCorporal = 0;
        this.pesoBursa = 0;
        this.pesoBazo = 0;
        this.pesoTimo = 0;
        this.pesoHigado = 0;
        this.indiceBursal = 0;
        this.indiceTimico = 0;
        this.indiceHepatico = 0;
        this.bursometro = 0;
        this.flgPromedio = false;
    }
}