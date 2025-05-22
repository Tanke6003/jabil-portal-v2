import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscrepanciesComponent } from './admin-discrepancies.component';

describe('AdminDiscrepanciesComponent', () => {
  let component: AdminDiscrepanciesComponent;
  let fixture: ComponentFixture<AdminDiscrepanciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDiscrepanciesComponent]
    });
    fixture = TestBed.createComponent(AdminDiscrepanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
