import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-temperature-converter',
  templateUrl: './temperature-converter.component.html',
  styleUrls: ['./temperature-converter.component.css']
})
export class TemperatureConverterComponent {

  fromSystem: string = '';
  toSystem: string = '';
  fromValue: number = 0;
  toValue: number = 0;
  displayConversionRate: number = 0;
  displayTenDegreeRate: number = 0;


  tenDegreeValue: number = 0;
  displayTenDegree: number[] = [];
  tenDegreeIconName: string = '';
  tenDegreeIconNameHot: string = 'fa-solid fa-fire';
  tenDegreeIconNameCold: string = 'fa-solid fa-snowflake';
  tenDegreeIconNameFrozen: string = 'fa-solid fa-snowplow';

  iconUnit: string = '°C';
  iconValue: number = 10;
  iconFirstAddition: number = 10;

  displayTemperatureComponent: boolean = true;
  iconDisplayerValue: number = 0;
  isCelcius: boolean | null = null;
  showHotOrCold: string = '';
  showTempKey: boolean = false;
  iconName: string = 'fa-solid fa-temperature-three-quarters';
  titleString: string = 'Temperature-converter';

  private readonly celciusToFahrenheit: number = 33.8;
  private readonly fahrenheitToCelcius: number = 0;

  private readonly celciusToTenDegrees: number = 0.1;
  private readonly fahrenheitToTenDegrees: number = 3.38;

  fromQuantity: string[] = [
    "Celcius",
    "Fahrenheit"
  ]

  toQuantity: string[] = [
    "Fahrenheit",
    "Celcius"
  ]

  constructor(
    public dialogRef: MatDialogRef<TemperatureConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
    public dialog: MatDialog){}

  temperatureConversion(){
    if(this.fromSystem === 'Celcius'){
      this.isCelcius = true;
    }else{
      this.isCelcius = false;
    };

    if(this.fromValue >= 59 && !this.isCelcius){
      this.showHotOrCold = 'hotFahrenheit';
    };
    if(this.fromValue >= 15 && this.isCelcius){
      this.showHotOrCold = 'hotCelcius';
    };
    if(this.fromValue < 59 && !this.isCelcius){
      this.showHotOrCold = 'coldFahrenheit';
    };
    if(this.fromValue < 15 && this.isCelcius){
      this.showHotOrCold = 'coldCelcius';
    };
    if(this.fromValue < 0 && this.isCelcius){
      this.showHotOrCold = 'frozenCelcius';
    };
    if(this.fromValue < 32 && !this.isCelcius){
      this.showHotOrCold = 'frozenFahrenheit';
    };

    if(this.fromSystem === this.toSystem){
      window.alert("Cannot convert to the same unit. Please choose a different unit.")
      console.log("Cannot convert to the same unit.");
    }else{

      if(this.showHotOrCold === 'hotFahrenheit' || this.showHotOrCold === 'hotCelcius'){
        switch(this.fromSystem){
          case 'Celcius': {
            switch(this.toSystem){
              case 'Fahrenheit': {
                this.displayTenDegreeRate = this.convertToHeatIconC2F(this.celciusToTenDegrees);
                break;
              }
            }
            break;
          }
          case 'Fahrenheit': {
            switch(this.toSystem){
              case 'Celcius': {
                this.displayTenDegreeRate = this.convertToHeatIconF2C(this.fahrenheitToTenDegrees);
                break;
              }
            }
            break;
          }
        }
      }
      if(this.showHotOrCold === 'coldFahrenheit' || this.showHotOrCold === 'coldCelcius'){
        switch(this.fromSystem){
          case 'Celcius': {
            switch(this.toSystem){
              case 'Fahrenheit': {
                this.displayTenDegreeRate = this.convertToColdIconC2F(this.celciusToTenDegrees);
                break;
              }
            }
            break;
          }
          case 'Fahrenheit': {
            switch(this.toSystem){
              case 'Celcius': {
                this.displayTenDegreeRate = this.convertToColdIconF2C(this.fahrenheitToTenDegrees);
                break;
              }
            }
            break;
          }
        }

      }
      if(this.showHotOrCold === 'frozenCelcius' || this.showHotOrCold === 'frozenFahrenheit'){
        switch(this.fromSystem){
          case 'Celcius': {
            switch(this.toSystem){
              case 'Fahrenheit': {
                this.displayTenDegreeRate = this.convertToFrozenIconC2F(this.celciusToTenDegrees);
                break;
              }
            }
            break;
          }
          case 'Fahrenheit': {
            switch(this.toSystem){
              case 'Celcius': {
                this.displayTenDegreeRate = this.convertToFrozenIconF2C(this.fahrenheitToTenDegrees);
                break;
              }
            }
            break;
          }
        }
      }

      this.iconDisplayerValue = 10;
      this.iconFirstAddition = 10;
      this.showTempKey = true;
    }
  }

