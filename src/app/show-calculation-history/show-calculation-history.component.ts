import { Component, OnDestroy } from '@angular/core';
import { LogCalculationsService } from '../logCalculations.service';
import { Calculation } from '../models/calculationHistory.model';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';

@Component({
  selector: 'app-show-calculation-history',
  templateUrl: './show-calculation-history.component.html',
  styleUrls: ['./show-calculation-history.component.css']
})
export class ShowCalculationHistoryComponent implements OnDestroy {

  public localCalculationArray: Calculation[] = [];
  public destroyed$ = new Subject();

  constructor(
    public logCalculations: LogCalculationsService,
  ){}

  ngOnDestroy(): void{
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  ngOnInit(){
    this.logCalculations.allCalculationHistory$.pipe(
      tap((calculationHistory) => {
        calculationHistory.toString();
        this.localCalculationArray = calculationHistory;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

}
