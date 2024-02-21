import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { CalculatorService } from './calculator.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from './models/calculationHistory.model';
import { ClearDialogComponent } from './clear-dialog/clear-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ThemeService } from './theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'AngularPractiseTextbox';
  names: string = "";
  arrayOfNames: string[] = [];
  arrayOfNamesAlphabetical: string[] =[];
  reverseArray: string[] = [];
  showButton: boolean = false;
  displaySumHistory: boolean = false;
  iconName: string = 'fa-solid fa-calculator';
  titleString: string = 'Calculator';
  calculatorPanelState: boolean = false;
  themeName: string = 'business';
  public destroyed$ = new Subject();

  constructor(    
    public calculatorService: CalculatorService,
    public themeService: ThemeService,
    public dialogRef: MatDialogRef<AppComponent>,
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


  onSubmit(inputedNames: string)
  {
    this.arrayOfNames = inputedNames.split(",");

    let trimmedArray: string[] =[];
    for(let name of this.arrayOfNames)
    {
      trimmedArray.push(name.trim());
    }
    this.arrayOfNamesAlphabetical = trimmedArray.sort();
    
    console.log(this.arrayOfNamesAlphabetical);

    this.showButton = true;
  }

  homeButtonClicked(){
    this.calculatorPanelState = false;
    this.changeTheme('business');
  }

  reverseOrder()
  {
    this.reverseArray = this.arrayOfNames.sort().reverse();
    this.arrayOfNamesAlphabetical = this.reverseArray;
  }

  onNumberClicked(value: any): void
  {
    this.calculatorService.numberClicked(value);
  }

  onFunctionClicked(function2: string): void
  {
    this.calculatorService.functionClicked(function2);
  }

  onEqualClicked()
  {
    this.calculatorService.equalClicked();
  }

  onClearClicked()
  {
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Standard Calculator',
        message: 'Are you sure you want to clear the standard calculator?',
        iconString: 'fa-solid fa-calculator'
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.calculatorService.clearClicked();
      }else{
        console.log("Not cleared.");
      }
    });

  }

  onBackSpaceClicked()
  {
    this.calculatorService.backSpaceClicked();
  }

  showSumHistory()
  {
    if (this.displaySumHistory === true)
    {
      this.displaySumHistory = false;
    }else{
      this.displaySumHistory = true;
    }
  }


  changeTheme(theme: string){
    this.themeService.themeChange(theme);
  }
}
