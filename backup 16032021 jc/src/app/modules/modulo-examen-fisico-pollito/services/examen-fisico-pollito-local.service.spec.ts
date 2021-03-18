import { TestBed } from '@angular/core/testing';

import { ExamenFisicoPollitoLocalService } from './examen-fisico-pollito-local.service';

describe('ExamenFisicoPollitoLocalService', () => {
  let service: ExamenFisicoPollitoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenFisicoPollitoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
