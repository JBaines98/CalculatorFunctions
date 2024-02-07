import { Component } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent {
  sterlingValue: number = 0;
  exchangedValue: number = 0;
  currency: string = 'fa-solid fa-sterling-sign';
  title: string = 'Currency-converter';

  constructor(public calculatorService: CalculatorService) {}

  dollarExchange() {
    this.exchangedValue = this.sterlingValue * 1.27;
    this.currency = 'fa-solid fa-dollar-sign';
  }

  euroExchange() {
    this.exchangedValue = this.sterlingValue * 1.16;
    this.currency = 'fa-solid fa-euro-sign';
  }

  yenExchange() {
    this.exchangedValue = this.sterlingValue * 183.45;
    this.currency = 'fa-solid fa-yen-sign';
  }

  wonExchange() {
    this.exchangedValue = this.sterlingValue * 1679.12;
    this.currency = 'fa-solid fa-won-sign';
  }

  pesoExchange() {
    this.exchangedValue = this.sterlingValue * 21.48;
    this.currency = 'fa-solid fa-peso-sign';
  }

  clearExchange(){
    this.sterlingValue = 0;
    this.exchangedValue = 0;
    this.currency = 'fa-solid fa-sterling-sign';
  }
}
