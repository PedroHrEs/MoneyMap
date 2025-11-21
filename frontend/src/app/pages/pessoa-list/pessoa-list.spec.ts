import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaList } from './pessoa-list';

describe('PessoaList', () => {
  let component: PessoaList;
  let fixture: ComponentFixture<PessoaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
