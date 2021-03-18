import { TestBed } from '@angular/core/testing';

import { RegistroEquipoService } from './registro-equipo.service';

describe('RegistroEquipoService', () => {
  let service: RegistroEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
