import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { dialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-power-converter',
  templateUrl: './power-converter.component.html',
  styleUrls: ['./power-converter.component.css']
})
export class PowerConverterComponent {

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate: number = 0;
  displayIconConversionRate: number = 0;

  iconValue: number = 0;
  iconUnit: string = '';
  iconFirstAddition: number = 0;
  displayIcons: number[] = [];
  iconName: string = '';
  horsepowerIcon: string = 'fa-solid fa-horse';
  kilowattIcon: string = 'fa-solid fa-plug';
  horsepowerIconValue: number = 1;
  kilowattIconValue: number = 1;
  displayPowerComponent: boolean = false;
 
  private readonly horsePowerToKilowatt: number = 1.341;
  private readonly kilowattToHorsePower: number = 1.341;
  private readonly horsePowerToIcon: number = 1;
  private readonly kilowattToIcon: number = 1;

  firstQuantity: string[] = [
    'Horse Power',
    'Kilowatt'
  ];

  secondQuantity: string[] = [
    'Kilowatt',
    'Horse Power'
  ];

  constructor(
    public dialogRef: MatDialogRef<PowerConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData = {
      converterType: 'power-converter',
      messege: 'Are you sure you want to clear power-converter?'
    },
    public dialog: MatDialog){}


  powerConversion(){

    if(this.firstSystem === 'Horse Power'){
      this.iconName = this.kilowattIcon;
      this.iconUnit = 'Kw';
      this.iconFirstAddition = 1;
      this.iconValue = 1;
      this.displayIconConversionRate = 1;
      this.displayPowerComponent = true;
    }else{
      this.iconName = this.horsepowerIcon;
      this.iconUnit = 'Hp';
      this.iconFirstAddition = 1;
      this.iconValue = 1;
      this.displayIconConversionRate = 1;
      this.displayPowerComponent = true;
    };

    switch(this.firstSystem){
      case 'Horse Power': {
        switch(this.secondSystem){
          case 'Kilowatt': {
            this.displayConversionRate = this.convertToSecondHpToKw(this.horsePowerToKilowatt);
            this.displayIconConversionRate = this.convertToIconsHpToKw(this.horsePowerToIcon);
            break;
          }
          case 'Horse Power': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.")
            console.log("Cannot convert to the same unit.");
            break;
          }
        }
        break;
      }
      case 'Kilowatt': {
        switch(this.secondSystem){
          case 'Horse Power': {
            this.displayConversionRate = this.convertToSecondKwToHp(this.kilowattToHorsePower);
            this.displayIconConversionRate = this.convertToIconsKwToHp(this.kilowattToIcon);
            break;
          }
          case 'Kilowatt': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.")
            console.log("Cannot convert to the same unit.");
            break;
          }
        }
        break;
      }
    }
  }
  

  convertToSecondHpToKw(conversionRate: number){
    this.secondValue = this.firstValue / conversionRate;
    return conversionRate;
  }
  convertToSecondKwToHp(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  }
  
  convertToIconsHpToKw(conversionRate: number){
    this.iconValue = this.firstValue * conversionRate;
    this.displayIcons = [];
    for(let index =0; index < this.iconValue; index++){
      this.displayIcons.push(index);
    }
    return conversionRate;
  }

  convertToIconsKwToHp(conversionRate: number){
    this.iconValue = this.firstValue * conversionRate;
    this.displayIcons = [];
    for(let index =0; index < this.iconValue; index++){
      this.displayIcons.push(index);
    }
    return conversionRate;
  }

  clearPowers(){
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
      this.displayIcons = [];
      this.displayPowerComponent = false;
    }else{
      console.log("Not cleared.")
    }

  }

}
