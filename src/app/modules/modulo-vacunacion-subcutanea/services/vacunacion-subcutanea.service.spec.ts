import { TestBed } from '@angular/core/testing';

import { VacunacionSubcutaneaService } from './vacunacion-subcutanea.service';

describe('VacunacionSubcutaneaService', () => {
  let service: VacunacionSubcutaneaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunacionSubcutaneaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
