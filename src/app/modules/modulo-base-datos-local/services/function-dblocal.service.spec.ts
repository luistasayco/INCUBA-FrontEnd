import { TestBed } from '@angular/core/testing';

import { FunctionDBLocalService } from './function-dblocal.service';

describe('FunctionDBLocalService', () => {
  let service: FunctionDBLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionDBLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
