import { Component, Inject } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ThemeService } from '../theme.service';
import { LogCalculationsService } from '../logCalculations.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';


@Component({
  selector: 'app-force-converter',
  templateUrl: './force-converter.component.html',
  styleUrls: ['./force-converter.component.css']
})
export class ForceConverterComponent {

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate: number = 0;
  displayIconConversionRate: number = 0;
  showForceKey: boolean = false;
  iconName: string = 'fa-solid fa-jedi';
  forceIconWeak: string = 'fa-solid fa-jedi';
  forceIconStrong: string = 'fa-solid fa-empire';
  showWeakOrStrong: string = 'weak';
  titleString: string = 'Force-converter';
  forcePanelState: boolean = false;
  themeName: string = 'business';
  isNewtons: boolean = false;
  destroyed$ = new Subject();
  iconValueWeak: number = 10;
  iconUnitWeak: string = 'Newtons';
  iconFirstAdditionWeak: number = 10;
  iconValueStrong: number = 10;
  iconUnitStrong: string = 'Kilonewtons';
  iconFirstAdditionStrong: number = 10;
  displayForce: number[] = [];
  forceValue: number = 0;
  forceUnit: string = '';
  iconFirstAddition: number = 0;


  fromQuantity: string[] = [
    'Newtons',
    'Kilonewtons',
    'Gram-force',
    'Kilogram-force'
  ];
  toQuantity: string[] = [
    'Newtons',
    'Kilonewtons',
    'Gram-force',
    'Kilogram-force'
  ];

  public newtonsToKilonewtons: number = 1000;
  public newtonsToGramforce: number = 0.00980665;
  public newtonsToKilogramForce: number = 9.80665;
  public kilogramForceToNewtons: number = 0.1019716213;
  public kilogramForceToGramForce: number = 0.001;
  public kilogramForceToKiloNewtons: number = 101.9716213;
  public gramForceToNewtons: number = 101.9716213;
  public gramForceToKilonewtons: number = 101971.6213;
  public gramForceToKilogramForce: number = 1000;
  public kilonewtonsToNewtons: number = 0.001;
  public kilonewtonsToGramForce: number = 0.0000098067;
  public kilonewtonsToKilogramForce: number = 0.00980665;
  public newtonsToWeakIcon: number = 10;
  public kilonewtonsToStrongIcon: number = 100;

  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<ForceConverterComponent>,
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

  ngOnDestroy(): void { 
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
}

