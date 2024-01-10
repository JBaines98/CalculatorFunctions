import { Component } from '@angular/core';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.css']
})
export class LengthConverterComponent {

  metricSystem: string = '';
  americanSystem: string = '';

  metricValue: number = 0;
  americanValue: number = 0;

  displayConversionRate: number = 0;

  private readonly centermetersToInches: number = 0.393701;
  private readonly centermetersToFeet: number = 0.0328084;
  private readonly centermetersToMiles: number = 0.00000621;
  private readonly metersToInches: number = 39.3701;
  private readonly metersToFeet: number = 3.28084;
  private readonly metersToMiles: number = 0.000621371;
  private readonly kilometersToInches: number = 39370.1;
  private readonly kilometersToFeet: number = 3280.84;
  private readonly kilometersToMiles: number = 0.621371;



  metricMeasurements: string[] = [
    "Centermeters",
    "Meters",
    "Kilometers"
  ]

  americanMeasurements: string[] = [
    "Inches",
    "Feet",
    "Miles"
  ]

  lengthConverter(){
    switch(this.metricSystem){
      case 'Centermeters': {
        switch(this.americanSystem){
          case 'Inches': {
            this.displayConversionRate = this.convertToAmerican(this.centermetersToInches);
            break;
          }
          case 'Feet': {
            this.displayConversionRate = this.convertToAmerican(this.centermetersToFeet);
            break;
          }
          case 'Miles': {
            this.displayConversionRate = this.convertToAmerican(this.centermetersToMiles);
            break;
          }
        }
        break;
      }
      case 'Meters': {
        switch(this.americanSystem){
          case 'Inches': {
            this.displayConversionRate = this.convertToAmerican(this.metersToInches);
            break;
          }
          case 'Feet': {
            this.displayConversionRate = this.convertToAmerican(this.metersToFeet);
            break;
          }
          case 'Miles': {
            this.displayConversionRate = this.convertToAmerican(this.metersToMiles);
            break;
          }
        }
        break;
      }
      case 'Kilometers': {
        switch(this.americanSystem){
          case 'Inches': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersToInches);
            break;
          }
          case 'Feet': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersToFeet);
            break;
          }
          case 'Miles': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersToMiles);
            break;
          }
        }
        break;
      }
    }
    
  }

  convertToAmerican(conversionRate: number){
    this.americanValue = this.metricValue * conversionRate;
    return conversionRate;
  }

  clearLengths(){
    this.americanValue = 0;
    this.metricValue = 0;
    this.americanSystem = '';
    this.metricSystem = '';
    this.displayConversionRate = 0;
  }






}
