import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoList } from './banco-list';

describe('BancoList', () => {
  let component: BancoList;
  let fixture: ComponentFixture<BancoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
