import { Observable } from 'rxjs';

export interface IObservableLocal {
    observable: Observable<any>;
    nombreTabla: string;
  }