import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureComponent } from './pressure.component';

describe('PressureComponent', () => {
  let component: PressureComponent;
  let fixture: ComponentFixture<PressureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PressureComponent]
    });
    fixture = TestBed.createComponent(PressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Atmospheres to Bars', () => {
    component.firstSystem = 'Atmospheres';
    component.secondSystem = 'Bars';
    component.atmosphericToBars = 0.986923;
    component.atmosphericToElephants = 0.735;

    component.pressureConversion();

    expect(component.showPressureKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.atmosphericToBars);
  });

  it('should convert Bars to Atmospheres', () => {
    component.firstSystem = 'Bars';
    component.secondSystem = 'Atmospheres';
    component.barsToAtmospheric = 1.01325;
    component.barsToElephants = 0.725388405;

    component.pressureConversion();

    expect(component.showPressureKey).toBeTrue();
    expect(component.secondValue).toEqual(component.firstValue * component.barsToAtmospheric);
  });

  it('should clear all variables', () => {
    component.clearPressure();

    expect(component.firstSystem).toEqual('');
    expect(component.secondSystem).toEqual('');
    expect(component.firstValue).toEqual(0);
    expect(component.secondValue).toEqual(0);
    expect(component.displayConversionRate).toEqual(0);
    expect(component.displayPlanetEarth).toEqual([]);
  });

  it('should change variable showPressureKey to false, hiding icon key', () => {
    component.showPressureKey = true;

    component.clearPressureClicked();

    expect(component.showPressureKey).toBeFalse();
  });
});
