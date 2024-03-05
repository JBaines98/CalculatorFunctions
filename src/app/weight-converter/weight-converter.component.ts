import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { LogCalculationsService } from '../logCalculations.service';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-weight-converter',
  templateUrl: './weight-converter.component.html',
  styleUrls: ['./weight-converter.component.css']
})
export class WeightConverterComponent implements OnDestroy{

gramSystem: string = '';
poundSystem: string = '';

gramValue: number = 0;
poundValue: number = 0;

dumbBellValue: number = 0;
displayDumbBell: number[] = [];
dumbBellIconName: string = 'fa-solid fa-dumbbell';
displayConversionRate: number = 0;
displayDumbBellRate: number = 0;

iconValue: number = 1;
iconUnit: string = 'Kg';
iconFirstAddition: number = 1;
showWeightKey: boolean = false;
showWeightKeyCheck: boolean = false;
iconName: string = 'fa-solid fa-weight-hanging';
titleString: string = 'Weight-converter';
weightPanelState: boolean = false;
themeName: string = 'business';
public destroyed$ = new Subject();

public gramsToOunces: number = 0.035274;
public gramsToPounds: number = 0.00220462;
public kilogramsToOunces: number = 35.274;
public kilogramsToPounds: number = 2.20462;

private readonly gramsTo1kgDumbBells: number = 0.001;
private readonly kiloGramsTo1kgDumbBells: number = 1;

metricWeights: string[] = [
  "Grams",
  "Kilograms"
];

americanWeights: string[] = [
  "Ounces",
  "Pounds"
];

constructor(
  public themeService: ThemeService,
  public logCalculations: LogCalculationsService,
  public dialogRef: MatDialogRef<WeightConverterComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData = {
    converterType: '',
    messege: '',
    iconString: '',
  },
  public dialog: MatDialog){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

weightConverter(){
  switch(this.gramSystem){
    case 'Grams': {
      switch(this.poundSystem){
        case 'Ounces': {
          this.displayConversionRate = this.convertToAmerican(this.gramsToOunces);
          this.displayDumbBellRate = this.convertToDumbBells(this.gramsTo1kgDumbBells);
          break;
        }
        case 'Pounds': {
          this.displayConversionRate = this.convertToAmerican(this.gramsToPounds);
          this.displayDumbBellRate = this.convertToDumbBells(this.gramsTo1kgDumbBells);
          break;
        }
      }
      break;
    }
    case 'Kilograms': {
      switch(this.poundSystem){
        case 'Ounces': {
          this.displayConversionRate = this.convertToAmerican(this.kilogramsToOunces);
          this.displayDumbBellRate = this.convertToDumbBells(this.kiloGramsTo1kgDumbBells);
          break;
        }
        case 'Pounds': {
          this.displayConversionRate = this.convertToAmerican(this.kilogramsToPounds);
          this.displayDumbBellRate = this.convertToDumbBells(this.kiloGramsTo1kgDumbBells);
          break;
        }
      }
      break;
    }
  }
  this.showWeightKey = true;
  this.saveWeightClicked();
}

  convertToAmerican(conversionRate: number){
    this.poundValue = this.gramValue * conversionRate;
    return conversionRate;
  }

  convertToDumbBells(conversionRate: number){
    this.dumbBellValue = this.gramValue * conversionRate;
    this.displayDumbBell = [];
    for(let index=0; index < this.dumbBellValue; index++){
      this.displayDumbBell.push(index);
    }
    return conversionRate;
  }

  // weightShowIcon(){
  //   if(this.showWeightKey === false){
  //     this.showWeightKey = true;
  //     this.showWeightKeyCheck = true;
  //   }else{
  //     this.showWeightKey = false;
  //     this.showWeightKeyCheck = false;
  //   };
  // }

  saveWeightClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.gramValue;
    converterCalculation.result = this.poundValue;
    converterCalculation.fromSystem = this.gramSystem;
    converterCalculation.toSystem = this.poundSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearWeightsClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {converterType: 'Weight-converter', message: 'Are you sure you want to clear weight-converter?', iconString: 'fa-solid fa-dumbbell'}
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearWeights();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showWeightKey = false;
  }

  clearWeights(){
    this.gramValue = 0;
    this.poundValue = 0;
    this.displayConversionRate = 0;
    this.gramSystem = '';
    this.poundSystem = '';
    console.log("Cleared");
  }

}
