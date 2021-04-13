import { TestBed } from '@angular/core/testing';

import { SinmiLocalService } from './sinmi-local.service';

describe('SinmiLocalService', () => {
  let service: SinmiLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinmiLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
