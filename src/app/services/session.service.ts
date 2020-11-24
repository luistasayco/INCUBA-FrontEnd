import { Injectable } from '@angular/core';
import { CifrarDataService } from './cifrar-data.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cifrarDataService: CifrarDataService) {}

  /**
   * Cifrado set session storage item
   */
  setItemEncrypt(key: string, value: any) {
    // Obtenemos el dato encriptado
    let valueEncrypt = this.cifrarDataService.encrypt(value);
    this.setItem(key, valueEncrypt);
  }
  /**
   * Cifrado get session storage item
   */
  getItemDecrypt(key: string) {
    // Obtenemos el dato encriptado
    let value = this.getItem(key);
    // console.log(key, value);
    let valueEncrypt = this.cifrarDataService.decrypt(value);
    return valueEncrypt;
  }

  /**
   * set session storage item
   */
  setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * get session storage item
   */
  getItem(key: string): any {
    let value = sessionStorage.getItem(key);
    return JSON.parse(value);
  }

  /**
   * remove session storage item
   */
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  /**
   * remove all session storage items
   */
  clear() {
      sessionStorage.clear();
  }
}
