import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AngularPractiseTextbox';
  names: string = "";
  arrayOfNames: string[] = [];
  arrayOfNamesAlphabetical: string[] =[];
  reverseArray: string[] = [];
  showButton: boolean = false;
  displaySumHistory: boolean = false;




  constructor(public calculatorService: CalculatorService){}



  onSubmit(inputedNames: string)
  {
    this.arrayOfNames = inputedNames.split(",");

    let trimmedArray: string[] =[];
    for(let name of this.arrayOfNames)
    {
      trimmedArray.push(name.trim());
    }
    this.arrayOfNamesAlphabetical = trimmedArray.sort();
    
    console.log(this.arrayOfNamesAlphabetical);

    this.showButton = true;
  }

  reverseOrder()
  {
    this.reverseArray = this.arrayOfNames.sort().reverse();
    this.arrayOfNamesAlphabetical = this.reverseArray;
  }

  onNumberClicked(value: any): void
  {
    this.calculatorService.numberClicked(value);
  }

  onFunctionClicked(function2: string): void
  {
    this.calculatorService.functionClicked(function2);
  }

  onEqualClicked()
  {
    this.calculatorService.equalClicked();
  }

  onClearClicked()
  {
    this.calculatorService.clearClicked();
  }

  onBackSpaceClicked()
  {
    this.calculatorService.backSpaceClicked();
  }

  showSumHistory()
  {
    if (this.displaySumHistory === true)
    {
      this.displaySumHistory = false;
    }else{
      this.displaySumHistory = true;
    }
  }
}
