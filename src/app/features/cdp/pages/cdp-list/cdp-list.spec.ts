import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpList } from './cdp-list';

describe('CdpList', () => {
  let component: CdpList;
  let fixture: ComponentFixture<CdpList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdpList],
    }).compileComponents();

    fixture = TestBed.createComponent(CdpList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
