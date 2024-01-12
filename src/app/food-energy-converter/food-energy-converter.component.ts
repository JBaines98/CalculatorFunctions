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
  bananaValue: number = 0;
  displayConversionRate: number = 0;
  displayBananaConversionRate: number = 0;

  private readonly foodCaloriesToJoules: number = 4184;
  private readonly foodCaloriesToKiloJoules: number = 4.184;
  private readonly foodCaloriesToBananas: number = 0.0112359550561798;

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
          this.convertToBananas(this.foodCaloriesToBananas);
          break;
        }
        case 'KiloJoules': {
          this.displayConversionRate = this.convertToEnergy(this.foodCaloriesToKiloJoules);
          this.convertToBananas(this.foodCaloriesToBananas);
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
    this.bananaValue = this.foodValue * conversionRate;
    return conversionRate;
  }

  clearQuantities(){
    this.foodSystem = '';
    this.energySystem = '';
    this.foodValue = 0;
    this.energyValue = 0;
    this.bananaValue = 0;
    this.displayBananaConversionRate = 0;
    this.displayConversionRate = 0;
  }
}
