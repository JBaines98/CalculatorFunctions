import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-shared-date',
  templateUrl: './shared-date.component.html',
  styleUrls: ['./shared-date.component.css']
})
export class SharedDateComponent implements OnDestroy{

  public themeName: string = 'business';
  public currentDate: Date = new Date();
  public intervalId = setInterval(this.getCurrentDate, 1000);
  public destroyed$ = new Subject();

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

  getCurrentDate(){
    this.currentDate = new Date();
  }
}
