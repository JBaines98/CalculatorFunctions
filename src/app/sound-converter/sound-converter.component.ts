import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ThemeService } from '../theme.service';
import { LogCalculationsService } from '../logCalculations.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConverterCalculation, DialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-sound-converter',
  templateUrl: './sound-converter.component.html',
  styleUrls: ['./sound-converter.component.css']
})
export class SoundConverterComponent implements OnDestroy{

  firstSystem: string = '';
  secondSystem: string = '';
  firstValue: number = 0;
  secondValue: number = 0;
  displayConversionRate: number = 0;
  displayIconRate: number = 0;
  displaySoundComponent: boolean = false;
  clearSoundValue: boolean = false;
  showSoundKey: boolean = false;
  iconName: string = '';
  titleString: string = 'Sound-converter';
  soundPanelSate: boolean = false;
  themeName: string = 'business';
  iconValue: number = 0;
  displayIcon: number[] = [];
  iconUnit: string = 'sound';
  iconFirstAddition: number = 10;
  public destroyed$ = new Subject();

  public belToDecibel: number = 0.1;
  public belToNeper: number = 0.8686000004;
  public decibelToBel: number = 10;
  public decibelToNeper: number = 8.6860000037;
  public neperToBel: number = 1.151277918;
  public neperToDecibel: number = 0.1151277918;
  public belToIcon: number = 0;
  public decibelToIcon: number = 0;
  public neperToIcon: number = 0;

  fromQuantity: string[] = [
    'Bel',
    'Decibel',
    'Neper'
  ];
  toQuantity: string[] = [
    'Bel',
    'Decibel',
    'Neper'
  ];

  constructor(
    public themeService: ThemeService,
    public logCalculations: LogCalculationsService,
    public dialogRef: MatDialogRef<SoundConverterComponent>,
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


  soundConversion(){
    switch(this.firstSystem){
      case 'Bel': {
        switch(this.secondSystem){
          case 'Bel': {
            console.log("Error, cannot convert Bels into Bels.");
            break;
          }
          case 'Decibel': {
            this.displayConversionRate = this.convertSound(this.belToDecibel);
            this.displayIconRate = this.convertToIcon(this.decibelToIcon);
            break;
          }
          case 'Neper': {
            this.displayConversionRate = this.convertSound(this.belToNeper);
            this.displayIconRate = this.convertToIcon(this.neperToIcon);
            break;
          }
        }
        break;
      }
      case 'Decibel': {
        switch(this.secondSystem){
          case 'Bel': {
            this.displayConversionRate = this.convertSound(this.decibelToBel);
            this.displayIconRate = this.convertToIcon(this.belToIcon);
            break;
          }
          case 'Decibel': {
            console.log("Error, cannot convert Decibel into Decibel.");
            break;
          }
          case 'Neper': {
            this.displayConversionRate = this.convertSound(this.decibelToNeper);
            this.displayIconRate = this.convertToIcon(this.neperToIcon);
            break;
          }
        }
        break;
      }
      case 'Neper': {
        switch(this.secondSystem){
          case 'Bel': {
            this.displayConversionRate = this.convertSound(this.neperToBel);
            this.displayIconRate = this.convertToIcon(this.belToIcon);
            break;
          }
          case 'Decibel': {
            this.displayConversionRate = this.convertSound(this.neperToDecibel);
            this.displayIconRate = this.convertToIcon(this.decibelToIcon);
            break;
          }
          case 'Neper': {
            console.log("Error, cannot convert Neper to Neper.");
            break;
          }
        }
        break;
      }
    }
    this.showSoundKey = true;
    this.saveSoundClicked();
  }

  convertSound(conversionRate: number){
    this.secondValue = this.firstValue * conversionRate;
    return conversionRate;
  }

  convertToIcon(conserionRate: number){
    this.iconValue = this.firstValue * conserionRate;
    this.displayIcon = [];
    for(let index=0; index < this.iconValue; index++){
      this.displayIcon.push(index);
    }
    return conserionRate;
  }

  clearSoundClicked(){
    const dialogRef = this.dialog.open(ClearDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        converterType: 'Sound-converter',
        messege: 'Are you sure you want to clear sound-converter?',
        iconString: ''
      }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
      if(result === true){
        this.clearSound();
      }else{
        console.log("Not cleared.");
      }
    });
    this.showSoundKey = false;
  }

  saveSoundClicked(){
    let converterCalculation: ConverterCalculation = {};
    converterCalculation.number1 = this.firstValue;
    converterCalculation.result = this.secondValue;
    converterCalculation.fromSystem = this.firstSystem;
    converterCalculation.toSystem = this.secondSystem;
    this.logCalculations.addCalculation(converterCalculation);
  }

  clearSound(){
    this.firstSystem = '';
    this.secondSystem = '';
    this.firstValue = 0;
    this.secondValue = 0;
    this.displayConversionRate = 0;
  }
}