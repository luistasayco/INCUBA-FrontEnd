import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CifrarDataService {

  private tokenFromUI = '123456$#@$^@1INV';

  encrypt(request: any): any {
    let vkey = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let viv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(request), vkey,
    {
        keySize: 128 / 8,
        iv: viv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decrypt(requestEncrypted: any): any {
    let vkey = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let viv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    var decrypted = CryptoJS.AES.decrypt(
      requestEncrypted, vkey, {
        keySize: 128 / 8,
        iv: viv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