  // convertTo(conversionRate: number){
  //   this.toValue = this.fromValue * conversionRate;
  //   return conversionRate;
  // }


  convertC2F(){
    let toCalc = this.fromValue * 1.8;
    let convertedNum = toCalc + 32;
    this.toValue = convertedNum;
    return convertedNum;
  }

  convertF2C(){
    let toCalc = this.fromValue - 32;
    let pointFiveFive = 5 / 9;
    let convertedNum = toCalc * pointFiveFive;
    this.toValue = convertedNum;
    return convertedNum;
  }

  convertToHeatIconC2F(conversionRate: number){
    this.tenDegreeValue = this.convertC2F();
    this.iconDisplayerValue = Math.trunc(this.tenDegreeValue);
    this.displayTenDegree = [];
    for(let index=0; index < this.iconDisplayerValue; index++){
      this.displayTenDegree.push(index);
    };
    this.tenDegreeIconName = this.tenDegreeIconNameHot;
    return conversionRate;
  }

  convertToHeatIconF2C(conversionRate: number){
    this.tenDegreeValue = this.convertF2C();
    this.iconDisplayerValue = Math.trunc(this.tenDegreeValue);
    this.displayTenDegree = [];
    for(let index=0; index < this.iconDisplayerValue; index++){
      this.displayTenDegree.push(index);
    };
    this.tenDegreeIconName = this.tenDegreeIconNameHot;
    return conversionRate;
  }

  convertToColdIconC2F(conversionRate: number){
    this.tenDegreeValue = this.convertC2F();
    this.iconDisplayerValue = Math.trunc(this.tenDegreeValue);
    this.displayTenDegree = [];
    for(let index = 0; index < this.iconDisplayerValue; index++){
      this.displayTenDegree.push(index);
    };
    this.tenDegreeIconName = this.tenDegreeIconNameCold;
    return conversionRate;
  }

  convertToColdIconF2C(conversionRate: number){
    this.tenDegreeValue = this.convertF2C();
    this.iconDisplayerValue = Math.trunc(this.tenDegreeValue);
    this.displayTenDegree = [];
    for(let index = 0; index < this.iconDisplayerValue; index++){
      this.displayTenDegree.push(index);
    };
    this.tenDegreeIconName = this.tenDegreeIconNameCold;
    return conversionRate;
  }

  convertToFrozenIconC2F(conversionRate: number){
    this.tenDegreeValue = this.convertC2F();
    this.iconDisplayerValue = Math.trunc(this.tenDegreeValue);
    this.displayTenDegree = [];
    for(let index = 0; index < this.iconDisplayerValue; index++){
      this.displayTenDegree.push(index);
    };
    this.tenDegreeIconName = this.tenDegreeIconNameFrozen;
    return conversionRate;
  }

  convertToFrozenIconF2C(conversionRate: number){
    this.tenDegreeValue = this.convertF2C();
    this.iconDisplayerValue = Math.trunc(this.tenDegreeValue);
    this.displayTenDegree = [];
    for(let index = 0; index < this.iconDisplayerValue; index++){
      this.displayTenDegree.push(index);
    };
    this.tenDegreeIconName  =this.tenDegreeIconNameFrozen;
    return conversionRate;
  }

  // tempShowIcon(){
  //   if(this.showTempKey === false){
  //     this.showTempKey = true;
  //     this.ShowTempKeyCheck = true;
  //   }else{
  //     this.showTempKey = false;
  //     this.ShowTempKeyCheck = false;
  //   };
  // }

  clearTemperatureClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Temperature-converter',
        message: 'Are you sure you want to clear temperature-converter',
        iconString: 'fa-solid fa-temperature-three-quarters'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clearTemperature();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showTempKey = false;
  }

  clearTemperature(){
      this.fromValue = 0;
      this.toValue = 0;
      this.fromSystem = '';
      this.toSystem = '';
      this.displayConversionRate = 0;
      this.tenDegreeValue = 0;
      this.displayTenDegree = [];
      this.displayTenDegreeRate = 0;
      console.log("Cleared");
   }
}
