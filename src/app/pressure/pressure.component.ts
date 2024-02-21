import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { LogCalculationsService } from '../logCalculations.service';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnDestroy {

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate = 0;
  displayElephantRate = 0;

  planetEarthValue: number = 0;
  displayPlanetEarth: number[] = [];
  planetEarthIconName: string = 'fa-solid fa-earth-americas';

  planetEarthIconValue: number = 1;
  planetEarthUnit: string = 'of Earths atmosphere';
  planetEarthIconFirstAddition: number = 1;
  displayPressureComponent: boolean = false;
  clearPressureValue: boolean = false;
  showPressureKey: boolean = false;
  iconName: string = 'fa-solid fa-guage';
  titleString: string = 'Pressure-converter';
  pressurePanelState: boolean = false;
  themeName: string = 'business';
  public destroyed$ = new Subject();

  fromQuantity: string[] = [
    'Atmospheres',
    'Bars'
  ];
  toQuantity: string[] = [
    'Bars',
    'Atmospheres'
  ];

  private readonly atmosphericToBars: number = 0.986923;
  private readonly barsToAtmospheric: number = 1.01325;
  private readonly atmosphericToElephants: number = 0.735;
  private readonly barsToElephants: number = 0.725388405;

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<PressureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
    public dialog: MatDialog){
      this.themeService.themeName$.pipe(
        tap((theme) => {
          this.themeName = theme;
        }),
        takeUntil(this.destroyed$)
      ).subscribe();
    }
    
    ngOnDestroy(): void {
      this.destroyed$.next(this.destroyed$);
      this.destroyed$.complete();
  }



  pressureConversion(){
    switch(this.firstSystem){
      case 'Atmospheres': {
        switch(this.secondSystem){
          case 'Atmospheres': {
            console.log("Error, cannot convert Atmospheres to Atmospheres.");
            break;
          }
          case 'Bars': {
            this.displayConversionRate = this.convertPressure(this.atmosphericToBars);
            this.displayElephantRate = this.convertToElephants(this.atmosphericToElephants);
            break;
          }
        }
        break;
      }
      case 'Bars' :{
        switch(this.secondSystem){
          case 'Bars': {
            console.log("Error, cannot convert Bars to Bars.");
            break;
          }
          case 'Atmospheres': {
            this.displayConversionRate = this.convertPressure(this.barsToAtmospheric);
            this.displayElephantRate = this.convertToElephants(this.barsToElephants);
            break;
          }
        }
        break;
      }
    }
    this.showPressureKey = true;
    this.savePressureClicked();
  }

  convertPressure(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  }


  convertToElephants(conversionRate: number){
    this.planetEarthValue = this.firstValue * conversionRate;
    this.displayPlanetEarth = [];
    for(let index=0; index < this.planetEarthValue; index++){
      this.displayPlanetEarth.push(index);
    }
    return conversionRate;
  }

  // pressureShowIcon(){
  //   if(this.showPressureKey === false){
  //     this.showPressureKey = true;
  //     this.showPressureKeyCheck = true;
  //   }else{
  //     this.showPressureKey = false;
  //     this.showPressureKeyCheck = false;
  //   };
  // }

  clearPressureClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Pressure-converter',
        message: 'Are you sure you want to clear pressure-converter?',
        iconString: 'fa-solid fa-gauge'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clearPressure();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showPressureKey = false;
  }

  savePressureClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearPressure(){
      this.firstSystem = '';
      this.secondSystem = '';
      this.firstValue = 0;
      this.secondValue = 0;
      this.displayConversionRate = 0;
      this.displayElephantRate = 0;
      this.displayPlanetEarth = [];
      this.planetEarthValue = 0;
    };
 
}

