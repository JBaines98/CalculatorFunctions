import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.css']
})
export class LengthConverterComponent {

  metricSystem: string = '';
  americanSystem: string = '';

  metricValue: number = 0;
  americanValue: number = 0;

  rulerValue: number = 0;
  displayRuler: number[] = [];
  rulerIconName: string = 'fa-solid fa-ruler';
  displayConversionRate: number = 0;
  displayRulerConversionRate: number = 0;

  iconValue: number = 33;
  iconUnit: string = 'cm';
  iconFirstAddition: number = 33;
  showLengthKey: boolean = false;
  iconName: string = 'fa-solid fa-ruler';
  titleString: string = 'Length-converter';

  private readonly centermetersToInches: number = 0.393701;
  private readonly centermetersToFeet: number = 0.0328084;
  private readonly centermetersToMiles: number = 0.00000621;
  private readonly metersToInches: number = 39.3701;
  private readonly metersToFeet: number = 3.28084;
  private readonly metersToMiles: number = 0.000621371;
  private readonly kilometersToInches: number = 39370.1;
  private readonly kilometersToFeet: number = 3280.84;
  private readonly kilometersToMiles: number = 0.621371;

  private readonly centremetersToRuler: number = 0.33;
  private readonly metersToRuler: number = 3;
  private readonly kilometersToRuler: number = 3000;



  metricMeasurements: string[] = [
    "Centermeters",
    "Meters",
    "Kilometers"
  ];

  americanMeasurements: string[] = [
    "Inches",
    "Feet",
    "Miles"
  ];

  constructor(
    public dialogRef: MatDialogRef<LengthConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData = {
      converterType: '',
      messege: '',
      iconString: '',
    },
    public dialog: MatDialog){}

  lengthConverter(){
    switch(this.metricSystem){
      case 'Centermeters': {
        switch(this.americanSystem){
          case 'Inches': {
            this.displayConversionRate = this.convertToAmerican(this.centermetersToInches);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.centremetersToRuler);
            break;
          }
          case 'Feet': {
            this.displayConversionRate = this.convertToAmerican(this.centermetersToFeet);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.centremetersToRuler);
            break;
          }
          case 'Miles': {
            this.displayConversionRate = this.convertToAmerican(this.centermetersToMiles);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.centremetersToRuler);
            break;
          }
        }
        break;
      }
      case 'Meters': {
        switch(this.americanSystem){
          case 'Inches': {
            this.displayConversionRate = this.convertToAmerican(this.metersToInches);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.metersToRuler);
            break;
          }
          case 'Feet': {
            this.displayConversionRate = this.convertToAmerican(this.metersToFeet);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.metersToRuler);
            break;
          }
          case 'Miles': {
            this.displayConversionRate = this.convertToAmerican(this.metersToMiles);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.metersToRuler);
            break;
          }
        }
        break;
      }
      case 'Kilometers': {
        switch(this.americanSystem){
          case 'Inches': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersToInches);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.kilometersToRuler);
            break;
          }
          case 'Feet': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersToFeet);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.kilometersToRuler);
            break;
          }
          case 'Miles': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersToMiles);
            this.displayRulerConversionRate = this.convertToFeetIcon(this.kilometersToRuler);
            break;
          }
        }
        break;
      }
    }
    this.showLengthKey = true;
    
  }

  convertToAmerican(conversionRate: number){
    this.americanValue = this.metricValue * conversionRate;
    return conversionRate;
  }

  convertToFeetIcon(conversionRate: number){
    this.rulerValue = this.metricValue * conversionRate;
    this.displayRuler = [];
    for(let index=0; index < this.rulerValue; index++){
      this.displayRuler.push(index);
    }
    return conversionRate;
  }

  // lengthShowIcon(){
  //   if(this.showLengthKey == false){
  //     this.showLengthKey = true;
  //     this.showLengthKeyCheck = true;
  //   }else{
  //     this.showLengthKey = false;
  //     this.showLengthKeyCheck = false;
  //   };
  // }

  clearLengthsClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-conetent',
      data: {
        converterType: 'Length-converter',
        message: 'Are you sure you want to clear length-converter?',
        iconString: 'fa-solid fa-ruler-horizontal'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clearLengths();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showLengthKey = false;
  }

  clearLengths(){
    this.americanValue = 0;
    this.metricValue = 0;
    this.americanSystem = '';
    this.metricSystem = '';
    this.displayConversionRate = 0;
    this.displayRuler = [];
    console.log("Cleared.");
  }






}
