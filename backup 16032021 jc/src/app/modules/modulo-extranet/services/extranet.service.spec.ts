import { TestBed } from '@angular/core/testing';

import { ExtranetService } from './extranet.service';

describe('ExtranetService', () => {
  let service: ExtranetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtranetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
