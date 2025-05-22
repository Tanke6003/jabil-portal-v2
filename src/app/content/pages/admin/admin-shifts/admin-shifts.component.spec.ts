import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShiftsComponent } from './admin-shifts.component';

describe('AdminShiftsComponent', () => {
  let component: AdminShiftsComponent;
  let fixture: ComponentFixture<AdminShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShiftsComponent]
    });
    fixture = TestBed.createComponent(AdminShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
