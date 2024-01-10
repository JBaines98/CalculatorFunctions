import { Component } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { Calculation } from '../models/calculationHistory.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sum-history',
  templateUrl: './sum-history.component.html',
  styleUrls: ['./sum-history.component.css']
})
export class SumHistoryComponent {

  constructor(public calculatorService: CalculatorService){}

  public allCalculationsHistory: Calculation[] = [];


  ngOnInit(){
    this.calculatorService.calculationHistory$.pipe(
      tap(calculationHistory => {
        this.allCalculationsHistory = calculationHistory;
      })
    ).subscribe();
  }

}
