import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnDestroy {



  public dateGMT : Date | undefined = undefined;
  public dateEST : Date | undefined = undefined;
  public dateIST : Date | undefined = undefined;
  public dateJST : Date | undefined = undefined;
  public dateMSK : Date | undefined = undefined;
  public iconName: string = 'fa-regular fa-calendar-days';
  public titleString: string = 'Date & Time';
  public datePanelState: boolean = false;
  public themeName: string = 'business';
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

  timeGetGMT(){
   this.dateGMT = new Date();

  }

  timeToEST(){
    if(this.dateGMT){
      this.dateEST = this.minusHours(this.dateGMT, 5);
      console.log(this.dateEST);
    }else{
      this.timeGetGMT();
    }
  }

  timeToIST(){
    if(this.dateGMT){
      this.dateIST = this.addHours(this.dateGMT, 5);
      console.log(this.dateIST);
    }else{
      this.timeGetGMT();
    }
  }

  timeToJST(){
    if(this.dateGMT){
      this.dateJST = this.addHours(this.dateGMT, 9);
      console.log(this.dateJST);
    }else{
      this.timeGetGMT();
    }
  }

  timeToMSK(){
    if(this.dateGMT){
      this.dateMSK = this.addHours(this.dateGMT, 3);
      console.log(this.dateMSK);
    }else{
      this.timeGetGMT();
    }
  }

  addHours(date: Date, hours: number){
    var localDate = new Date(date.setTime(date.getTime() + hours * 60 * 60 * 1000));
    localDate.toDateString();
    localDate.toTimeString();
    return localDate;
  }

  minusHours(date: Date, hours: number){
    var localDate = new Date(date.setTime(date.getTime() - hours * 60 * 60 * 1000));
    localDate.toDateString();
    localDate.toTimeString();
    return localDate;
  }

  getAllTimes(){
    this.timeGetGMT();
    this.timeToIST();
    this.timeGetGMT();
    this.timeToEST();
    this.timeGetGMT();
    this.timeToJST();
    this.timeGetGMT();
    this.timeToMSK();
    this.timeGetGMT();
  }

  clearAllTimes(){
    this.dateGMT = undefined;
    this.dateEST = undefined;
    this.dateIST = undefined;
  }



}
