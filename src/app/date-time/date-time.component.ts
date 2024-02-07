import { Component } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent {

  constructor(){}

  public dateGMT : Date | undefined = undefined;
  public dateEST : Date | undefined = undefined;
  public dateIST : Date | undefined = undefined;
  public dateJST : Date | undefined = undefined;
  public dateMSK : Date | undefined = undefined;
  public iconName: string = 'fa-regular fa-calendar-days';
  public titleString: string = 'Date & Time';

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
