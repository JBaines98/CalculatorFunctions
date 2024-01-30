import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconKey } from '../models/calculationHistory.model';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-icon-displayer',
  templateUrl: './icon-displayer.component.html',
  styleUrls: ['./icon-displayer.component.css']
})
export class IconDisplayerComponent {


  @Input() public iconArray: any = [];
  @Input() public iconName: string = '';
  @Input() public iconValue: number = 0;
  @Input() public iconUnit: string = '';
  @Input() public iconFirstAddition: number = 0;
  @Input() public displaySpeedComponent: boolean = false;
  @Input() public displayTemperatureComponent: boolean = false;
  @Input() public displayPowerComponent: boolean = false;
  @Input() public displayPressureComponent: boolean = false;
  incrementalValue: any | undefined = undefined;

  // @Input() public iconOverallKey: IconKey = {
  //   iconName: '',
  //   iconKey: 0
  // };

  getIndex(index: number){
    let iconKey = this.getIconKey(index, this.iconValue, this.iconUnit);
    return iconKey;
  }

  getIconKey(index: number, iconValue: number, iconUnit: string){
    this.incrementalValue = this.getIncrementalValue(index, iconValue);
    this.incrementalValue.toString();
    let iconKey = this.incrementalValue + iconUnit;
    return iconKey;
  }

  getIncrementalValue(index: number, iconValue: number){
    let incrementalValue = index * iconValue;
    this.incrementalValue = incrementalValue + this.iconFirstAddition;
    return this.incrementalValue
  }

}
