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
    this.exchangedValue = this.sterlingValue * 1.27;
    this.currencyIcon = 'fa-solid fa-dollar-sign';
    this.exchangeRate = 1.27;
    this.currency = "Dollar";
    this.saveCurrencyClicked(this.exchangeRate, this.currency);
  }

  euroExchange() {
    this.exchangedValue = this.sterlingValue * 1.16;
    this.currencyIcon = 'fa-solid fa-euro-sign';
    this.exchangeRate = 1.16;
    this.currency = "Euro";
    this.saveCurrencyClicked(this.exchangeRate, this.currency);
  }

  yenExchange() {
    this.exchangedValue = this.sterlingValue * 183.45;
    this.currencyIcon = 'fa-solid fa-yen-sign';
    this.exchangeRate = 183.45;
    this.currency = "Yen";
    this.saveCurrencyClicked(this.exchangeRate, this.currency);
  }

  wonExchange() {
    this.exchangedValue = this.sterlingValue * 1679.12;
    this.currencyIcon = 'fa-solid fa-won-sign';
    this.exchangeRate = 1679.12;
    this.currency = "Won";
    this.saveCurrencyClicked(this.exchangeRate, this.currency);
  }

  pesoExchange() {
    this.exchangedValue = this.sterlingValue * 21.48;
    this.currencyIcon = 'fa-solid fa-peso-sign';
    this.exchangeRate = 21.48;
    this.currency = "Peso";
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
    this.currencyIcon = 'fa-solid fa-sterling-sign';
    this.currency = '';
  }
}
