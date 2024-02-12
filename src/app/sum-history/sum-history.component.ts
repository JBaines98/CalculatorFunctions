import { Component, OnDestroy } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { Calculation } from '../models/calculationHistory.model';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';

@Component({
  selector: 'app-sum-history',
  templateUrl: './sum-history.component.html',
  styleUrls: ['./sum-history.component.css']
})
export class SumHistoryComponent implements OnDestroy {

  public allCalculationsHistory: Calculation[] = [];
  public destroyed$ = new Subject();

  constructor(public calculatorService: CalculatorService){}


  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }




  ngOnInit(){
    this.calculatorService.calculationHistory$.pipe(
      tap(calculationHistory => {
        this.allCalculationsHistory = calculationHistory;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }
}
