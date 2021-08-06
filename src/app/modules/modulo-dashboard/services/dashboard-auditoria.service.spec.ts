import { TestBed } from '@angular/core/testing';

import { DashboardAuditoriaService } from './dashboard-auditoria.service';

describe('DashboardAuditoriaService', () => {
  let service: DashboardAuditoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAuditoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
