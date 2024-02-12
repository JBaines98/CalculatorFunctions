import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { LogCalculationsService } from '../logCalculations.service';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';

@Component({
  selector: 'app-food-energy-converter',
  templateUrl: './food-energy-converter.component.html',
  styleUrls: ['./food-energy-converter.component.css']
})
export class FoodEnergyConverterComponent implements OnDestroy {


  foodSystem: string = '';
  energySystem: string = '';
  foodValue: number = 0;
  energyValue: number = 0;
  appleValue: number = 0;
  displayConversionRate: number = 0;
  displayAppleConversionRate: number = 0;
  displayApples: number[] = [];
  appleIconName: string = 'fa-solid fa-apple-whole';

  iconValue: number = 327;
  iconUnit: string = 'Kj'
  iconFirstAddition: number = 327;
  showFoodKey: boolean = false;
  showFoodKeyCheck: boolean = false;
  iconName: string = 'fa-solid fa-burger';
  titleString: string = 'Food Calorie-converter';
  foodPanelState: boolean = false;

  public destroyed$ = new Subject();

  private readonly foodCaloriesToJoules: number = 4184;
  private readonly foodCaloriesToKiloJoules: number = 4.184;
  private readonly foodCaloriesToApples: number = 0.0105708245243129;

  foodQuantity: string = 'Food Calories';

  energyQuantity: string[] = [
    "Joules",
    "KiloJoules"
  ];

  constructor(
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<FoodEnergyConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
    public dialog: MatDialog){}



  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  energyConversion(){
    if(this.foodSystem === 'Food Calories'){
      switch(this.energySystem){
        case 'Joules': {
          this.displayConversionRate = this.convertToEnergy(this.foodCaloriesToJoules);
          this.convertToApples(this.foodCaloriesToApples);
          break;
        }
        case 'KiloJoules': {
          this.displayConversionRate = this.convertToEnergy(this.foodCaloriesToKiloJoules);
          this.convertToApples(this.foodCaloriesToApples);
          break;
        }
      }
    }
    this.showFoodKey = true;
    this.saveFoodClicked();
  }

  convertToEnergy(conversionRate: number){
    this.energyValue = this.foodValue * conversionRate;
    return conversionRate;
  }

  convertToApples(conversionRate: number){
    this.appleValue = this.foodValue * conversionRate;
    this.displayApples = [];
    for(let index = 0; index < this.appleValue; index++){
      this.displayApples.push(index);
    }
    return conversionRate;
  }

  // foodShowIcon(){
  //   if(this.showFoodKey === false){
  //     this.showFoodKey = true;
  //     this.showFoodKeyCheck = true;
  //   }else{
  //     this.showFoodKey = false;
  //     this.showFoodKeyCheck = false;
  //   };
  // }

  saveFoodClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.foodValue;
    converterCalculation.result = this.energyValue;
    converterCalculation.fromSystem = this.foodSystem;
    converterCalculation.toSystem = this.energySystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearQuantitiesClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Food-converter',
        message: 'Are you sure you want to clear food-converter?',
        iconString: 'fa-solid fa-burger'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.clearQuantities();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showFoodKey = false;
  }

  clearQuantities(){
    this.foodSystem = '';
    this.energySystem = '';
    this.foodValue = 0;
    this.energyValue = 0;
    this.appleValue = 0;
    this.displayAppleConversionRate = 0;
    this.displayConversionRate = 0;
    this.displayApples = [];
    console.log("Cleared.");
  }
}
