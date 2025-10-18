import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoList } from './lancamento-list';

describe('LancamentoList', () => {
  let component: LancamentoList;
  let fixture: ComponentFixture<LancamentoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
