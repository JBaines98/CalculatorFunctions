import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionButtonComponent } from './function-button.component';

describe('FunctionButtonComponent', () => {
  let component: FunctionButtonComponent;
  let fixture: ComponentFixture<FunctionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionButtonComponent]
    });
    fixture = TestBed.createComponent(FunctionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
