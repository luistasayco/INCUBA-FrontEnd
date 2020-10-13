import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IObservableLocal } from '../interface/observable-local.interface';
import { FunctionDBLocalService } from '../../modulo-base-datos-local/services/function-dblocal.service';


@Injectable({
  providedIn: 'root'
})
export class SincronizacionService {

  constructor(private functionDBLocalService: FunctionDBLocalService) { }

  public getSomethingFromAnAPI(ids: IObservableLocal[]): any {
    return from(ids)
    .pipe(
      mergeMap (id => id.observable)
    );
  }

  delayedObs(data: any, name: string) {
   return new Observable (d => {
    d.next();
    d.complete();
   });
  }

}
