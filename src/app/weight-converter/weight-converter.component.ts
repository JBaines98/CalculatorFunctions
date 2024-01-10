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

displayConversionRate: number = 0;

private readonly gramsToOunces: number = 0.035274;
private readonly gramsToPounds: number = 0.00220462;
private readonly kilogramsToOunces: number = 35.274;
private readonly kilogramsToPounds: number = 2.20462;

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
          break;
        }
        case 'Pounds': {
          this.displayConversionRate = this.convertToAmerican(this.gramsToPounds);
          break;
        }
      }
      break;
    }
    case 'Kilograms': {
      switch(this.poundSystem){
        case 'Ounces': {
          this.displayConversionRate = this.convertToAmerican(this.kilogramsToOunces);
          break;
        }
        case 'Pounds': {
          this.displayConversionRate = this.convertToAmerican(this.kilogramsToPounds);
          break;
        }
      }
      break;
    }
  }
}

  convertToAmerican(conversionRate: number){
    this.poundValue = this.gramValue * conversionRate
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
