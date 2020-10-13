import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PlantaModel } from '../models/planta.model';

@Injectable({
  providedIn: 'root'
})
export class CompartidoLocalService {

  constructor(private dbService: NgxIndexedDBService) { }

  // title:  Metodos para Empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getEmpresa() {
    return this.dbService.getAll('mstEmpresa');
  }
  // title:  Metodos para obtener planta por empresa
  // Author: Luis Tasayco
  // Date:   07/09/2020
  getPlantaPorEmpresa() {
    return this.dbService.getAll ('mstPlanta');
  }
}
