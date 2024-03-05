import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightConverterComponent } from './weight-converter.component';

describe('WeightConverterComponent', () => {
  let component: WeightConverterComponent;
  let fixture: ComponentFixture<WeightConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightConverterComponent]
    });
    fixture = TestBed.createComponent(WeightConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Grams to Ounces', () => {
    component.gramSystem = 'Gram';
    component.poundSystem = 'Ounces';
    component.gramValue = 100;
    component.poundValue = 0;
    component.displayConversionRate = 0;
    component.displayDumbBell = [];
    component.gramsToOunces = 0.035274;

    component.weightConverter();

    expect(component.poundValue).toEqual(component.gramValue * component.gramsToOunces);
  });

  it('should convert Grams to Pounds', () => {
    component.gramSystem = 'Gram';
    component.poundSystem = 'Pound';
    component.gramValue = 500;
    component.poundValue = 0;
    component.displayConversionRate = 0;
    component.displayDumbBell = [];
    component.gramsToPounds = 0.00220462;

    component.weightConverter();

    expect(component.poundValue).toEqual(component.gramValue * component.gramsToPounds);
  });

  it('should convert Kilograms to Ounces', () => {
    component.gramSystem = 'Kilogram';
    component.poundSystem = 'Ounces';
    component.gramValue = 2;
    component.poundValue = 0;
    component.displayConversionRate = 0;
    component.displayDumbBell = [];
    component.kilogramsToOunces = 35.274;

    component.weightConverter();

    expect(component.poundValue).toEqual(component.gramValue * component.kilogramsToOunces);
  });

  it('should convert Kilograms to Pounds', () => {
    component.gramSystem = 'Kilogram';
    component.poundSystem = 'Pound';
    component.gramValue = 5;
    component.poundValue = 0;
    component.displayConversionRate = 0;
    component.displayDumbBell = [];
    component.kilogramsToPounds = 2.20462;

    component.weightConverter();

    expect(component.poundValue).toEqual(component.gramValue * component.kilogramsToPounds);
  });

  it('should change variable showWeightKey to false', () => {
    component.showWeightKey = true;

    component.clearWeightsClicked();

    expect(component.showWeightKey).toBeTrue();
  });

  it('should clear all variables', () => {
    component.clearWeights();

    expect(component.gramValue).toEqual(0);
    expect(component.poundValue).toEqual(0);
    expect(component.gramSystem).toEqual('');
    expect(component.poundSystem).toEqual('');
    expect(component.displayConversionRate).toEqual(0);
  });


  
});
