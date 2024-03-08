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

  it('should assign values to variables, if firstSystem === Horse Power & then convert HorsePower to Kilowatt'), () => {
    component.firstSystem = 'Horse Power';
    component.secondSystem = 'Kilowatt';
    component.firstValue = 10;
    component.horsePowerToKilowatt = 0.7457;
    component.secondValue = 0;

    component.powerConversion();

    expect(component.iconUnit).toEqual('Kw');
    expect(component.iconFirstAddition).toEqual(1);
    expect(component.iconName).toEqual(component.kilowattIcon);
    expect(component.iconValue).toEqual(1);
    expect(component.displayIconConversionRate).toEqual(1);
    expect(component.displayPowerComponent).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.horsePowerToKilowatt);
    expect(component.showPowerKey).toBeTrue();
  };

  it('should assign value to variables, if firstSystem === (anythingElse) & then convert Kilowatt to HorsePower', () => {
    component.firstSystem = 'Kilowatt';
    component.secondSystem = 'Horse Power';
    component.firstValue = 50;
    component.kilowattToHorsePower = 1.341;
    component.secondValue = 0;

    component.powerConversion();

    expect(component.iconUnit).toEqual('Hp');
    expect(component.iconFirstAddition).toEqual(1);
    expect(component.iconName).toEqual(component.horsepowerIcon);
    expect(component.iconValue).toEqual(1);
    expect(component.displayIconConversionRate).toEqual(1);
    expect(component.displayPowerComponent).toBeTrue();
  });

  it('should console log an error, cannot convert Horse Power to Horse Power', () => {
    component.firstSystem = 'Horse Power';
    component.secondSystem = 'Horse Power';
    
    component.powerConversion();

    expect(console.log).toEqual('Cannot convert to the same unit.');
    expect(window.alert).toEqual('Cannot convert to the same unit. Please choose a different unit.');
  });

  it('should console log an errror, cannot convert Kilowatt to Kilowatt', () => {
    component.firstSystem = 'Kilowatt';
    component.secondSystem = 'Kilowatt';

    component.powerConversion();

    expect(console.log).toEqual('Cannot convert to the same unit.');
    expect(window.alert).toEqual('Cannot convert to the same unit. Please choose a different unit.');
  });

  
});
