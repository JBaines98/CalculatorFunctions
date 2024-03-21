import { Component, Inject } from '@angular/core';
import { Subject, pipe, takeUntil, tap } from 'rxjs';
import { ThemeService } from '../theme.service';
import { LogCalculationsService } from '../logCalculations.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-area-converter',
  templateUrl: './area-converter.component.html',
  styleUrls: ['./area-converter.component.css']
})
export class AreaConverterComponent {

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate: number = 0;
  displayIconConversionRate: number = 0;
  iconValue: number = 0;
  iconUnit: number = 0;
  iconFirstAddition: number = 0;
  displayIcons: number[] = [];
  iconName: string = 'fa-solid fa-mound';
  displayAreaComponent: boolean = false;
  clearAreaValue: boolean = false;
  showAreaKey: boolean = false;
  titleString: string = 'Area-converter';
  areaPanelState: boolean = false;
  themeName: string = 'business';
  public destroyed$ = new Subject();

  public squarefootToSquaremetre: number = 0.092903;
  public squarefootToAcre: number = 0;
  public squarefootToHectare: number = 0;
  public squarefootToSquaremile: number = 0;
  public squaremetreToSquarefoot: number = 0;
  public squaremetreToAcre: number = 0;
  public squaremetreToHectare: number = 0;
  public squaremetreToSquaremile: number =0;
  public acreToSquarefoot: number = 0;
  public acreToSquaremetre: number = 0;
  public acreToHectare: number = 0;
  public acreToSquaremile: number = 0;
  public hectareToSquarefoot: number = 0;
  public hectareToSquaremetre: number = 0;
  public hectareToAcre: number = 0;
  public hectareToSquaremile: number = 0;
  public squaremileToSquarefoot: number = 0;
  public squaremileToSquaremetre: number = 0;
  public squaremileToAcre: number = 0;
  public squaremileToHectare: number = 0;
  public squarefootToIcon: number = 0;
  public squaremetreToIcon: number = 0;
  public acreToIcon: number = 0;
  public hectareToIcon: number = 0;
  public squaremileToIcon: number = 0;

  firstQuantity: string[] = [
    'Square Foot',
    'Square Metre',
    'Acre',
    'Hectare',
    'Square Mile'
  ];

  secondQuantity: string[] = [
    'Square Foot',
    'Square Metre',
    'Acre',
    'Hectare',
    'Square Mile'
  ];

