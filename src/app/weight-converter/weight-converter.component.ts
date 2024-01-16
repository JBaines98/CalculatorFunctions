import { Component } from '@angular/core';

@Component({
  selector: 'app-weight-converter',
  templateUrl: './weight-converter.component.html',
  styleUrls: ['./weight-converter.component.css']
})
export class WeightConverterComponent {

gramSystem: string = '';
poundSystem: string = '';

gramValue: number = 0;
poundValue: number = 0;

dumbBellValue: number = 0;
displayDumbBell: number[] = [];
dumbBellIconName: string = 'fa-solid fa-dumbbell';
displayConversionRate: number = 0;
displayDumbBellRate: number = 0;

private readonly gramsToOunces: number = 0.035274;
private readonly gramsToPounds: number = 0.00220462;
private readonly kilogramsToOunces: number = 35.274;
private readonly kilogramsToPounds: number = 2.20462;

private readonly gramsTo1kgDumbBells: number = 0.001;
private readonly kiloGramsTo1kgDumbBells: number = 1;

metricWeights: string[] = [
  "Grams",
  "Kilograms"
]

americanWeights: string[] = [
  "Ounces",
  "Pounds"
]

weightConverter(){
  switch(this.gramSystem){
    case 'Grams': {
      switch(this.poundSystem){
        case 'Ounces': {
          this.displayConversionRate = this.convertToAmerican(this.gramsToOunces);
          this.displayDumbBellRate = this.convertToDumbBells(this.gramsTo1kgDumbBells);
          break;
        }
        case 'Pounds': {
          this.displayConversionRate = this.convertToAmerican(this.gramsToPounds);
          this.displayDumbBellRate = this.convertToDumbBells(this.gramsTo1kgDumbBells);
          break;
        }
      }
      break;
    }
    case 'Kilograms': {
      switch(this.poundSystem){
        case 'Ounces': {
          this.displayConversionRate = this.convertToAmerican(this.kilogramsToOunces);
          this.displayDumbBellRate = this.convertToDumbBells(this.kiloGramsTo1kgDumbBells);
          break;
        }
        case 'Pounds': {
          this.displayConversionRate = this.convertToAmerican(this.kilogramsToPounds);
          this.displayDumbBellRate = this.convertToDumbBells(this.kiloGramsTo1kgDumbBells);
          break;
        }
      }
      break;
    }
  }
}

  convertToAmerican(conversionRate: number){
    this.poundValue = this.gramValue * conversionRate;
    return conversionRate;
  }

  convertToDumbBells(conversionRate: number){
    this.dumbBellValue = this.gramValue * conversionRate;
    this.displayDumbBell = [];
    for(let index=0; index < this.dumbBellValue; index++){
      this.displayDumbBell.push(index);
    }
    return conversionRate;
  }

  clearWeights(){
    this.gramValue = 0;
    this.poundValue = 0;
    this.displayConversionRate = 0;
    this.gramSystem = '';
    this.poundSystem = '';
  }

}
