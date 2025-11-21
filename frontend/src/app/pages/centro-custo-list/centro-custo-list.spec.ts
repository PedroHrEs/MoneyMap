import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCustoList } from './centro-custo-list';

describe('CentroCustoList', () => {
  let component: CentroCustoList;
  let fixture: ComponentFixture<CentroCustoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroCustoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroCustoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
