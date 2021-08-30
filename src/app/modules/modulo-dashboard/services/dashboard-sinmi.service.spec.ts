import { TestBed } from '@angular/core/testing';

import { DashboardSINMIService } from './dashboard-sinmi.service';

describe('DashboardSINMIService', () => {
  let service: DashboardSINMIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSINMIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
