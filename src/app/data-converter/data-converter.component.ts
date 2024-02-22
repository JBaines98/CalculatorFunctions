import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ThemeService } from '../theme.service';
import { LogCalculationsService } from '../logCalculations.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-data-converter',
  templateUrl: './data-converter.component.html',
  styleUrls: ['./data-converter.component.css']
})
export class DataConverterComponent implements OnDestroy{

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate: number = 0;
  displayIconRate: number =0;

  dataIconValue: number = 0;
  displayDataIcon: number[] = [];
  dataIconName: string = 'fa-solid fa-hard-drive';
  dataIconUnit: string = 'worth of data';
  iconFirstAddition: number = 1;

  themeName: string = 'business';
  destroyed$ = new Subject();
  showDataKey: boolean = false;
  iconName: string = 'fa-solid fa-cookie-bite';
  titleString: string = 'Data-converter';
  dataPanelState: boolean = false;

  fromQuantity: string[] = [
    'Megabytes',
    'Gigabytes',
    'Terabytes'
  ];
  toQuantity: string[] = [
    'Megabytes',
    'Gigabytes',
    'Terabytes'
  ];

  private readonly megabytesToGigabytes: number = 1024;
  private readonly megabytesToTerabytes: number = 1048576;
  private readonly gigabytesToMegabytes: number = 0.0009765625;
  private readonly gigabytesToTerabytes: number = 1024;
  private readonly terabytesToMegabytes: number = 1/1048576;
  private readonly terabytesToGigabytes: number = 0.0009765625;
  private readonly megabytesToDataIcon: number = 0;
  private readonly gigabytesToDataIcon: number = 0;
  private readonly terabytesToDataIcon: number = 0;

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<DataConverterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ={
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

  dataConversion(){
    switch(this.firstSystem){
      case 'Megabytes': {
        switch(this.secondSystem){
          case 'Megabytes': {
            console.log("Error, cannot convert Megabytes to Megabytes.");
            break;
          }
          case 'Gigabytes': {
            this.displayConversionRate = this.convertData(this.megabytesToGigabytes);
            this.displayIconRate = this.convertToIcon(this.megabytesToDataIcon);
            break;
          }
          case 'Terabytes': {
            this.displayConversionRate = this.convertData(this.megabytesToTerabytes);
            this.displayIconRate = this.convertToIcon(this.megabytesToDataIcon);
            break;
          }
        }
        break;
      }
      case 'Gigabytes': {
        switch(this.secondSystem){
          case 'Megabytes': {
            this.displayConversionRate = this.convertData(this.gigabytesToMegabytes);
            this.displayIconRate = this.convertToIcon(this.gigabytesToDataIcon);
            break;
          }
          case 'Gigabytes': {
            console.log("Error, cannot convert Gigabytes to Gigabytes.");
            break;
          }
          case 'Terabytes': {
            this.displayConversionRate = this.convertData(this.gigabytesToTerabytes);
            this.displayIconRate = this.convertToIcon(this.gigabytesToDataIcon);
            break;
          }
        }
        break;
      }
      case 'Terabytes': {
        switch(this.secondSystem){
          case 'Megabytes': {
            this.displayConversionRate = this.convertData(this.terabytesToMegabytes);
            this.displayIconRate = this.convertToIcon(this.terabytesToDataIcon);
            break;
          }
          case 'Gigabytes': {
            this.displayConversionRate = this.convertData(this.terabytesToGigabytes);
            this.displayIconRate = this.convertToIcon(this.terabytesToDataIcon);
            break;
          }
          case 'Terabytes': {
            console.log("Error, cannot convert Terabytes to Terabytes.");
            break;
          }
        }
        break;
      }
    }
    this.showDataKey = true;
    this.saveDataClicked();
  }

  convertData(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  }

  convertToIcon(conversionRate: number){
    this.dataIconValue = this.firstValue * conversionRate;
    this.displayDataIcon = [];
    for(let index=0; index < this.dataIconValue; index++){
      this.displayDataIcon.push(index);
    }
    return conversionRate;
  }

  clearDataClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Data-converter',
        message: 'Are you sure you want to clear data-converter?',
        iconString: ''
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearData();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showDataKey = false;
  }

  saveDataClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearData(){
    this.firstSystem = '';
    this.secondSystem = '';
    this.firstValue = 0;
    this.secondValue = 0;
    this.displayConversionRate = 0;
    this.displayDataIcon = [];
    this.dataIconValue = 0;
  }
}
