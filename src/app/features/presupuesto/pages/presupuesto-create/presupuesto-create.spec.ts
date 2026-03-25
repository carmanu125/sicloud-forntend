import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoCreate } from './presupuesto-create';

describe('PresupuestoCreate', () => {
  let component: PresupuestoCreate;
  let fixture: ComponentFixture<PresupuestoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresupuestoCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(PresupuestoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
