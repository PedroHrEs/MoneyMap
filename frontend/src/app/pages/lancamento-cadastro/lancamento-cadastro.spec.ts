import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoCadastro } from './lancamento-cadastro';

describe('LancamentoCadastro', () => {
  let component: LancamentoCadastro;
  let fixture: ComponentFixture<LancamentoCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
