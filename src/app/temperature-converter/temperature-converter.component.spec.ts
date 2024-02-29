import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureConverterComponent } from './temperature-converter.component';

describe('TemperatureConverterComponent', () => {
  let component: TemperatureConverterComponent;
  let fixture: ComponentFixture<TemperatureConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureConverterComponent]
    });
    fixture = TestBed.createComponent(TemperatureConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should change isCelcius variable to true, when fromSystem = Celcius and convert Celcius to Fahrenheit', () => {
    component.calculation = {};
    component.fromSystem = 'Celcius';
    component.isCelcius = null;
    component.fromValue = 1;
    component.toValue = 0;
    component.showHotOrCold = '';
    component.toSystem = 'Fahrenheit';
    component.celciusToTenDegrees = 0.1;
    component.displayTenDegreeRate = 0;
    component.tenDegreeValue = 0;
    component.iconDisplayerValue = 0;
    component.tenDegreeIconName = '';
    component.tenDegreeIconNameCold = 'fa-solid fa-snowflake';

    component.temperatureConversion();

    expect(component.isCelcius).toBeTrue();
    expect(component.showHotOrCold).toEqual('coldCelcius');
    expect(component.toValue).toEqual(33.8);
    expect(component.tenDegreeIconName).toEqual(component.tenDegreeIconNameCold);
  });


  it('should change isCelcius variable to false, when fromSystem !== Celcius and convert Fahrenheit to Celcius', () => {
    component.calculation = {};
    component.fromSystem = 'Fahrenheit';
    component.isCelcius = null;
    component.fromValue = 40;
    component.toValue = 0;
    component.showHotOrCold = '';
    component.toSystem = 'Celcius';
    component.fahrenheitToTenDegrees = 3.38;
    component.displayTenDegreeRate = 0;
    component.tenDegreeValue = 0;
    component.iconDisplayerValue = 0;
    component.tenDegreeIconName = '';
    component.tenDegreeIconNameCold = 'fa-solid fa-snowflake';

    component.temperatureConversion();

    expect(component.isCelcius).toBeFalse();
    expect(component.showHotOrCold).toEqual('coldFahrenheit');
    expect(component.toValue).toEqual(4.4);
    expect(component.tenDegreeIconName).toEqual(component.tenDegreeIconNameCold);
  });


  it('should convert Celcius to Fahrenheit in hot temperatures', () => {
    component.calculation = {};
    component.fromSystem = 'Celcius';
    component.isCelcius = null;
    component.fromValue = 25;
    component.toValue = 0;
    component.showHotOrCold = '';
    component.toSystem = 'Fahrenheit';
    component.celciusToTenDegrees = 0.1;
    component.displayTenDegreeRate = 0;
    component.tenDegreeValue = 0;
    component.iconDisplayerValue = 0;
    component.tenDegreeIconName = '';
    component.tenDegreeIconNameHot = 'fa-solid fa-fire';

    component.temperatureConversion();

    expect(component.isCelcius).toBeTrue();
    expect(component.showHotOrCold).toEqual('hotCelcius');
    expect(component.toValue).toEqual(77);
    expect(component.tenDegreeIconName).toEqual(component.tenDegreeIconNameHot);
  });


  it('should convert Fahrenheit to Celcius in hot temperatures', () => {
    component.calculation = {};
    component.fromSystem = 'Fahrenheit';
    component.isCelcius = null;
    component.fromValue = 80;
    component.toValue = 0;
    component.showHotOrCold = '';
    component.toSystem = 'Celcius';
    component.fahrenheitToTenDegrees = 3.38;
    component.displayTenDegreeRate = 0;
    component.tenDegreeValue = 0;
    component.iconDisplayerValue = 0;
    component.tenDegreeIconName = '';
    component.tenDegreeIconNameHot = 'fa-solid fa-fire';

    component.temperatureConversion();

    expect(component.isCelcius).toBeFalse();
    expect(component.showHotOrCold).toEqual('hotFahrenheit');
    expect(component.toValue).toEqual(26.4);
    expect(component.tenDegreeIconName).toEqual(component.tenDegreeIconNameHot);
  });


  it('should convert Celcius to Fahrenheit in freezing temperatures', () => {
    component.calculation = {};
    component.fromSystem = 'Celcius';
    component.isCelcius = null;
    component.fromValue = -10;
    component.toValue = 0;
    component.showHotOrCold = '';
    component.toSystem = 'Fahrenheit';
    component.fahrenheitToTenDegrees = 0.1;
    component.displayTenDegreeRate = 0;
    component.tenDegreeValue = 0;
    component.iconDisplayerValue = 0;
    component.tenDegreeIconName = '';
    component.tenDegreeIconNameHot = 'fa-solid fa-snowplow';

    component.temperatureConversion();

    expect(component.isCelcius).toBeTrue();
    expect(component.showHotOrCold).toEqual('frozenCelcius');
    expect(component.toValue).toEqual(14);
    expect(component.tenDegreeIconName).toEqual(component.tenDegreeIconNameFrozen);
  });


  it('should convert Fahrenheit to Celcius in freezing temperatures', () => {
    component.calculation = {};
    component.fromSystem = 'Fahrenheit';
    component.isCelcius = null;
    component.fromValue = 10;
    component.toValue = 0;
    component.showHotOrCold = '';
    component.toSystem = 'Celcius';
    component.fahrenheitToTenDegrees = 3.38;
    component.displayTenDegreeRate = 0;
    component.tenDegreeValue = 0;
    component.iconDisplayerValue = 0;
    component.tenDegreeIconName = '';
    component.tenDegreeIconNameHot = 'fa-solid fa-snowplow';

    component.temperatureConversion();

    expect(component.isCelcius).toBeFalse();
    expect(component.showHotOrCold).toEqual('frozenFahrenheit');
    expect(component.toValue).toEqual(-12.1);
    expect(component.tenDegreeIconName).toEqual(component.tenDegreeIconNameFrozen);
  });


  it('should change variable showTempKey to false, hiding the icon key', () => {
    component.showTempKey = true;

    component.clearTemperatureClicked();

    expect(component.showTempKey).toBeFalse();
  });



  it('should clear all variables', () => {
    
    component.clearTemperature();

    expect(component.fromValue).toEqual(0);
    expect(component.toValue).toEqual(0);
    expect(component.fromSystem).toEqual('');
    expect(component.toSystem).toEqual('');
    expect(component.displayConversionRate).toEqual(0);
    expect(component.tenDegreeValue).toEqual(0);
    expect(component.displayTenDegree).toEqual([]);
    expect(component.displayTenDegreeRate).toEqual(0);
  });


  it('should build a calculation and store it in an array in service', () => {
    component.fromValue = 1;
    component.toValue = 33.8;
    component.fromSystem = 'Celcius';
    component.toSystem = 'Fahrenheit';

    let result = component.saveTemperatureClicked();

    expect(component.calculation).toEqual(result);
  });




});
