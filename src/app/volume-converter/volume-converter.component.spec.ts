import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeConverterComponent } from './volume-converter.component';

describe('VolumeConverterComponent', () => {
  let component: VolumeConverterComponent;
  let fixture: ComponentFixture<VolumeConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeConverterComponent]
    });
    fixture = TestBed.createComponent(VolumeConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Millimeters to Teaspoons', () => {
    component.metricSystem = 'Milliliters';
    component.americanSystem = 'Teaspoons';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.millilitersToTeaspoons = 0.202884;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.millilitersToTeaspoons);
  });

  it('should convert Milliliters to Tablespoons', () => {
    component.metricSystem = 'Millileters';
    component.americanSystem = 'Tablespoons';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters =[];
    component.millilitersToTablespoons = 0.06763;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.millilitersToTablespoons);
  });

  it('should convert Milliliters to Ounces', () => {
    component.metricSystem = 'Millileters';
    component.americanSystem = 'Ounces';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters =[];
    component.millilitersToOunces = 33.814;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.millilitersToOunces);
  });

  it('should convert Centiliters to Teaspoons', () => {
    component.metricSystem = 'Centiliters';
    component.americanSystem = 'Teaspoons';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.centilitersToTeaspoons = 2.02884;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.centilitersToTeaspoons);
  });

  it('should convert Centiliters to Tablespoons', () => {
    component.metricSystem = 'Centiliters';
    component.americanSystem = 'Tablespoons';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.centilitersToTablespoons = 0.67628;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.centilitersToTablespoons);
  });

  it('should convert Centiliters to Ounces', () => {
    component.metricSystem = 'Centiliters';
    component.americanSystem = 'Ounces';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.centilitersToOunces = 0.33814;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.centilitersToOunces);
  });

  it('should convert Liters to Teaspoons', () => {
    component.metricSystem = 'Liters';
    component.americanSystem = 'Teaspoons';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.litersToTeaspoons = 202.884;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.litersToTeaspoons);
  });

  it('should convert Liters to Tablespoons', () => {
    component.metricSystem = 'Liters';
    component.americanSystem = 'Tablespoons';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.litersToTablespoons = 67.628;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.litersToTablespoons);
  });

  it('should convert Liters to Ounces', () => {
    component.metricSystem = 'Liters';
    component.americanSystem = 'Ounces';
    component.metricValue = 100;
    component.americanValue = 0;
    component.displayConversionRate = 0;
    component.displayLiters = [];
    component.litersToOunces = 33.814;

    component.volumeConversion();

    expect(component.showVolumeKey).toBeTrue();
    expect(component.americanValue).toEqual(component.metricValue * component.litersToOunces);
  });

  it('should change variable showVolumeKey to false, hiding key icon', () => {
    component.showVolumeKey = true;

    component.clearVolumesClicked();

    expect(component.showVolumeKey).toBeTrue();
  });

  it('should clear all variables', () => {
    component.clearVolumes();

    expect(component.metricSystem).toEqual('');
    expect(component.metricValue).toEqual(0);
    expect(component.americanSystem).toEqual('');
    expect(component.americanValue).toEqual(0);
    expect(component.displayConversionRate).toEqual(0);
    expect(component.displayLiters).toEqual([]);
  });
});
