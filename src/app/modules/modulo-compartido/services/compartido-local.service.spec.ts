import { TestBed } from '@angular/core/testing';

import { CompartidoLocalService } from './compartido-local.service';

describe('CompartidoLocalService', () => {
  let service: CompartidoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartidoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
