import { Component } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent {

  constructor(public calculatorService: CalculatorService){}

  isMemory0: boolean = true;


  ngOnInit(){
    this.calculatorService.memoryNumber$.pipe(
      tap((memoryValue: any) => {
        if (memoryValue === 0){
          console.log("No Memory");
        }else{
          this.isMemory0 = false;
        }
      })
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
