import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

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
