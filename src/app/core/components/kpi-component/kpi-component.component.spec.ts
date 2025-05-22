import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiComponentComponent } from './kpi-component.component';

describe('KpiComponentComponent', () => {
  let component: KpiComponentComponent;
  let fixture: ComponentFixture<KpiComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KpiComponentComponent]
    });
    fixture = TestBed.createComponent(KpiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
