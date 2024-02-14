import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDateComponent } from './shared-date.component';

describe('SharedDateComponent', () => {
  let component: SharedDateComponent;
  let fixture: ComponentFixture<SharedDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedDateComponent]
    });
    fixture = TestBed.createComponent(SharedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
