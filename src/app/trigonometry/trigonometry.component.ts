import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Calculation, DialogData, TrigonometryCalculation } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { LogCalculationsService } from '../logCalculations.service';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-trigonometry',
  templateUrl: './trigonometry.component.html',
  styleUrls: ['./trigonometry.component.css']
})
export class TrigonometryComponent implements OnDestroy {

  angleInput: number = 0;
  hypotenuse: number = 0;
  opposite: number  = 0;
  adjacent: number  = 0;
  iconName: string = 'fa-solid fa-shapes';
  titleString: string = 'Trigonometry';
  trigonometryPanelState: boolean = false;
  themeName: string = 'business';
  calculation: TrigonometryCalculation = {};
  public destroyed$ = new Subject();

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<TrigonometryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData = {
      converterType: '',
      messege: '',
      iconString: ''
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

  trigonometrySin(){
    this.opposite = Math.sin(this.angleInput) * this.hypotenuse;
    this.trigonometryCos();
  }

  trigonometryCos(){
    this.hypotenuse = this.adjacent / Math.cos(this.angleInput);
    this.trigonometryTan();
  }

  trigonometryTan(){
    this.adjacent = this.opposite / Math.tan(this.angleInput);
    this.saveTrigonometryClicked();
  }

  saveTrigonometryClicked(){
    let trigonometryCalculation: TrigonometryCalculation = {};
    trigonometryCalculation.number1 = this.angleInput;
    trigonometryCalculation.function = 'Trigonometry';
    trigonometryCalculation.hypotenuse = this.hypotenuse;
    trigonometryCalculation.opposite = this.opposite;
    trigonometryCalculation.adjacent = this.adjacent;
    this.calculation = this.logCalculations.addTrigonometryCalculation(trigonometryCalculation);
    return this.calculation;
  }

  clearTrigonometryClciked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Trigonometry Calculator',
        message: 'Are you sure you want to clear trigonometry calculator?',
        iconString: 'fa-solid fa-shapes'
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearTrigonometry();
      }else{
        console.log("Not cleared.");
      }
    });
  }

  clearTrigonometry(){
    this.adjacent = 0;
    this.angleInput = 0;
    this.hypotenuse = 0;
    this.opposite = 0;
    this.calculation = {};
    console.log("Trigonometry functions cleared.")
  }

}
