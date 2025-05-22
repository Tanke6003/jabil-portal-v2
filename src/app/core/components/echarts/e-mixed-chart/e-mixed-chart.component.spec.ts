import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMixedChartComponent } from './e-mixed-chart.component';

describe('EMixedChartComponent', () => {
  let component: EMixedChartComponent;
  let fixture: ComponentFixture<EMixedChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EMixedChartComponent]
    });
    fixture = TestBed.createComponent(EMixedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
