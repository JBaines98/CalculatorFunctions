import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthConverterComponent } from './length-converter.component';

describe('LengthConverterComponent', () => {
  let component: LengthConverterComponent;
  let fixture: ComponentFixture<LengthConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LengthConverterComponent]
    });
    fixture = TestBed.createComponent(LengthConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Centermeters to Inches', () => {
    component.metricSystem = 'Centermeters';
    component.americanSystem = 'Inches';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 0.393701);
  });

  it('should convert Centermeters to Feet', () => {
    component.metricSystem = 'Centermeters';
    component.americanSystem = 'Feet';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 0.0328084);
  });

  it('should convert Centermeters to Miles', () => {
    component.metricSystem = 'Centermeters';
    component.americanSystem = 'Miles';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 0.00000621);
  });

  it('should convert Meters to Inches', () => {
    component.metricSystem = 'Meters';
    component.americanSystem = 'Inches';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 39.3701);
  });

  it('should convert Meters to Feet', () => {
    component.metricSystem = 'Meters';
    component.americanSystem = 'Feet';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 3.28084);
  });

  it('should convert Meters to Miles', () => {
    component.metricSystem = 'Meters';
    component.americanSystem = 'Miles';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 0.000621371);
  });

  it('should convert Kilometers to Inches', () => {
    component.metricSystem = 'Kilometers';
    component.americanSystem = 'Inches';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 39370.1);
  });

  it('should convert Kilometers to Feet' ,() => {
    component.metricSystem = 'Kilometers';
    component.americanSystem = 'Feet';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 3280.84);
  });

  it('should convert Kilometers to Miles', () => {
    component.metricSystem = 'Kilometers';
    component.americanSystem = 'Feet';
    component.metricValue = 50;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayRuler = [];

    component.lengthConverter();

    expect(component.americanValue).toEqual(component.metricValue * 0.621371);
  });

  it('should clear all variables', () => {
    component.clearLengths();

    expect(component.metricValue).toEqual(0);
    expect(component.metricSystem).toEqual('');
    expect(component.americanValue).toEqual(0);
    expect(component.americanSystem).toEqual('');
    expect(component.displayConversionRate).toEqual(0);
    expect(component.displayRuler).toEqual([]);
  });

  it('should chnage variable showLengthKey to false, hiding key icon', () => {
    component.showLengthKey = true;

    component.clearLengthsClicked();

    expect(component.showLengthKey).toBeFalse();
  });
});
