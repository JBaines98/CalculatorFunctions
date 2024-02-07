import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.css']
})
export class TitleBannerComponent {


  @Input() public titleString: string = '';
  @Input() public iconName: string = '';
}
