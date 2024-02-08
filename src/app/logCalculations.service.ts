import { Inject, Injectable } from '@angular/core';
import { AllCalculationData, Calculation, ConverterCalculation, CurrencyCalculation, DialogData, TrigonometryCalculation } from './models/calculationHistory.model';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LogCalculationsService {

  arrayOfCalculation: Calculation[] = [];

  private behaviourAllCalculationHistory$ = new BehaviorSubject<Calculation[]>([]);
  public allCalculationHistory$ = this.behaviourAllCalculationHistory$.asObservable();


  constructor(
    // public dialogRef: MatDialogRef<LogCalculationsService>,
    // public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data:  = {},
    
  ) { }


  // logTrigonometryCalculation(trigonometryCalculation: TrigonometryCalculation){
  //   let calculationToSave: AllCalculationData = {};
  //   calculationToSave.trigonometryCalculation = trigonometryCalculation;
  //   this.addCalculationsToRunningHistory(calculationToSave);
  // }

  // logConverterCalculation(converterCalculation: ConverterCalculation){
  //   let calculationToSave: AllCalculationData = {};
  //   calculationToSave.converterCalculation = converterCalculation;
  //   this.addCalculationsToRunningHistory(calculationToSave);
  // }

  // logCurrencyCalculation(currencyCalculation: CurrencyCalculation){
  //   let calculationToSave: AllCalculationData = {};
  //   calculationToSave.currencyCalculation = currencyCalculation;
  //   this.addCalculationsToRunningHistory(calculationToSave);
  // }

  // addCalculationsToRunningHistory(calculation: AllCalculationData){
  //   this.arrayOfCalculation.push(calculation);
  //   this.behaviourAllCalculationHistory$.next(this.arrayOfCalculation);
  //   console.log("XXXXXXXXXXXXXXXXXX");
  //   console.log(this.arrayOfCalculation);
  // }
  addCalculation(calculation: Calculation){
    this.arrayOfCalculation.push(calculation);
    this.behaviourAllCalculationHistory$.next(this.arrayOfCalculation);
    console.log("XXXXXXXXXXXXXXXXXX");
    console.log(this.arrayOfCalculation);
  }

  // displaySavedCalculations(){
  //   const dialogRef = this.dialog.open(AllCalculationsComponent, {
  //     height: 'fit-content',
  //     width: 'fit-content',
  //     data: this.arrayOfCalculation
  //   });
  // }


}
