import { TestBed } from '@angular/core/testing';

import { VacunacionSprayLocalService } from './vacunacion-spray-local.service';

describe('VacunacionSprayLocalService', () => {
  let service: VacunacionSprayLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunacionSprayLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
