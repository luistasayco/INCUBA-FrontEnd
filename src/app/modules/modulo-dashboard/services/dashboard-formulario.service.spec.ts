import { TestBed } from '@angular/core/testing';

import { DashboardFormularioService } from './dashboard-formulario.service';

describe('DashboardFormularioService', () => {
  let service: DashboardFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
