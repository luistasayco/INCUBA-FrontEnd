export class TxSIMRespiratorioModel {
    idSIMRespiratorio: number;
    idSIM: number;
    ave: number;
    sacosAereos: number;
    cornetes: number;
    glotis: number;
    traquea: number;
    pulmones: number;
    rinones: number;
    placaPeyer: number;
    flgGradoLesion: boolean;

    constructor() {
        this.idSIMRespiratorio = 0;
        this.idSIM = 0;
        this.ave = 0;
        this.sacosAereos = 0;
        this.cornetes = 0;
        this.glotis = 0;
        this.traquea = 0;
        this.pulmones = 0;
        this.rinones = 0;
        this.placaPeyer = 0;
        this.flgGradoLesion = false;
    }
}