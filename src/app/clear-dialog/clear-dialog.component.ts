import { Component, Inject } from '@angular/core';
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
    }

    confirmationNo(){
      this.dialogRef.close(false);
    }
  

}
