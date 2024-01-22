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
  displayTenDegreeRate: number = 0;


  tenDegreeValue: number = 0;
  displayTenDegree: number[] = [];
  tenDegreeIconName: string = '';
  tenDegreeIconNameHot: string = 'fa-solid fa-fire';
  tenDegreeIconNameCold: string = 'fa-solid fa-snowflake';

  iconUnit: string = '°C';
  iconValue: number = 10;
  iconFirstAddition: number = 10;

  private readonly celciusToFahrenheit: number = 0;
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

  temperatureConversion(){

    if(this.fromSystem === this.toSystem){
      window.alert("Cannot convert to the same unit. Please choose a different unit.")
      console.log("Cannot convert to the same unit.");
    }else{

      if(this.fromValue > 15){
        switch(this.fromSystem){
          case 'Celcius': {
            switch(this.toSystem){
              case 'Fahrenheit': {
                this.displayConversionRate = this.convertTo(this.celciusToFahrenheit);
                this.displayTenDegreeRate = this.convertToHeatIcon(this.celciusToTenDegrees);
                break;
              }
            }
            break;
          }
          case 'Fahrenheit': {
            switch(this.toSystem){
              case 'Celcius': {
                this.displayConversionRate = this.convertTo(this.fahrenheitToCelcius);
                this.displayTenDegreeRate = this.convertToHeatIcon(this.fahrenheitToTenDegrees);
                break;
              }
            }
            break;
          }
        }
      }else{
        switch(this.fromSystem){
          case 'Celcius': {
            switch(this.toSystem){
              case 'Fahrenheit': {
                this.displayConversionRate = this.convertTo(this.celciusToFahrenheit);
                this.displayTenDegreeRate = this.convertToColdIcon(this.celciusToTenDegrees);
                break;
              }
            }
            break;
          }
          case 'Fahrenheit': {
            switch(this.toSystem){
              case 'Celcius': {
                this.displayConversionRate = this.convertTo(this.fahrenheitToCelcius);
                this.displayTenDegreeRate = this.convertToColdIcon(this.fahrenheitToTenDegrees);
                break;
              }
            }
            break;
          }
        }
      }







    }

  }

  convertTo(conversionRate: number){
    this.toValue = this.fromValue * conversionRate;
    return conversionRate;
  }

  convertToHeatIcon(conversionRate: number){
    this.tenDegreeValue = this.fromValue * conversionRate;
    this.displayTenDegree = [];
    for(let index=0; index < this.tenDegreeValue; index++){
      this.displayTenDegree.push(index);
    }
    this.tenDegreeIconName = this.tenDegreeIconNameHot;
    return conversionRate;
  }

  convertToColdIcon(conversionRate: number){
    this.tenDegreeValue = this.fromValue * conversionRate;
    this.displayTenDegree = [];
    for(let index = 0; index < this.tenDegreeValue; index++){
      this.displayTenDegree.push(index);
    }
    this.tenDegreeIconName = this.tenDegreeIconNameCold;
    return conversionRate;
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

  }

}
