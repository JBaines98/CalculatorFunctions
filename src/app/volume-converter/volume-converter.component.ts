import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { LogCalculationsService } from '../logCalculations.service';

@Component({
  selector: 'app-volume-converter',
  templateUrl: './volume-converter.component.html',
  styleUrls: ['./volume-converter.component.css']
})
export class VolumeConverterComponent {


  metricSystem: string = '';
  americanSystem: string = '';

  metricValue: number = 0;
  americanValue: number = 0;

  litreValue: number = 0;
  displayLiters: number[] = [];
  litreIconName: string = 'fa-solid fa-bottle-water'

  displayConversionRate: number = 0;
  displayWaterBottleConversionRate: number = 0;

  iconValue: number = 50;
  iconUnit: string = 'cl';
  iconFirstAddition: number = 50;
  showVolumeKey: boolean = false;
  iconName: string = 'fa-solid fa-layer-group';
  titleString: string = 'Volume-converter';
  volumePanelState: boolean = false;

  private readonly millilitersToTeaspoons: number = 0.202884;
  private readonly millilitersToTablespoons: number = 0.06763;
  private readonly millilitersToOunces: number = 0.0351950797;
  private readonly centilitersToTeaspoons: number = 2.02884;
  private readonly centilitersToTablespoons: number = 0.67628;
  private readonly centilitersToOunces: number = 0.33814;
  private readonly litersToTeaspoons: number = 202.884;
  private readonly litersToTablespoons: number = 67.628;
  private readonly litersToOunces: number = 33.814;

  private readonly millilitersToWaterBottles: number = 0.001;
  private readonly centilitersToWaterBottles: number = 0.01;
  private readonly literstoWaterBottles: number = 2;

  metricVolumes: string[] = [
    "Milliliters",
    "Centiliters",
    "Liters"
  ];

  americanVolumes: string[] = [
    "Teaspoons",
    "Tablespoons",
    "Ounces"
  ];


  constructor(
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<VolumeConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
    public dialog: MatDialog){}

  volumeConversion(){
    switch(this.metricSystem){
      case 'Milliliters': {
        switch(this.americanSystem){
          case 'Teaspoons': {
            this.displayConversionRate = this.convertToAmerican(this.millilitersToTeaspoons);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.millilitersToWaterBottles);
            break;
          }
          case 'Tablespoons': {
            this.displayConversionRate = this.convertToAmerican(this.millilitersToTablespoons);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.millilitersToWaterBottles);
            break;
          }
          case 'Ounces': {
            this.displayConversionRate = this.convertToAmerican(this.millilitersToOunces);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.millilitersToWaterBottles);
            break;
          }
        }
        break;
      }
      case 'Centiliters': {
        switch(this.americanSystem){
          case 'Teaspoons':{
            this.displayConversionRate = this.convertToAmerican(this.centilitersToTeaspoons);
            this.displayWaterBottleConversionRate =  this.convertToWaterBottles(this.centilitersToWaterBottles);
            break;
          }
          case 'Tablespoons': {
            this.displayConversionRate = this.convertToAmerican(this.centilitersToTablespoons);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.centilitersToWaterBottles);
            break;
          }
          case 'Ounces': {
            this.displayConversionRate = this.convertToAmerican(this.centilitersToOunces);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.centilitersToWaterBottles);
            break;
          }
        }
        break;
      }
      case 'Liters': {
        switch(this.americanSystem){
          case 'Teaspoons': {
            this.displayConversionRate = this.convertToAmerican(this.litersToTeaspoons);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.literstoWaterBottles);
            break;
          }
          case 'Tablespoons': {
            this.displayConversionRate = this.convertToAmerican(this.litersToTablespoons);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.literstoWaterBottles);
            break;
          }
          case 'Ounces': {
            this.displayConversionRate = this.convertToAmerican(this.litersToOunces);
            this.displayWaterBottleConversionRate = this.convertToWaterBottles(this.literstoWaterBottles);
            break;
          }
        }
        break;
      }
    }
    this.showVolumeKey = true;
    this.saveVolumeClicked();
  }

  convertToAmerican(conversionRate: number){
    this.americanValue = this.metricValue * conversionRate;
    return conversionRate;
  }

  convertToWaterBottles(conversionRate: number){
    this.litreValue = this.metricValue * conversionRate;
    this.displayLiters = [];
    for(let index=0; index < this.litreValue; index++){
      this.displayLiters.push(index);
    }
    return conversionRate;
  }

  // volumeShowIcon(){
  //   if(this.showVolumeKey === false){
  //     this.showVolumeKey = true;
  //     this.showVolumeKeyCheck = true;
  //   }else{
  //     this.showVolumeKey = false;
  //     this.showVolumeKeyCheck = false;
  //   }
  // }

  saveVolumeClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.metricValue;
    converterCalculation.result = this.americanValue;
    converterCalculation.fromSystem = this.metricSystem;
    converterCalculation.toSystem = this.americanSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearVolumesClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Volume-converter', 
        message: 'Are you sure you want to clear volume-converter?',
        iconString: 'fa-solid fa-layer-group'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clearVolumes();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showVolumeKey = false;
  }

  clearVolumes(){
    this.metricSystem = '';
    this.americanSystem = '';
    this.metricValue = 0;
    this.americanValue = 0;
    this.displayConversionRate = 0;
    this.displayLiters = [];
    console.log("Cleared.");
  }

}