  forceConversion(){

    if(this.firstSystem === 'Newtons'){
      this.isNewtons = true;
    }else if(this.firstSystem === 'Gram-force'){
      this.isNewtons = true;
    }else{
      this.isNewtons = false;
    };

    if(this.firstValue < 100 && this.isNewtons){
      this.showWeakOrStrong = 'weak';
    };
    if(this.firstValue < 100 && !this.isNewtons){
      this.showWeakOrStrong = 'weak';
    };
    if(this.firstValue > 100 && this.isNewtons){
      this.showWeakOrStrong = 'strong';
    };
    if(this.firstValue > 100 && !this.isNewtons){
      this.showWeakOrStrong = 'strong';
    };

    if(this.showWeakOrStrong === 'weak'){
      switch(this.firstSystem){
        case 'Newtons': {
          switch(this.secondSystem){
            case 'Newtons': {
              console.log("Error, cannot convert Newtons to Newtons.");
              break;
            }
            case 'Kilonewtons': {
              this.displayConversionRate = this.convertForce(this.newtonsToKilonewtons);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Gram-force': {
              this.displayConversionRate = this.convertForce(this.newtonsToGramforce);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Kilogram-force': {
              this.displayConversionRate = this.convertForce(this.newtonsToKilogramForce);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
          }
          break;
        }
        case 'Kilonewtons': {
          switch(this.secondSystem){
            case 'Newtons': {
              this.displayConversionRate = this.convertForce(this.kilonewtonsToNewtons);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Kilonewtons': {
              console.log("Error, cannot convert Kilonewtons to Kilonewtons.");
              break;
            }
            case 'Gram-force': {
              this.displayConversionRate = this.convertForce(this.kilonewtonsToGramForce);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Kilogram-force': {
              this.displayConversionRate = this.convertForce(this.kilonewtonsToKilogramForce);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
          }
          break;
        }
        case 'Gram-force': {
          switch(this.secondSystem){
            case 'Newtons': {
              this.displayConversionRate = this.convertForce(this.gramForceToNewtons);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Kilonewtons': {
              this.displayConversionRate = this.convertForce(this.gramForceToKilonewtons);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Gram-force': {
              console.log("Error, cannot convert Gram-force to Gram-force.");
              break;
            }
            case 'Kilogram-force': {
              this.displayConversionRate = this.convertForce(this.gramForceToKilogramForce);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
          }
          break;
        }
        case 'Kilogram-force': {
          switch(this.secondSystem){
            case 'Newtons': {
              this.displayConversionRate = this.convertForce(this.kilogramForceToNewtons);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Kilonewtons': {
              this.displayConversionRate = this.convertForce(this.kilogramForceToKiloNewtons);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Gram-force': {
              this.displayConversionRate = this.convertForce(this.kilogramForceToGramForce);
              this.displayIconConversionRate = this.convertToWeakIcon(this.newtonsToWeakIcon);
              break;
            }
            case 'Kilogram-force': {
              console.log("Error, cannot convert Kilogram-force to Kilogram-force.");
              break;
            }
          }
          break;
        }
      }
    }
    if(this.showWeakOrStrong === 'strong'){
      switch(this.firstSystem){
        case 'Newtons': {
          switch(this.secondSystem){
            case 'Newtons': {
              console.log("Error, cannot convert Newtons to Newtons.");
              break;
            }
            case 'Kilonewtons': {
              this.displayConversionRate = this.convertForce(this.newtonsToKilonewtons);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Gram-force': {
              this.displayConversionRate = this.convertForce(this.newtonsToGramforce);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Kilogram-force': {
              this.displayConversionRate = this.convertForce(this.newtonsToKilogramForce);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
          }
          break;
        }
        case 'Kilonewtons': {
          switch(this.secondSystem){
            case 'Newtons': {
              this.displayConversionRate = this.convertForce(this.kilonewtonsToNewtons);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Kilonewtons': {
              console.log("Error, cannot convert Kilonewtons to Kilonewtons.");
              break;
            }
            case 'Gram-force': {
              this.displayConversionRate = this.convertForce(this.kilonewtonsToGramForce);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Kilogram-force': {
              this.displayConversionRate = this.convertForce(this.kilonewtonsToKilogramForce);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
          }
          break;
        }
        case 'Gram-force': {
          switch(this.secondSystem){
            case 'Newtons': {
              this.displayConversionRate = this.convertForce(this.gramForceToNewtons);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Kilonewtons': {
              this.displayConversionRate = this.convertForce(this.gramForceToKilonewtons);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Gram-force': {
              console.log("Error, cannot convert Gram-force to Gram-force.");
              break;
            }
            case 'Kilogram-force': {
              this.displayConversionRate = this.convertForce(this.gramForceToKilogramForce);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
          }
          break;
        }
        case 'Kilogram-force': {
          switch(this.secondSystem){
            case 'Newtons': {
              this.displayConversionRate = this.convertForce(this.kilogramForceToNewtons);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Kilonewtons': {
              this.displayConversionRate = this.convertForce(this.kilogramForceToKiloNewtons);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Gram-force': {
              this.displayConversionRate = this.convertForce(this.kilogramForceToGramForce);
              this.displayIconConversionRate = this.convertToStrongIcon(this.kilonewtonsToStrongIcon);
              break;
            }
            case 'Kilogram-force': {
              console.log("Error, cannot convert Kilogram-force to Kilogram-force.");
              break;
            }
          }
          break;
        }
      }
    }
    this.showForceKey = true;
    this.saveForceClicked();
  }

  convertForce(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  }

  convertToWeakIcon(conversionRate: number){
    this.forceValue = this.secondValue / 10;
    this.iconValueWeak = Math.trunc(this.forceValue);
    this.displayForce = [];
    for(let index=0; index < this.iconValueWeak; index++){
      this.displayForce.push(index);
    };
    this.iconName = this.forceIconWeak;
    this.iconValueWeak = 0;
    this.forceValue = this.iconValueWeak;
    this.iconFirstAddition = this.iconFirstAdditionWeak;
    return conversionRate;
  }

  convertToStrongIcon(conversionRate: number){
    this.forceValue = this.secondValue / 10;
    this.iconValueWeak = Math.trunc(this.forceValue);
    this.displayForce = [];
    for(let index=0; index < this.iconValueStrong; index++){
      this.displayForce.push(index);
    };
    this.iconName = this.forceIconStrong;
    this.iconValueStrong = 0;
    return conversionRate;
  }

  clearForceClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Force-converter',
        messege: 'Are you sure you want to clear force-converter?',
        iconString: 'fa-solid fa-jedi'
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearForceClicked();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showForceKey = false;
  }

  saveForceClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearPressure(){
    this.firstSystem = '';
    this.secondSystem = '';
    this.firstValue = 0;
    this.secondValue = 0;
    this.displayConversionRate = 0;
    this.displayForce = [];
    this.iconName = '';
    this.iconValueStrong = 0;
    this.iconValueWeak = 0;
    console.log("Cleared.");
  };

}
