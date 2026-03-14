import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaEdit } from './empresa-edit';

describe('EmpresaEdit', () => {
  let component: EmpresaEdit;
  let fixture: ComponentFixture<EmpresaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
