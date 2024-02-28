import { Component, OnDestroy } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { ConverterCalculation, CurrencyCalculation } from '../models/calculationHistory.model';
import { LogCalculationsService } from '../logCalculations.service';
import { ThemeService } from '../theme.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnDestroy{

  sterlingValue: number = 0;
  exchangedValue: number = 0;
  exchangeRate: number = 0;
  currency: string = '';
  currencyIcon: string = 'fa-solid fa-sterling-sign';



  title: string = 'Currency-converter';
  currencyPanelState: boolean = false;
  themeName: string = 'business';
  destoryed$ = new Subject();

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public calculatorService: CalculatorService) {
      this.themeService.themeName$.pipe(
        tap((theme) => {
          this.themeName = theme;
        }),
        takeUntil(this.destoryed$)
      ).subscribe();
    }

  ngOnDestroy(): void {
    this.destoryed$.next(this.destoryed$);
    this.destoryed$.complete();
  }

  dollarExchange() {
    let exchangedValue = this.sterlingValue * 1.27;
    let currencyIcon = 'fa-solid fa-dollar-sign';
    let exchangeRate = 1.27;
    let currency = "Dollar";
    this.generalExchange(exchangedValue, exchangeRate, currencyIcon, currency);
  }

  euroExchange() {
    let exchangedValue = this.sterlingValue * 1.16;
    let currencyIcon = 'fa-solid fa-euro-sign';
    let exchangeRate = 1.16;
    let currency = "Euro";
    this.generalExchange(exchangedValue, exchangeRate, currencyIcon, currency);
  }

  yenExchange() {
    let exchangedValue = this.sterlingValue * 183.45;
    let currencyIcon = 'fa-solid fa-yen-sign';
    let exchangeRate = 183.45;
    let currency = "Yen";
    this.generalExchange(exchangedValue, exchangeRate, currencyIcon, currency);
  }

  wonExchange() {
    let exchangedValue = this.sterlingValue * 1679.12;
    let currencyIcon = 'fa-solid fa-won-sign';
    let exchangeRate = 1679.12;
    let currency = "Won";
    this.generalExchange(exchangedValue, exchangeRate, currencyIcon, currency);
  }

  pesoExchange() {
    let exchangedValue = this.sterlingValue * 21.48;
    let currencyIcon = 'fa-solid fa-peso-sign';
    let exchangeRate = 21.48;
    let currency = "Peso";
    this.generalExchange(exchangedValue, exchangeRate, currencyIcon, currency);
  }

  generalExchange(exchangedValue: number, exchangeRate: number, currencyIcon: string, currency: string){
    this.exchangedValue= exchangedValue;
    this.currencyIcon = currencyIcon;
    this.exchangeRate = exchangeRate;
    this.currency = currency;
    this.saveCurrencyClicked(this.exchangeRate, this.currency);

  }

  saveCurrencyClicked(conversionRate: number, currency: string){
    let currencyCalculation: CurrencyCalculation = {};
    currencyCalculation.sterlingValue = this.sterlingValue;
    currencyCalculation.convertedValue = this.exchangedValue;
    currencyCalculation.conversionRate = conversionRate;
    currencyCalculation.toCurrency = currency;
    this.logCalculations.addCalculation(currencyCalculation);
  }

  clearExchange(){
    this.sterlingValue = 0;
    this.exchangedValue = 0;
    this.exchangeRate = 0;
    this.currencyIcon = 'fa-solid fa-sterling-sign';
    this.currency = '';
  }
}
