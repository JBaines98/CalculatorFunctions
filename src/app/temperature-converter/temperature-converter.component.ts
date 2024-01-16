import { Component } from '@angular/core';

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

  private readonly celciusToFahrenheit: number = 0;
  private readonly fahrenheitToCelcius: number = 0;

  fromQuantity: string[] = [
    "Celcius",
    "Fahrenheit"
  ]

  toQuantity: string[] = [
    "Fahrenheit",
    "Celcius"
  ]

  temperatureConversion(){

    if(this.fromSystem === this.toSystem){
      window.alert("Cannot convert to the same unit. Please choose a different unit.")
      console.log("Cannot convert to the same unit.");
    }else{
      switch(this.fromSystem){
        case 'Celcius': {
          switch(this.toSystem){
            case 'Fahrenheit': {
              this.displayConversionRate = this.convertTo(this.celciusToFahrenheit);
              break;
            }
          }
          break;
        }
        case 'Fahrenheit': {
          switch(this.toSystem){
            case 'Celcius': {
              this.displayConversionRate = this.convertTo(this.fahrenheitToCelcius);
              break;
            }
          }
          break;
        }
      }
    }

  }

  convertTo(conversionRate: number){
    this.toValue = this.fromValue * conversionRate;
    return conversionRate;
  }

  clearTemperature(){
    this.fromValue = 0;
    this.toValue = 0;
    this.fromSystem = '';
    this.toSystem = '';
    this.displayConversionRate = 0;

  }

}
