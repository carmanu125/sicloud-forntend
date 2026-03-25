import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoList } from './presupuesto-list';

describe('PresupuestoList', () => {
  let component: PresupuestoList;
  let fixture: ComponentFixture<PresupuestoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresupuestoList],
    }).compileComponents();

    fixture = TestBed.createComponent(PresupuestoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
