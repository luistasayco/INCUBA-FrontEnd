import { TestBed } from '@angular/core/testing';

import { EnviarDatosRemotosService } from './enviar-datos-remotos.service';

describe('EnviarDatosRemotosService', () => {
  let service: EnviarDatosRemotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarDatosRemotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
