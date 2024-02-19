import { Component, Input } from '@angular/core';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.css']
})
export class TitleBannerComponent {

  public themeName: string = 'business';

  @Input() public titleString: string = '';
  @Input() public iconName: string = '';

  constructor(public themeService: ThemeService){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      })
    ).subscribe();
  }


}
