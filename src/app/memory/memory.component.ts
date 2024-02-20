import { Component, OnDestroy } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnDestroy {

  constructor(public calculatorService: CalculatorService, public themeService: ThemeService){}



  public isMemory0: boolean = true;
  public destroyed$ = new Subject();
  public themeName: string = 'business';

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }


  ngOnInit(){
    this.calculatorService.memoryNumber$.pipe(
      tap((memoryValue: any) => {
        if (memoryValue === 0){
          console.log("No Memory");
        }else{
          this.isMemory0 = false;
        }
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
      ).subscribe();
  }

  saveToMemory(){
    this.calculatorService.saveToMemory();
  }

  useMemory(){
    this.calculatorService.useMemory();
  }

  clearMemory(){
    this.calculatorService.clearMemory();
  }

}
