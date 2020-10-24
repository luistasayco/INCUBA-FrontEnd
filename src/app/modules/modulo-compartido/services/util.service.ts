import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  fecha_AAAAMMDD(fecha: string | Date): string {
    const day = new Date(fecha).getDate();
    const month = new Date(fecha).getMonth() + 1;
    const year = new Date(fecha).getFullYear();
    const fechaFinal = `${year}-${month}-${day}`;
    return fechaFinal;
  }

  recortarMensajeApiExito(msg: string): string {
    return msg.split(',')[0];
  }

  fechaApi_POST(): Date {
    var date = new Date();
    var today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return today;
  }
}
