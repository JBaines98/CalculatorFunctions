import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css']
})
export class CurrentTimeComponent {
  
  @Input() isTimeForTitle: boolean = false;
  @Input() isTimeForSubTitle: boolean = false;
  
  public currentTime: Date = new Date();
  public intervalId = setInterval(this.getCurrentTime, 1000);

  getCurrentTime(){
    this.currentTime = new Date();
  }

}
