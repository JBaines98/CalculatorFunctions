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

  it('should assign values to variables, if firstSystem = Horse Power & then convert HorsePower to Kilowatt'), () => {
    component.firstSystem = 'Horse Power';
    component.secondSystem = 'Kilowatt';
    component.firstValue = 10;
    component.horsePowerToKilowatt = 1.341;
  }
});
