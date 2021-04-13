import { TestBed } from '@angular/core/testing';

import { SinmiService } from './sinmi.service';

describe('SinmiService', () => {
  let service: SinmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
