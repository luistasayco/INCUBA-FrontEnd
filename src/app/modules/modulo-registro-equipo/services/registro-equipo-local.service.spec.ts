import { TestBed } from '@angular/core/testing';

import { RegistroEquipoLocalService } from './registro-equipo-local.service';

describe('RegistroEquipoLocalService', () => {
  let service: RegistroEquipoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEquipoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
