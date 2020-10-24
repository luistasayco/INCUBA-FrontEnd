import { Injectable } from '@angular/core';
import { ConstantesTablasIDB } from '../../../constants/constantes-tablas-indexdb';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class LimpiarTablasService {

  constructor(private readonly servicioIndexDB: NgxIndexedDBService) { }

  public depurarTablas() {
    this.limpiarTablaRegistroEquipo(ConstantesTablasIDB._TABLA_TXREGISTROEQUIPO, 'id');
  }

  private limpiarTablaRegistroEquipo(tabla: string, campoID: string) {
    this.servicioIndexDB.getAll(tabla)
    .subscribe(
      resultado => {
        if (resultado) {
          if (resultado.length > 0) {
            resultado = resultado
            .filter(x => x.flgMigrado === true)
            resultado.forEach(element => {
              this.servicioIndexDB.delete(tabla, element.id);
            });
          }
        }
      }
    );
  }
 }
