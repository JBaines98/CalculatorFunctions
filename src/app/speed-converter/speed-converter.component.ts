import { Component } from '@angular/core';

@Component({
  selector: 'app-speed-converter',
  templateUrl: './speed-converter.component.html',
  styleUrls: ['./speed-converter.component.css']
})
export class SpeedConverterComponent {

  metricSystem: string = '';
  americanSystem: string = '';
  metricValue: number = 0;
  americanValue: number = 0;
  displayConversionRate: number = 0;
  
  private readonly metersPerSecondToFeetPerSecond: number = 3.28084;
  private readonly metersPerSecondToMilesPerHour: number = 2.23694;
  private readonly kilometersPerHourToFeetPerSecond: number = 0.911344;
  private readonly kilometersPerHourToMilesPerHour: number = 0.621371;

  metricQuantity: string[] = [
    "Meters per second",
    "Kilometers per hour"
  ]

  americanQuantity: string[] = [
    "Feet per second",
    "Miles per hour"
  ]

  speedConversion(){
    switch(this.metricSystem){
      case 'Meters per second': {
        switch(this.americanSystem){
          case 'Feet per second': {
            this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToFeetPerSecond);
            break;
          }
          case 'Miles per hour': {
            this.displayConversionRate = this.convertToAmerican(this.metersPerSecondToMilesPerHour);
            break;
          }
        }
        break;
      }
      case 'Kilometers per hour': {
        switch(this.americanSystem){
          case 'Feet per second': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToFeetPerSecond);
            break;
          }
          case 'Miles per hour': {
            this.displayConversionRate = this.convertToAmerican(this.kilometersPerHourToMilesPerHour);
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

  clearSpeed(){
    this.metricSystem = '';
    this.americanSystem = '';
    this.metricValue = 0;
    this.americanValue = 0;
    this.displayConversionRate = 0;
  }

}
