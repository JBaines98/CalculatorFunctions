import { Component, Inject } from '@angular/core';
import { Subject, pipe, takeUntil, tap } from 'rxjs';
import { ThemeService } from '../theme.service';
import { LogCalculationsService } from '../logCalculations.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-electric-current-converter',
  templateUrl: './electric-current-converter.component.html',
  styleUrls: ['./electric-current-converter.component.css']
})
export class ElectricCurrentConverterComponent {

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
  iconName: string = 'fa-solid fa-bolt';
  displayElectricCurrentComponent: boolean = false;
  clearPowerValue: boolean = false;
  showElectricCurrentKey: boolean = false;
  titleString: string = 'Electric-current-converter';
  electricPanelState: boolean = false;
  themeName: string = 'business';
  public destroyed$ = new Subject();

  public milliampereToAmpere: number = 0.001;
  public milliampereToCoulombPerSecond: number = 0.001;
  public milliampereToKiloampere: number = 0.000001;

  public ampereToMilliampere: number = 1000;
  public ampereToCoulombPerSecond: number = 1;
  public ampereToKiloampere: number = 0.001;

  public coulombPerSecondToMilliampere: number = 1000;
  public coulombPerSecondToAmpere: number = 1;
  public coulombPerSecondToKiloampere: number = 0.001;

  public kiloampereToMilliampere: number = 1000000;
  public kiloampereToAmpere: number = 1000;
  public kiloampereToCoulombPerSecond: number = 1000;

  firstQuantity: string[] = [
    'Milliampere',
    'Ampere',
    'Coulomb per second',
    'Kiloampere'
  ];

  secondQuantity: string[] = [
    'Ampere',
    'Milliampere',
    'Coulomb per second',
    'Kiloampere'
  ];

  constructor(
    public themeService: ThemeService,
    public logCalculationsService: LogCalculationsService,
    public dialogRef: MatDialogRef<ElectricCurrentConverterComponent>,
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

  electricCurrentConversion(){
    switch(this.firstSystem){
      case 'Milliampere': {
        switch(this.secondSystem){
          case 'Ampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.milliampereToAmpere);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Coulomb per second': {
            this.displayConversionRate = this.convertToSecondSystem(this.milliampereToCoulombPerSecond);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Kiloampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.milliampereToKiloampere);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Milliampere': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.");
            console.log("Cannot convert to the same unit.");  
          }
        }
      }
      case 'Ampere': {
        switch(this.secondSystem){
          case 'Ampere': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.");
            console.log("Cannot convert to the same unit.");  
            break;
          }
          case 'Coulomb per second': {
            this.displayConversionRate = this.convertToSecondSystem(this.ampereToCoulombPerSecond);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Kiloampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.ampereToKiloampere);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Milliampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.ampereToMilliampere);
            this.displayIconConversionRate = this.convertToIcon(); 
            break;
          }
        }
      }
      case 'Coulomb per second': {
        switch(this.secondSystem){
          case 'Ampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.coulombPerSecondToAmpere);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Coulomb per second': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.");
            console.log("Cannot convert to the same unit.");  
            break;
          }
          case 'Kiloampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.coulombPerSecondToKiloampere);
            this.displayIconConversionRate = this.convertToIcon();
            break;
          }
          case 'Milliampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.coulombPerSecondToMilliampere);
            this.displayIconConversionRate = this.convertToIcon(); 
            break;
          }
        }
      }
      case 'Kiloampere': {
        switch(this.secondSystem){
          case 'Ampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.kiloampereToAmpere);
            this.displayIconConversionRate = this.convertToIcon(); 
            break;
          }
          case 'Coulomb per second': {
            this.displayConversionRate = this.convertToSecondSystem(this.kiloampereToCoulombPerSecond);
            this.displayIconConversionRate = this.convertToIcon(); 
            break;
          }
          case 'Kiloampere': {
            window.alert("Cannot convert to the same unit. Please choose a different unit.");
            console.log("Cannot convert to the same unit.");  
            break;
          }
          case 'Milliampere': {
            this.displayConversionRate = this.convertToSecondSystem(this.kiloampereToMilliampere);
            this.displayIconConversionRate = this.convertToIcon(); 
            break;
          }
        }
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

  saveElectricCurrentClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculationsService.addCalculation(converterCalculation);
  };

  clearElectricCurrentClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Electric Current',
        messege: 'Are you sure you want to clear the Electric Current conversion?',
        iconString: 'fa-solid fa-bolt'
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearElectricCurrentClicked();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showElectricCurrentKey = false;
  };

  clearElectricCurrent(){
    this.firstSystem = '';
    this.secondSystem = '';
    this.firstValue = 0;
    this.secondValue = 0;
    this.displayConversionRate = 0;
    this.displayIcons = [];
    this.displayElectricCurrentComponent = false;
    console.log("Cleared.");
  }
}
