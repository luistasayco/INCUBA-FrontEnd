import { TestBed } from '@angular/core/testing';

import { LimpiarTablasService } from './limpiar-tablas.service';

describe('LimpiarTablasService', () => {
  let service: LimpiarTablasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimpiarTablasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
