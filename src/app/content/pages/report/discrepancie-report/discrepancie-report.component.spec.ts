import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepancieReportComponent } from './discrepancie-report.component';

describe('DiscrepancieReportComponent', () => {
  let component: DiscrepancieReportComponent;
  let fixture: ComponentFixture<DiscrepancieReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscrepancieReportComponent]
    });
    fixture = TestBed.createComponent(DiscrepancieReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
