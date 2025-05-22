import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLPAComponent } from './add-update-lpa.component';

describe('AddUpdateLPAComponent', () => {
  let component: AddUpdateLPAComponent;
  let fixture: ComponentFixture<AddUpdateLPAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateLPAComponent]
    });
    fixture = TestBed.createComponent(AddUpdateLPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
