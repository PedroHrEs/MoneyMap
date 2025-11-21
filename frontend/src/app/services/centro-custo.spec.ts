import { TestBed } from '@angular/core/testing';

import { CentroCusto } from './centro-custo';

describe('CentroCusto', () => {
  let service: CentroCusto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroCusto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
