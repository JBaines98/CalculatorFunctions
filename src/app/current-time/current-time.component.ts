import { Component, Input, OnDestroy } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css']
})
export class CurrentTimeComponent implements OnDestroy{

  themeName: string = 'business';
  destroyed$ = new Subject();
  
  @Input() isTimeForTitle: boolean = false;
  @Input() isTimeForSubTitle: boolean = false;
  
  public currentTime: Date = new Date();
  public intervalId = setInterval(this.getCurrentTime, 1000);

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

  getCurrentTime(){
    this.currentTime = new Date();
  }

}