import { TestBed } from '@angular/core/testing';

import { VacunacionSubcutaneaLocalService } from './vacunacion-subcutanea-local.service';

describe('VacunacionSubcutaneaLocalService', () => {
  let service: VacunacionSubcutaneaLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunacionSubcutaneaLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
