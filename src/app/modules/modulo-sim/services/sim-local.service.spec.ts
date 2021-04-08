import { TestBed } from '@angular/core/testing';

import { SimLocalService } from './sim-local.service';

describe('SimLocalService', () => {
  let service: SimLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
