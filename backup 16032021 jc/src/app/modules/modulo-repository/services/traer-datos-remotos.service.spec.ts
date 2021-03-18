import { TestBed } from '@angular/core/testing';

import { TraerDatosRemotosService } from './traer-datos-remotos.service';

describe('TraerDatosRemotosService', () => {
  let service: TraerDatosRemotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDatosRemotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
