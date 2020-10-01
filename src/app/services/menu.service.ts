import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';
import { MenuCustomModel } from '../models/menu.model';
import { MenuModel } from '../modules/modulo-seguridad/models/menu.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSource = new Subject<string>();
  private resetSource = new Subject();


    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next();
    }
}
