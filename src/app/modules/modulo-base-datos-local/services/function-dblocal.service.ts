import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionDBLocalService {

  constructor( private dbService: NgxIndexedDBService ) { }

  createEnDBLocalDesdeServidor(nameTabla: string, registros: any[]) {
    if (!registros) { return; }

    const observadorBorrar = new Observable( observer => {
      this.dbService.getAll(nameTabla)
      .subscribe((data) => {
        if (data) {
          data.forEach( delItem => {
            this.dbService.delete( nameTabla, delItem.id);
          });
          observer.next();
          observer.complete();
        } else {
          observer.next();
          observer.complete();
        }
      });
    });

    observadorBorrar.subscribe(respBorrado => {
      registros.forEach(item => {
        this.dbService.add(nameTabla, item)
        .subscribe( (data) => {
        },
        error => {
          console.log(`error ${nameTabla}`, item);
        });
      });
    });
  }

  createTableTrxEnDBLocalDesdeServidor(nameTabla: string, registro: any) {
    if (!registro) { return; }

    const observadorBorrar = new Observable( observer => {
      this.dbService.getAll(nameTabla)
      .subscribe((data: any) => {
        if (data) {
          let dataFil = [...data].filter(x => x.flgMigrado === 1);

          dataFil.forEach( delItem => {
            this.dbService.delete( nameTabla, delItem.id);
          });
          observer.next();
          observer.complete();
        } else {
          observer.next();
          observer.complete();
        }
      });
    });

    observadorBorrar.subscribe(respBorrado => {
      this.dbService.add(nameTabla, registro)
        .subscribe( (data) => {
        },
        error => {
          console.log(`error ${nameTabla}`, registro);
        });
    });
  }

  setNewRegistro(nameTabla: string, registro: any) {
    return this.dbService.add(nameTabla, registro);
  }

}
