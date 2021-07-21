import { TestBed } from '@angular/core/testing';

import { DashboardMantenimientoService } from './dashboard-mantenimiento.service';

describe('DashboardMantenimientoService', () => {
  let service: DashboardMantenimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardMantenimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
