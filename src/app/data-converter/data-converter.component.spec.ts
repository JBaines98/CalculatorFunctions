import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConverterComponent } from './data-converter.component';

describe('DataConverterComponent', () => {
  let component: DataConverterComponent;
  let fixture: ComponentFixture<DataConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataConverterComponent]
    });
    fixture = TestBed.createComponent(DataConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Megabytes to Gigabytes', () => {
    component.firstSystem = 'Megabytes';
    component.firstValue = 500;
    component.secondSystem = 'Gigabytes';
    component.secondValue = 0;
    component.displayConversionRate = 0;
    component.megabytesToGigabytes = 1024;

    component.dataConversion();

    expect(component.showDataKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.megabytesToGigabytes);
  });

  it('should convert Megabytes to Terabytes', () => {
    component.firstSystem = 'Megabytes';
    component.firstValue = 500;
    component.secondSystem = 'Terabytes';
    component.secondValue = 0;
    component.displayConversionRate = 0;
    component.megabytesToTerabytes = 1048576;

    component.dataConversion();

    expect(component.showDataKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.megabytesToTerabytes);
  });

  it('should convert Gigabytes to Megabytes', () => {
    component.firstSystem = 'Gigabytes';
    component.firstValue = 0;
    component.secondSystem = 'Megabytes';
    component.secondValue = 0;
    component.displayConversionRate = 0;
    component.gigabytesToMegabytes = 0.0009765625;

    component.dataConversion();

    expect(component.showDataKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.gigabytesToMegabytes);
  });

  it('should convert Gigabytes to Terabytes', () => {
    component.firstSystem = 'Gigabytes';
    component.firstValue = 0;
    component.secondSystem = 'Terabytes';
    component.secondValue = 0;
    component.displayConversionRate = 0;
    component.gigabytesToTerabytes = 1024;

    component.dataConversion();

    expect(component.showDataKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.gigabytesToTerabytes);
  });

  it('should convert Terabytes to Megabytes', () => {
    component.firstSystem = 'Terabytes';
    component.firstValue = 0;
    component.secondSystem = 'Megabytes';
    component.secondValue = 0;
    component.displayConversionRate = 0;
    component.terabytesToMegabytes = 1/1048576;

    component.dataConversion();

    expect(component.showDataKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.terabytesToMegabytes);
  });

  it('should convert Terabytes to Gigabytes', () => {
    component.firstSystem = 'Terabytes';
    component.firstValue = 0;
    component.secondSystem = 'Gigabytes';
    component.secondValue = 0;
    component.displayConversionRate = 0;
    component.terabytesToGigabytes = 0.0009765625;

    component.dataConversion();

    expect(component.showDataKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.terabytesToGigabytes);
  });

  it('should console log error, as cannot convert Megabytes to Megabytes', () => {
    component.firstSystem = 'Megabytes';
    component.secondSystem = 'Megabytes';
    component.firstValue = 100;
    component.secondValue = 0;
    component.displayConversionRate = 0;

    component.dataConversion();

    expect(console.log).toEqual('Error, cannot convert Megabytes to Megabytes.');
  });

  it('should console log error, as cannot convert Gigabytes to Gigabytes', () => {
    component.firstSystem = 'Gigabytes';
    component.secondSystem = 'Gigabytes';
    component.firstValue = 100;
    component.secondValue = 0;
    component.displayConversionRate = 0;

    component.dataConversion();

    expect(console.log).toEqual('Error, cannot convert Gigabytes to Gigabytes.');
  });

  it('should console log error, as cannot convert Terabytes to Terabytes', () => {
    component.firstSystem = 'Terabytes';
    component.secondSystem = 'Terabytes';
    component.firstValue = 100;
    component.secondValue = 0;
    component.displayConversionRate = 0;

    component.dataConversion();

    expect(console.log).toEqual('Error, cannot convert Terabytes to Terabytes.');
  });

  it('should clear all variables', () => {
    component.clearData();

    expect(component.firstSystem).toEqual('');
    expect(component.firstValue).toEqual(0);
    expect(component.secondSystem).toEqual('');
    expect(component.secondValue).toEqual(0);
    expect(component.displayConversionRate).toEqual(0);
    expect(component.displayDataIcon).toEqual([]);
  });

  it('should change variable showDataKey to false, hiding key icon', () => {
    component.showDataKey = true;

    component.clearDataClicked();

    expect(component.showDataKey).toBeFalse();
  });
});
