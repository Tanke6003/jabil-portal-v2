import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLPAComponent } from './find-lpa.component';

describe('FindLPAComponent', () => {
  let component: FindLPAComponent;
  let fixture: ComponentFixture<FindLPAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindLPAComponent]
    });
    fixture = TestBed.createComponent(FindLPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
