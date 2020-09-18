import { TestBed } from '@angular/core/testing';

import { ExamenFisicoPollitoService } from './examen-fisico-pollito.service';

describe('ExamenFisicoPollitoService', () => {
  let service: ExamenFisicoPollitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenFisicoPollitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
