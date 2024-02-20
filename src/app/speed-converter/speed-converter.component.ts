import { Component, Inject } from '@angular/core';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { LogCalculationsService } from '../logCalculations.service';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-speed-converter',
  templateUrl: './speed-converter.component.html',
  styleUrls: ['./speed-converter.component.css']
})
export class SpeedConverterComponent {

  metricSystem: string = '';
  americanSystem: string = '';
  metricValue: number = 0;
  americanValue: number = 0;
  displayConversionRate: number = 0;
  displaySpeedConversionRate: number = 0;


  speedValue: number = 0;
  displaySpeed: number[] =[];
  speedIconName: string = '';
  speedIconSlow: string = 'fa-solid fa-person-walking';
  speedIconMedium: string = 'fa-solid fa-truck-fast';
  speedIconFast: string = 'fa-solid fa-jet-fighter';

  iconValue: number = 10;
  iconUnit: string = 'MPH';
  iconFirstAddition: number = 10;

  isMetersPerSecond: boolean | null = null;
  showSlowMediumFast: string = '';

  iconDisplayerValue: number = 0;
  displaySpeedComponent: boolean = true;
  showSpeedKey: boolean = false;
  showSpeedKeyCheck: boolean = false;
  iconName: string = 'fa-solid fa-gauge';
  titleString: string = 'Speed-converter';
  speedPanelState: boolean = false;
  themeName: string = 'business';


  
  private readonly metersPerSecondToFeetPerSecond: number = 3.28084;
  private readonly metersPerSecondToMilesPerHour: number = 2.23694;
  private readonly kilometersPerHourToFeetPerSecond: number = 0.911344;
  private readonly kilometersPerHourToMilesPerHour: number = 0.621371;

  private readonly metersPerSecondToTenMilesPerHour: number = 4;
  private readonly kilometersPerHourToTenMilesPerHour: number = 16.0934;

  private readonly kilometersPerHourTo60MilesPerHour: number = 96.5606;
  private readonly metersPerSecondTo60MilesPerHour: number = 26.8223889;

  metricQuantity: string[] = [
    "Meters per second",
    "Kilometers per hour"
  ];

