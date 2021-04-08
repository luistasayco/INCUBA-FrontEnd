export class TxSIMLesionesModel {
    idSIMLesiones: number;
    idSIM: number;
    lesionesDeudemo: string;
    lesionesIntestinoMedio: string;
    lesionesHigado: string;

    constructor() {
        this.idSIMLesiones = 0;
        this.idSIM = 0;
        this.lesionesDeudemo = '';
        this.lesionesIntestinoMedio = '';
        this.lesionesHigado = '';
    }
}