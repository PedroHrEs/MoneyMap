import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoLancamento } from './extrato-lancamento';

describe('ExtratoLancamento', () => {
  let component: ExtratoLancamento;
  let fixture: ComponentFixture<ExtratoLancamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtratoLancamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratoLancamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
