import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-shared-date',
  templateUrl: './shared-date.component.html',
  styleUrls: ['./shared-date.component.css']
})
export class SharedDateComponent {

  public themeName: string = 'business';
  public currentDate: Date = new Date();
  public intervalId = setInterval(this.getCurrentDate, 1000);

  constructor(public themeService: ThemeService){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      })
    ).subscribe();
  }

  getCurrentDate(){
    this.currentDate = new Date();
  }
}
