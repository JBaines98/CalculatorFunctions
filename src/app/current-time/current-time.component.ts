import { Component, Input } from '@angular/core';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css']
})
export class CurrentTimeComponent {

  themeName: string = 'business';
  
  @Input() isTimeForTitle: boolean = false;
  @Input() isTimeForSubTitle: boolean = false;
  
  public currentTime: Date = new Date();
  public intervalId = setInterval(this.getCurrentTime, 1000);

  constructor(public themeService: ThemeService){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      })
    ).subscribe();
  }

  getCurrentTime(){
    this.currentTime = new Date();
  }

}