  americanQuantity: string[] = [
    "Feet per second",
    "Miles per hour"
  ];

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<SpeedConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
    public dialog: MatDialog){
      this.themeService.themeName$.pipe(
        tap((theme) => {
          this.themeName = theme;
        })
      ).subscribe();
    }

  speedConversion(){

    if(this.metricSystem === 'Meters per second'){
      this.isMetersPerSecond = true;
    }else{
      this.isMetersPerSecond = false;
    };

    if(this.metricValue < 15 && !this.isMetersPerSecond){
      this.showSlowMediumFast = 'walkingSpeedKPH';
    };
    if(this.metricValue < 1.6 && this.isMetersPerSecond){
      this.showSlowMediumFast = 'walkingSpeedMPS';
    };
    if(this.metricValue > 16 && this.metricValue < 60 && !this.isMetersPerSecond){
      this.showSlowMediumFast = 'drivingSpeedKPH';
    };
    if(this.metricValue > 1.7 && this.metricValue < 27 && this.isMetersPerSecond){
      this.showSlowMediumFast = 'drivingSpeedMPH';
    };
    if(this.metricValue > 61 && !this.isMetersPerSecond){
      this.showSlowMediumFast = 'flyingSpeedKPH';
    };
    if(this.metricValue > 28 && this.isMetersPerSecond){
      this.showSlowMediumFast = 'flyingSpeedMPH'
    };


    if(this.showSlowMediumFast === 'walkingSpeedKPH' || this.showSlowMediumFast === 'walkingSpeedMPS'){
      switch(this.metricSystem){
        case 'Meters per second': {
          switch(this.americanSystem){
            case 'Feet per second': {
              this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToFeetPerSecond);
              this.displaySpeedConversionRate = this.convertToSlowIcon(this.metersPerSecondToMilesPerHour);
              break;
            }
            case 'Miles per hour': {
              this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToMilesPerHour);
              this.displaySpeedConversionRate = this.convertToSlowIcon(this.metersPerSecondToMilesPerHour);
              break;
            }
          };
          this.iconValue = 1;
          this.iconFirstAddition = 1;
          break;
        }
        case 'Kilometers per hour': {
          switch(this.americanSystem){
            case 'Feet per second': {
              this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToFeetPerSecond);
              this.displaySpeedConversionRate = this.convertToSlowIcon(this.kilometersPerHourToMilesPerHour);
              break;
            }
            case 'Miles per hour': {
              this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToMilesPerHour);
              this.displaySpeedConversionRate = this.convertToSlowIcon(this.kilometersPerHourToMilesPerHour);
              break;
            }
          };
          this.iconValue = 1;
          this.iconFirstAddition = 1;
          break;
        }
      }
    };

    if(this.showSlowMediumFast === 'drivingSpeedKPH' || this.showSlowMediumFast === 'drivingSpeedMPH'){
      switch(this.metricSystem){
        case 'Meters per second': {
          switch(this.americanSystem){
            case 'Feet per second': {
              this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToFeetPerSecond);
              this.displaySpeedConversionRate = this.convertToMediumIcon(this.metersPerSecondToTenMilesPerHour);
              break;
            }
            case 'Miles per hour': {
              this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToMilesPerHour);
              this.displaySpeedConversionRate = this.convertToMediumIcon(this.metersPerSecondToTenMilesPerHour);
              break;
            }
          };
          this.iconValue = 10;
          this.iconFirstAddition = 10;
          break;
        }
        case 'Kilometers per hour': {
          switch(this.americanSystem){
            case 'Feet per second': {
              this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToFeetPerSecond);
              this.displaySpeedConversionRate = this.convertToMediumIcon(this.kilometersPerHourToTenMilesPerHour);
              break;
            }
            case 'Miles per hour': {
              this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToMilesPerHour);
              this.displaySpeedConversionRate = this.convertToMediumIcon(this.kilometersPerHourToTenMilesPerHour);
              break;
            }
          };
          this.iconValue = 10;
          this.iconFirstAddition = 10;
          break;
        }
      }
    };

    if(this.showSlowMediumFast === 'flyingSpeedKPH' || this.showSlowMediumFast === 'flyingSpeedMPH'){
      switch(this.metricSystem){
        case 'Meters per second': {
          switch(this.americanSystem){
            case 'Feet per second': {
              this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToFeetPerSecond);
              this.displaySpeedConversionRate = this.convertToFastIcon(this.metersPerSecondTo60MilesPerHour);
              break;
            }
            case 'Miles per hour': {
              this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToMilesPerHour);
              this.displaySpeedConversionRate = this.convertToFastIcon(this.metersPerSecondTo60MilesPerHour);
              break;
            }
          };
          this.iconValue = 60;
          this.iconFirstAddition = 60;
          break;
        }
        case 'Kilometers per hour': {
          switch(this.americanSystem){
            case 'Feet per second': {
              this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToFeetPerSecond);
              this.displaySpeedConversionRate = this.convertToFastIcon(this.kilometersPerHourTo60MilesPerHour);
              break;
            }
            case 'Miles per hour': {
              this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToMilesPerHour);
              this.displaySpeedConversionRate = this.convertToFastIcon(this.kilometersPerHourTo60MilesPerHour);
              break;
            }
          };
          this.iconValue = 60;
          this.iconFirstAddition = 60;
          break;
        }
      }
    };
    this.showSpeedKey = true;
    this.saveSpeedClicked();
  };

  convertToAmerican(conversionRate: number){
    this.americanValue = this.metricValue * conversionRate;
    return conversionRate;
  };

  convertToSlowIcon(conversionRate: number){
    this.speedValue = this.americanValue / 1;
    this.iconDisplayerValue = Math.trunc(this.speedValue);
    this.displaySpeed = [];
    for(let index=0; index < this.iconDisplayerValue; index++){
      this.displaySpeed.push(index);
    };
    this.speedIconName = this.speedIconSlow;
    this.iconDisplayerValue = 0;
    return conversionRate;
  };

  convertToMediumIcon(conversionRate: number){
    this.speedValue = this.americanValue / 10;
    this.iconDisplayerValue = Math.trunc(this.speedValue);
    // this.speedValue = this.metricValue / 10;
    this.displaySpeed = [];
    for(let index=0; index < this.iconDisplayerValue; index++){3
      this.displaySpeed.push(index);
    };
    this.speedIconName = this.speedIconMedium;
    this.iconDisplayerValue = 0;
    return conversionRate;
  };

  convertToFastIcon(conversionRate: number){
    this.speedValue = this.metricValue / 60;
    this.iconDisplayerValue = Math.trunc(this.speedValue);
    this.displaySpeed = [];
    for(let index=0; index < this.iconDisplayerValue; index++){
      this.displaySpeed.push(index);
    };
    this.speedIconName = this.speedIconFast;
    this.iconDisplayerValue = 0;
    return conversionRate;
  };

  // speedShowIcon(){
  //   if(this.showSpeedKey === false){
  //     this.showSpeedKey = true;
  //     this.showSpeedKeyCheck = true;
  //   }else{
  //     this.showSpeedKey = false;
  //     this.showSpeedKeyCheck = false;
  //   }
  // }

  saveSpeedClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.metricValue;
    converterCalculation.result = this.americanValue;
    converterCalculation.fromSystem = this.metricSystem;
    converterCalculation.toSystem = this.americanSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearSpeedClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Speed-converter',
        message: 'Are you sure you want to clear speed-converter?',
        iconString: 'fa-solid fa-gauge'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clearSpeed();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showSpeedKey = false;
  }

  clearSpeed(){
    this.metricSystem = '';
    this.americanSystem = '';
    this.metricValue = 0;
    this.americanValue = 0;
    this.displayConversionRate = 0;
    this.displaySpeed = []
    this.speedValue = 0;
    this.speedIconName = '';
    this.iconDisplayerValue = 0;
    console.log("Cleared.");
  };

}
