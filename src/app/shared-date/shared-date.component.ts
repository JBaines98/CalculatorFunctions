import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-date',
  templateUrl: './shared-date.component.html',
  styleUrls: ['./shared-date.component.css']
})
export class SharedDateComponent {

  public currentDate: Date = new Date();
  public intervalId = setInterval(this.getCurrentDate, 1000);

  getCurrentDate(){
    this.currentDate = new Date();
  }
}
