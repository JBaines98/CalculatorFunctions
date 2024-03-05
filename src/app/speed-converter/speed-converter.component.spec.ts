import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedConverterComponent } from './speed-converter.component';
import { computeMsgId } from '@angular/compiler';

describe('SpeedConverterComponent', () => {
  let component: SpeedConverterComponent;
  let fixture: ComponentFixture<SpeedConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedConverterComponent]
    });
    fixture = TestBed.createComponent(SpeedConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change isMetersPerSecond variable to true, when fromSystem = MetersPerSecond and convert MetersPerSecond to FeetPerSecond', () => {
    component.calculation = {};
    component.metricSystem = 'MetersPerSecond';
    component.isMetersPerSecond = null;
    component.metricValue = 1;
    component.americanValue = 0;
    component.showSlowMediumFast = '';
    component.americanSystem = 'FeetPerSecond';
    component.metersPerSecondToFeetPerSecond;
    component.metersPerSecondToTenMilesPerHour = 4;
    component.displaySpeedConversionRate = 0;
    component.speedValue = 0;
    component.iconDisplayerValue = 0;
    component.speedIconSlow = 'fa-solid fa-person-walking';

    component.speedConversion();

    expect(component.isMetersPerSecond).toBeTrue();
    expect(component.showSlowMediumFast).toEqual('walkingSpeedMPS');
    expect(component.americanValue).toEqual(component.metersPerSecondToFeetPerSecond * component.metricValue);
    expect(component.speedIconName).toEqual(component.speedIconSlow);
  });

  it('should change isMetersPerSecond variable to false; when fromSystem !== MetersPerSecond and convert MetersPerSecond to MilesPerHour', () => {
    component.calculation = {};
    component.metricSystem = 'MetersPerSecond';
    component.isMetersPerSecond = null;
    component.metricValue = 10;
    component.americanValue = 0;
    component.showSlowMediumFast = '';
    component.americanSystem = 'MilesPerHour';
    component.metersPerSecondToMilesPerHour = 2.23694;
    component.metersPerSecondToTenMilesPerHour = 4;
    component.displaySpeedConversionRate = 0;
    component.speedValue = 0;
    component.iconDisplayerValue = 0;
    component.speedIconSlow = 'fa-solid fa-person-walking';

    component.speedConversion();

    expect(component.isMetersPerSecond).toBeFalse();
    expect(component.showSlowMediumFast).toEqual('walkingSpeedMPS');
    expect(component.americanValue).toEqual(22.3694);
    expect(component.speedIconName).toEqual(component.speedIconSlow);
  });

  it('should convert KilometersPerHour to FeetPerSecond', () => {
    component.calculation = {};
    component.metricSystem = 'KilometersPerHour';
    component.isMetersPerSecond = true;
    component.metricValue = 1;
    component.americanValue = 0;
    component.showSlowMediumFast = '';
    component.americanSystem = 'FeetPerSecond';
    component.kilometersPerHourToFeetPerSecond;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('walkingSpeedKPH');
    expect(component.americanValue).toEqual(0.911344415281);
    expect(component.speedIconName).toEqual(component.speedIconSlow);
  });

  it('should convert KilometersPerHour to MilesPerHour', () => {
    component.metricSystem = 'KilometersPerHour';
    component.isMetersPerSecond = false;
    component.americanSystem = 'MilesPerHour';
    component.metricValue = 10;
    component.americanValue = 0;
    
    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('walkingSpeedKPH');
    expect(component.americanValue).toEqual(6.2137119223733);
    expect(component.speedIconName).toEqual(component.speedIconSlow);

  });


  it('should convert MetersPerSecond to FeetPerSecond and showSlowMediumFast === drivingSpeedKph', () => {
    component.metricSystem = 'MetersPerSecond';
    component.americanSystem = 'FeetPerSecond';
    component.metricValue = 20;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('drivingSpeedKph');
    expect(component.americanValue).toEqual(65.616797900262);
    expect(component.speedIconName).toEqual(component.speedIconMedium);
  });

  it('should convert MetersPerSecond to MilesPerHour and showSlowMediumFast === drivingSpeedKph', () => {
    component.metricSystem = 'MetersPerSecond';
    component.americanSystem = 'MilesPerHour';
    component.metricValue = 20;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('drivingSpeedKph');
    expect(component.americanValue).toEqual(44.738726790369);
    expect(component.speedIconName).toEqual(component.speedIconMedium);
  });

  it('should convert KilometersPerHour to FeetPerSecond and showSlowMediumFast === drivingSpeedKph', () => {
    component.metricSystem = 'KilometersPerHour';
    component.americanSystem = 'FeetPerSecond';
    component.metricValue = 20;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('drivingSpeedKph');
    expect(component.americanValue).toEqual(54.680664916433);
    expect(component.speedIconName).toEqual(component.speedIconMedium);
  });

  it('should convert KilometersPerHour to MilesPerHour and showSlowMediumFast === drivingSpeedKph', () => {
    component.metricSystem = 'KilometersPerHour';
    component.americanSystem = 'MilesPerHour';
    component.metricValue = 20;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('drivingSpeedKph');
    expect(component.americanValue).toEqual(12.427423844747);
    expect(component.speedIconName).toEqual(component.speedIconMedium);
  });

  it('should convert MetersPerSecond to FeetPerSecond and showSlowMediumFast === flyingSpeedMph', () => {
    component.metricSystem = 'MetersPerSecond';
    component.americanSystem = 'FeetPerSecond';
    component.metricValue = 100;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('flyingSpeedMph');
    expect(component.americanValue).toEqual(328.08398950131);
    expect(component.speedIconName).toEqual(component.speedIconFast);
  });

  it('should convert MetersPerSecond to MilesPerHour and showSlowMediumFast === flyingSpeedMph', () => {
    component.metricSystem = 'MetersPerSecond';
    component.americanSystem = 'MilesPerHour';
    component.metricValue = 100;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('flyingSpeedMph');
    expect(component.americanValue).toEqual(223.69362903693);
    expect(component.speedIconName).toEqual(component.speedIconFast);
  });

  it('should convert KilometersPerSecond to FeetPerSecond and showSlowMediumFast === flyingSpeedMph', () => {
    component.metricSystem = 'KilometersPerHour';
    component.americanSystem = 'FeetPerSecond';
    component.metricValue = 100;
    component.americanValue = 0;

    component.speedConversion();

    expect(component.showSlowMediumFast).toEqual('flyingSpeedMph');
    expect(component.americanValue).toEqual(328.08398950131);
    expect(component.speedIconName).toEqual(component.speedIconFast);
  });

  it('should clear all variables',() => {
    component.clearSpeed();

    expect(component.metricValue).toEqual(0);
    expect(component.americanValue).toEqual(0);
    expect(component.metricSystem).toEqual('');
    expect(component.americanSystem).toEqual('');
    expect(component.displaySpeedConversionRate).toEqual(0);
    expect(component.showSlowMediumFast).toEqual('');
  });

  it('should store slowIconSpeed in speedIconName', () => {
    component.convertToSlowIcon(component.metersPerSecondToFeetPerSecond);

    expect(component.speedIconName).toEqual(component.speedIconSlow);
    expect(component.iconDisplayerValue).toEqual(0);
  });

  it('should store mediumIconSpeed in speedIconName', () => {
    component.convertToMediumIcon(component.metersPerSecondToFeetPerSecond);

    expect(component.speedIconName).toEqual(component.speedIconMedium);
    expect(component.iconDisplayerValue).toEqual(0);
  });

  it('should store fastIconSpeed in speedIconName', () => {
    component.convertToFastIcon(component.metersPerSecondToFeetPerSecond);

    expect(component.speedIconName).toEqual(component.speedIconFast);
    expect(component.iconDisplayerValue).toEqual(0);
  });

  it('should change variable showSpeedKey to false', () => {
    component.showSpeedKey = true;

    component.clearSpeedClicked();

    expect(component.showSpeedKey).toBeFalse();
  });
});
