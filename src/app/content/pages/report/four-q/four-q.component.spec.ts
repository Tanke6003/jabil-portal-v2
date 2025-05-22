import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourQComponent } from './four-q.component';

describe('FourQComponent', () => {
  let component: FourQComponent;
  let fixture: ComponentFixture<FourQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FourQComponent]
    });
    fixture = TestBed.createComponent(FourQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
