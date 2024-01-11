import { Component } from '@angular/core';

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

  displayConversionRate: number = 0;

  private readonly millilitersToTeaspoons: number = 0.202884;
  private readonly millilitersToTablespoons: number = 0.06763;
  private readonly millilitersToOunces: number = 0.0351950797;
  private readonly centilitersToTeaspoons: number = 2.02884;
  private readonly centilitersToTablespoons: number = 0.67628;
  private readonly centilitersToOunces: number = 0.33814;
  private readonly litersToTeaspoons: number = 202.884;
  private readonly litersToTablespoons: number = 67.628;
  private readonly litersToOunces: number = 33.814;

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


  volumeConversion(){
    switch(this.metricSystem){
      case 'Milliliters': {
        switch(this.americanSystem){
          case 'Teaspoons': {
            this.displayConversionRate = this.convertToAmerican(this.millilitersToTeaspoons);
            break;
          }
          case 'Tablespoons': {
            this.displayConversionRate = this.convertToAmerican(this.millilitersToTablespoons);
            break;
          }
          case 'Ounces': {
            this.displayConversionRate = this.convertToAmerican(this.millilitersToOunces);
            break;
          }
        }
        break;
      }
      case 'Centiliters': {
        switch(this.americanSystem){
          case 'Teaspoons':{
            this.displayConversionRate = this.convertToAmerican(this.centilitersToTeaspoons);
            break;
          }
          case 'Tablespoons': {
            this.displayConversionRate = this.convertToAmerican(this.centilitersToTablespoons);
            break;
          }
          case 'Ounces': {
            this.displayConversionRate = this.convertToAmerican(this.centilitersToOunces);
            break;
          }
        }
        break;
      }
      case 'Liters': {
        switch(this.americanSystem){
          case 'Teaspoons': {
            this.displayConversionRate = this.convertToAmerican(this.litersToTeaspoons);
            break;
          }
          case 'Tablespoons': {
            this.displayConversionRate = this.convertToAmerican(this.litersToTablespoons);
            break;
          }
          case 'Ounces': {
            this.displayConversionRate = this.convertToAmerican(this.litersToOunces);
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

  clearVolumes(){
    this.metricSystem = '';
    this.americanSystem = '';
    this.metricValue = 0;
    this.americanValue = 0;
    this.displayConversionRate = 0;
  }

}
