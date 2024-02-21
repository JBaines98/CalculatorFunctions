import { Component, Input, OnDestroy } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.css']
})
export class TitleBannerComponent implements OnDestroy{

  public themeName: string = 'business';
  public destroyed$ = new Subject();

  @Input() public titleString: string = '';
  @Input() public iconName: string = '';

  constructor(public themeService: ThemeService){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }


}
