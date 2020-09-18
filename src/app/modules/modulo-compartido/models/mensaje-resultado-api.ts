export interface IMensajeResultadoApi {
    error?: IErrorMensajeResultadoApi;
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