  constructor(
    public themeService: ThemeService,
    public logCalculationsService: LogCalculationsService,
    public dialogRef: MatDialogRef<AreaConverterComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
  ){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void{
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  areaConversion(){
    switch(this.firstSystem){
      case 'Square Foot': {
        switch(this.secondSystem){
          case 'Square Foot': {
            window.alert("Cannot convert to the same unit. PLease choose a different unit.");
            console.log("Cannot convert to the same unit.")
            break;
          }
          case 'Square Metre': {
            this.displayConversionRate = this.convertToSecondSystem(this.squarefootToSquaremetre);
            this.displayIconConversionRate = this.convertToIcon(this.squaremetreToIcon);
            break;
          }
          case 'Acre': {
            this.displayConversionRate = this.convertToSecondSystem(this.squarefootToAcre);
            this.displayIconConversionRate = this.convertToIcon(this.acreToIcon);
            break;
          }
          case 'Hectare': {
            this.displayConversionRate = this.convertToSecondSystem(this.squarefootToHectare);
            this.displayIconConversionRate = this.convertToIcon(this.hectareToIcon);
            break;
          }
          case 'Square Mile': {
            this.displayConversionRate = this.convertToSecondSystem(this.squarefootToSquaremile);
            this.displayIconConversionRate = this.convertToIcon(this.squaremileToIcon);
            break;
          }
        }
        break;
      }
      case 'Square Metre': {
        switch(this.secondSystem){
          case 'Square Foot': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremetreToSquarefoot);
            this.displayIconConversionRate = this.convertToIcon(this.squarefootToIcon);
            break;
          }
          case 'Square Metre': {
            window.alert("Cannot convert to the same unit. PLease choose a different unit.");
            console.log("Cannot convert to the same unit.")
            break;
          }
          case 'Acre': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremetreToAcre);
            this.displayIconConversionRate = this.convertToIcon(this.acreToIcon);
            break;
          }
          case 'Hectare': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremetreToHectare);
            this.displayIconConversionRate = this.convertToIcon(this.hectareToIcon);
            break;
          }
          case 'Square Mile': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremetreToSquaremile);
            this.displayIconConversionRate = this.convertToIcon(this.squaremileToIcon);
            break;
          }
        }
        break;
      }
      case 'Acre': {
        switch(this.secondSystem){
          case 'Square Foot': {
            this.displayConversionRate = this.convertToSecondSystem(this.acreToSquarefoot);
            this.displayIconConversionRate = this.convertToIcon(this.squarefootToIcon);
            break;
          }
          case 'Square Metre': {
            this.displayConversionRate = this.convertToSecondSystem(this.acreToSquaremetre);
            this.displayIconConversionRate = this.convertToIcon(this.squaremetreToIcon);
            break;
          }
          case 'Acre': {
            window.alert("Cannot convert to the same unit. PLease choose a different unit.");
            console.log("Cannot convert to the same unit.")
            break;
          }
          case 'Hectare': {
            this.displayConversionRate = this.convertToSecondSystem(this.acreToHectare);
            this.displayIconConversionRate = this.convertToIcon(this.hectareToIcon);
            break;
          }
          case 'Square Mile': {
            this.displayConversionRate = this.convertToSecondSystem(this.acreToSquaremile);
            this.displayIconConversionRate = this.convertToIcon(this.squaremileToIcon);
            break;
          }
        }
        break;
      }
      case 'Hectare': {
        switch(this.secondSystem){
          case 'Square Foot': {
            this.displayConversionRate = this.convertToSecondSystem(this.hectareToSquarefoot);
            this.displayIconConversionRate = this.convertToIcon(this.squarefootToIcon);
            break;
          }
          case 'Square Metre': {
            this.displayConversionRate = this.convertToSecondSystem(this.hectareToSquaremetre);
            this.displayIconConversionRate = this.convertToIcon(this.squaremetreToIcon);
            break;
          }
          case 'Acre': {
            this.displayConversionRate = this.convertToSecondSystem(this.hectareToAcre);
            this.displayIconConversionRate = this.convertToIcon(this.acreToIcon);
            break;
          }
          case 'Hectare': {
            window.alert("Cannot convert to the same unit. PLease choose a different unit.");
            console.log("Cannot convert to the same unit.")
            break;
          }
          case 'Square Mile': {
            this.displayConversionRate = this.convertToSecondSystem(this.hectareToSquaremile);
            this.displayIconConversionRate = this.convertToIcon(this.squaremileToIcon);
            break;
          }
        }
        break;
      }
      case 'Square Mile': {
        switch(this.secondSystem){
          case 'Square Foot': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremileToSquarefoot);
            this.displayIconConversionRate = this.convertToIcon(this.squarefootToIcon);
            break;
          }
          case 'Square Metre': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremileToSquaremetre);
            this.displayIconConversionRate = this.convertToIcon(this.squaremetreToIcon);
            break;
          }
          case 'Acre': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremileToAcre);
            this.displayIconConversionRate = this.convertToIcon(this.acreToIcon);
            break;
          }
          case 'Hectare': {
            this.displayConversionRate = this.convertToSecondSystem(this.squaremileToHectare);
            this.displayIconConversionRate = this.convertToIcon(this.hectareToIcon);
            break;
          }
          case 'Square Mile': {
            window.alert("Cannot convert to the same unit. PLease choose a different unit.");
            console.log("Cannot convert to the same unit.")
            break;
          }
        }
        break;
      }
    };
  };

  convertToSecondSystem(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  };

  convertToIcon(conversionRate: number){
    this.iconValue = this.firstValue * conversionRate;
    this.displayIcons = [];
    for(let index = 0; index < this.iconValue; index++){
      this.displayIcons.push(index);
    }
    return conversionRate;
  };

  saveAreaClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculationsService.addCalculation(converterCalculation);
  };

  clearAreaClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Area',
        messege: 'Are you sure you want to clear the Area conversion?',
        iconString: 'fa-solid fa-mound'
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearArea();
      }else{
        console.log("Not Cleared.");
      }
    });
    this.showAreaKey = false;
  }

  clearArea(){
    this.firstSystem = '';
    this.secondSystem = '';
    this.firstValue = 0;
    this.secondValue = 0;
    this.displayConversionRate = 0;
    this.displayIcons = [];
    this.displayAreaComponent = false;
    console.log("Cleared.")
  };

}
