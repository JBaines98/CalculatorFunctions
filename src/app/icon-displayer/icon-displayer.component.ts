import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-icon-displayer',
  templateUrl: './icon-displayer.component.html',
  styleUrls: ['./icon-displayer.component.css']
})
export class IconDisplayerComponent {







  @Input() public iconArray: any = [];
  @Input() public iconName: string = '';

  private oneLitreWaterIcon: string = 'X';
  private oneKilogramWeight: string = 'X';
  private oneFootLength: string = 'x';
  private tenDegreesTemperature: string = 'X';






}
