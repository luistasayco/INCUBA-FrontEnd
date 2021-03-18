export interface IMensajeResultadoApi {
    error?: IErrorMensajeResultadoApi | IMensajeResultadoApiCustom;
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
  }

interface IErrorMensajeResultadoApi {
    ErrorMessage: string;
    StatusCode: number;
  }

 interface IMensajeResultadoApiCustom {
    idRegistro: number;
    nombreEstacion: string;
    resultadoAplicacion: string;
    resultadoCodigo: number;
    resultadoDescripcion: string;
    resultadoMetodo: string;
  } 