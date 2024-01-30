import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerConverterComponent } from './power-converter.component';

describe('PowerConverterComponent', () => {
  let component: PowerConverterComponent;
  let fixture: ComponentFixture<PowerConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PowerConverterComponent]
    });
    fixture = TestBed.createComponent(PowerConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
