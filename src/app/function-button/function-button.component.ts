import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../models/calculationHistory.model';
import { ThemeService } from '../theme.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-function-button',
  templateUrl: './function-button.component.html',
  styleUrls: ['./function-button.component.css']
})
export class FunctionButtonComponent implements OnDestroy {

  @Output() functionClicked = new EventEmitter<string>();
  @Output() clearClicked = new EventEmitter<string>();
  @Output() equalClicked = new EventEmitter<string>();
  @Output() backSpaceClicked = new EventEmitter<string>();

  public themeName: string = 'business';
  public destroyed$ = new Subject();

  constructor(public themeService: ThemeService){
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



  onClicked(event: string)
  {
    if (event)
    {
      this.functionClicked.emit(event);
    }
  }

  onEqualClicked(event: string)
  {
    this.equalClicked.emit(event);
  }

  clearCalculator(){}

  onClearClicked(event: string)
  {
    this.clearClicked.emit(event);
  }

  onBackSpaceClicked(event: string)
  {
    this.backSpaceClicked.emit(event);
  }
}
