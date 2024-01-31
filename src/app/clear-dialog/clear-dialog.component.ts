import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-dialog',
  templateUrl: './clear-dialog.component.html',
  styleUrls: ['./clear-dialog.component.css']
})
export class ClearDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {converterType: string, message: string},
    public dialogRef: MatDialogRef<ClearDialogComponent>){}

    confirmationYes(){
      this.dialogRef.close(true);
      // console.log("confirm yes");
      // this.confirmationClear.emit(true);
    }

    confirmationNo(){
      this.dialogRef.close(false);
      // console.log("confirm no");
      // this.confirmationClear.emit(false);
    }
    
  

}
