import { Component } from '@angular/core';

@Component({
  selector: 'app-food-energy-converter',
  templateUrl: './food-energy-converter.component.html',
  styleUrls: ['./food-energy-converter.component.css']
})
export class FoodEnergyConverterComponent {


  foodSystem: string = '';
  energySystem: string = '';
  foodValue: number = 0;
  energyValue: number = 0;
  appleValue: number = 0;
  displayConversionRate: number = 0;
  displayAppleConversionRate: number = 0;

  private readonly foodCaloriesToJoules: number = 4184;
  private readonly foodCaloriesToKiloJoules: number = 4.184;
  private readonly foodCaloriesToApples: number = 0.0105708245243129;

  foodQuantity: string = 'Food Calories';

  energyQuantity: string[] = [
    "Joules",
    "KiloJoules"
  ];

  energyConversion(){
    if(this.foodSystem === 'Food Calories'){
      switch(this.energySystem){
        case 'Joules': {
          this.displayConversionRate = this.convertToEnergy(this.foodCaloriesToJoules);
          this.convertToBananas(this.foodCaloriesToApples);
          break;
        }
        case 'KiloJoules': {
          this.displayConversionRate = this.convertToEnergy(this.foodCaloriesToKiloJoules);
          this.convertToBananas(this.foodCaloriesToApples);
          break;
        }
      }
    }
  }

  convertToEnergy(conversionRate: number){
    this.energyValue = this.foodValue * conversionRate;
    return conversionRate;
  }

  convertToBananas(conversionRate: number){
    this.appleValue = this.foodValue * conversionRate;
    return conversionRate;
  }

  clearQuantities(){
    this.foodSystem = '';
    this.energySystem = '';
    this.foodValue = 0;
    this.energyValue = 0;
    this.appleValue = 0;
    this.displayAppleConversionRate = 0;
    this.displayConversionRate = 0;
  }
}
