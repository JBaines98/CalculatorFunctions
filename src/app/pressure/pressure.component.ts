import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent {

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
    public dialogRef: MatDialogRef<PressureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData = {
      converterType: 'pressure-converter',
      messege: 'Are you sure you want to clear pressure-converter?'
    },
    public dialog: MatDialog){};


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

  clearPressure(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: this.data
    });
    if(dialogRef){
      this.firstSystem = '';
      this.secondSystem = '';
      this.firstValue = 0;
      this.secondValue = 0;
      this.displayConversionRate = 0;
      this.displayElephantRate = 0;
      this.displayPlanetEarth = [];
      this.planetEarthValue = 0;
    }else{
      console.log("Not cleared.")
    };
  }
}