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

  validar_email(email)
  {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  convertirListaEmail(cadenaEmail: string): string[]{
    let miCadena = cadenaEmail;
    let posicion = miCadena.indexOf(';');
    let posiInicio = 0;

    let listDtaemail: string[] = [];

    if (posicion === -1)
    {
      listDtaemail.push(miCadena);
    }

    while (posicion !== -1) {

      let data = miCadena.substr(posiInicio, posicion);
      listDtaemail.push(data);
      miCadena = miCadena.substr(posicion + 1);
      posicion = miCadena.indexOf(';');

      if (posicion === -1)
      {
        listDtaemail.push(miCadena);
      }
    }
    return listDtaemail;
  }

  validaListEmail(email: string): string{

    var lista = this.convertirListaEmail(email);
    let msg = '';

    lista.forEach(x => {
      let validoEmail = this.validar_email(x);
      if (!validoEmail) {
        msg += '/' + x;
      }
    });

    return msg;
  }

  onRedondearDecimal(numero: number, decimales: number): number {
    let isNumero = Number(numero.toFixed(decimales));
    return isNumero;
  }
}
