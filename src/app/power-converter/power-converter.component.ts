import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { LogCalculationsService } from '../logCalculations.service';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-power-converter',
  templateUrl: './power-converter.component.html',
  styleUrls: ['./power-converter.component.css']
})
export class PowerConverterComponent implements OnDestroy {

  

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate: number = 0;
  displayIconConversionRate: number = 0;

  iconValue: number = 0;
  iconUnit: string = '';
  iconFirstAddition: number = 0;
  displayIcons: number[] = [];
  iconName: string = '';
  horsepowerIcon: string = 'fa-solid fa-horse';
  kilowattIcon: string = 'fa-solid fa-plug';
  horsepowerIconValue: number = 1;
  kilowattIconValue: number = 1;
  displayPowerComponent: boolean = false;
  clearPowerValue: boolean = false;
  showPowerKey: boolean = false;
  iconNameTitle: string = 'fa-solid fa-battery-half';
  titleString: string = 'Power-converter';
  powerPanelState: boolean = false;
  themeName: string = 'business';
  public destroyed$ = new Subject();
 
  public horsePowerToKilowatt: number = 0.7457;
  public kilowattToHorsePower: number = 1.341;
  private readonly horsePowerToIcon: number = 1;
  private readonly kilowattToIcon: number = 1;

  firstQuantity: string[] = [
    'Horse Power',
    'Kilowatt'
  ];

  secondQuantity: string[] = [
    'Kilowatt',
    'Horse Power'
  ];

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<PowerConverterComponent>,
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


  powerConversion(){

    if(this.firstSystem === 'Horse Power'){
      this.iconName = this.kilowattIcon;
      this.iconUnit = 'Kw';
      this.iconFirstAddition = 1;
      this.iconValue = 1;
      this.displayIconConversionRate = 1;
      this.displayPowerComponent = true;
    }else{
      this.iconName = this.horsepowerIcon;
      this.iconUnit = 'Hp';
      this.iconFirstAddition = 1;
      this.iconValue = 1;
      this.displayIconConversionRate = 1;
      this.displayPowerComponent = true;
    };

    switch(this.firstSystem){
      case 'Horse Power': {
        switch(this.secondSystem){
          case 'Kilowatt': {
            this.displayConversionRate = this.convertToSecondHpToKw(this.horsePowerToKilowatt);
            this.displayIconConversionRate = this.convertToIconsHpToKw(this.horsePowerToIcon);
            break;
          }
          case 'Horse Power': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.")
            console.log("Cannot convert to the same unit.");
            break;
          }
        }
        break;
      }
      case 'Kilowatt': {
        switch(this.secondSystem){
          case 'Horse Power': {
            this.displayConversionRate = this.convertToSecondKwToHp(this.kilowattToHorsePower);
            this.displayIconConversionRate = this.convertToIconsKwToHp(this.kilowattToIcon);
            break;
          }
          case 'Kilowatt': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.")
            console.log("Cannot convert to the same unit.");
            break;
          }
        }
        break;
      }
    }
    this.showPowerKey = true;
    this.savePowerClicked();
  }
  

  convertToSecondHpToKw(conversionRate: number){
    this.secondValue = this.firstValue / conversionRate;
    return conversionRate;
  }
  convertToSecondKwToHp(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  }
  
  convertToIconsHpToKw(conversionRate: number){
    this.iconValue = this.firstValue * conversionRate;
    this.displayIcons = [];
    for(let index =0; index < this.iconValue; index++){
      this.displayIcons.push(index);
    }
    return conversionRate;
  }

  convertToIconsKwToHp(conversionRate: number){
    this.iconValue = this.firstValue * conversionRate;
    this.displayIcons = [];
    for(let index =0; index < this.iconValue; index++){
      this.displayIcons.push(index);
    }
    return conversionRate;
  }

  // powerShowIcon(){
  //   if(this.showPowerKey === false){
  //     this.showPowerKey = true;
  //     this.showPowerKeyCheck = true;
  //   }else{
  //     this.showPowerKey = false;
  //     this.showPowerKeyCheck = false;
  //   };
  // }

  savePowerClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearPowersClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Power-converter',
        message: 'Are you sure you want to clear power-converter?',
        iconString: 'fa-solid fa-battery-half'
      }
      
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearPowers();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showPowerKey = false;
  }

  clearPowers(){
      this.firstSystem = '';
      this.secondSystem = '';
      this.firstValue = 0;
      this.secondValue = 0;
      this.displayConversionRate = 0;
      this.displayIcons = [];
      this.displayPowerComponent = false;
      console.log("Cleared.");
  }

}
