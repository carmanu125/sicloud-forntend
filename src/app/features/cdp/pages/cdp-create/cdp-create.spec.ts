import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpCreate } from './cdp-create';

describe('CdpCreate', () => {
  let component: CdpCreate;
  let fixture: ComponentFixture<CdpCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdpCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(CdpCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
