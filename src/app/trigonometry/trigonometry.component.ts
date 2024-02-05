import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dialogData } from '../models/calculationHistory.model';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';

@Component({
  selector: 'app-trigonometry',
  templateUrl: './trigonometry.component.html',
  styleUrls: ['./trigonometry.component.css']
})
export class TrigonometryComponent {

  angleInput: number = 0;
  hypotenuse: number = 0;
  opposite: number  = 0;
  adjacent: number  = 0;

  constructor(
    public dialogRef: MatDialogRef<TrigonometryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData = {
      converterType: '',
      messege: '',
      iconString: ''
    },
    public dialog: MatDialog){}

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
    dialogRef.afterClosed().subscribe(result => {
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
    console.log("Trigonometry functions cleared.")
  }

}
