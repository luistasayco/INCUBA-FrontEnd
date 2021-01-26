import { TestBed } from '@angular/core/testing';

import { VacunacionSprayService } from './vacunacion-spray.service';

describe('VacunacionSprayService', () => {
  let service: VacunacionSprayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunacionSprayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
