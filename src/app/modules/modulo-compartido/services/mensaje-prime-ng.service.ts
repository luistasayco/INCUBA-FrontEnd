import { Injectable } from '@angular/core';
import { Message } from 'primeng';
import { GlobalsConstants } from '../models/globals-constants';
import { IMensajeResultadoApi } from '../models/mensaje-resultado-api';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class MensajePrimeNgService {

  msgs: Message[] = [];
  globalConstants: GlobalsConstants = new GlobalsConstants();
  intervalo;

  constructor(private readonly utils: UtilService) { }

  private onToClearMsg() {
    this.intervalo = setInterval(() => {this.msgs = []; clearInterval(this.intervalo); } , 5000);
  }

  /** SUCCESS */
  public onToExitoMsg(titulo?: string, mensaje?: string | IMensajeResultadoApi) {
    if (typeof mensaje === 'object') {
      this.mensajeApiExitoso(titulo, mensaje);
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'success',
                      summary: titulo ? titulo : this.globalConstants.msgExitoSummary,
                      detail: mensaje ? mensaje : this.globalConstants.msgExitoDetail});
      this.onToClearMsg();
    }
  }

  private mensajeApiExitoso(titulo: string, mensaje?: IMensajeResultadoApi) {
    this.msgs = [];
    this.msgs.push({severity: 'success',
                    summary: titulo ? titulo : this.globalConstants.msgExitoSummary,
                    detail: this.globalConstants.msgExitoDetail});
    this.onToClearMsg();
  }

  /** ERROR */
  public onToErrorMsg(titulo?: string, mensaje?: string | IMensajeResultadoApi) {
    if (typeof mensaje === 'object') {
      this.mensajeApiError(titulo, mensaje);
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error',
                      summary: titulo ? titulo : this.globalConstants.msgErrorSummary,
                      detail: mensaje ? mensaje : 'Ocurrio un error'});
      this.onToClearMsg();
    }
  }

  private mensajeApiError(titulo: string, mensaje?: any) {
    this.msgs = [];
    this.msgs.push({severity: 'error',
                    summary: titulo ? titulo : this.globalConstants.msgErrorSummary,
                    detail:
                      mensaje.error.resultadoDescripcion ? this.utils.recortarMensajeApiExito(mensaje.error.resultadoDescripcion) : 'Ocurrio un error'});
    this.onToClearMsg();
  }

  /** CANCEL */
  public onToInfoMsg(titulo?: string, mensaje?: string | IMensajeResultadoApi) {
    if (typeof mensaje === 'object') {
      this.mensajeApiInformacion(titulo, mensaje);
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'warn',
                      summary: titulo ? titulo : this.globalConstants.msgInfoSummary,
                      detail: mensaje ? mensaje : this.globalConstants.msgInfoDetail});
      this.onToClearMsg();
    }
  }

  private mensajeApiInformacion(titulo: string, mensaje?: IMensajeResultadoApi) {
    this.msgs = [];
    this.msgs.push({severity: 'warn',
                    summary: titulo ? titulo : this.globalConstants.msgInfoSummary,
                    detail: this.globalConstants.msgInfoDetail});
    this.onToClearMsg();
  }

  /** CANCEL */
  public onToCancelMsg(titulo?: string, mensaje?: string | IMensajeResultadoApi) {
    if (typeof mensaje === 'object') {
      this.mensajeApiCancelacion(titulo, mensaje);
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'info',
                      summary: titulo ? titulo : this.globalConstants.msgCancelSummary,
                      detail: mensaje ? mensaje : this.globalConstants.msgCancelDetail});
      this.onToClearMsg();
    }
  }

  private mensajeApiCancelacion(titulo: string, mensaje?: IMensajeResultadoApi) {
    this.msgs = [];
    this.msgs.push({severity: 'info',
                    summary: titulo ? titulo : this.globalConstants.msgCancelSummary,
                    detail: this.globalConstants.msgExitoDetail});
    this.onToClearMsg();
  }

}
