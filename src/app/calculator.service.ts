import { Injectable } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { Calculation } from './models/calculationHistory.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  displayArray: any[] = [];
  displayString: string = '';
  numberA = 0;
  numberB = 0;
  result = 0;
  function = '';
  memoryNumber: any = 0;
  arrayOfCalculations: Calculation[] = [];
  private behaviorCalculationHistory$ = new BehaviorSubject<Calculation[]>([]);
  public calculationHistory$ = this.behaviorCalculationHistory$.asObservable();
  private behaviorMemoryNumber$ = new BehaviorSubject<number | undefined>(undefined);
  public memoryNumber$ = this.behaviorMemoryNumber$.asObservable();

  constructor() { }



  numberClicked(value: number){
    console.log(value);
    this.displayArray.push(value);
    this.displayString = this.displayArray.join('');
  }

  functionClicked(function2: string){
    console.log(function2);
    if (this.function && this.numberB !== 0){
      switch(function2){
        case '+': {
          this.displayString = this.addNumbers().toString();
          break;
        }
        case '-': {
          this.displayString = this.subtractNumbers().toString();
          break;
        }
        case '*': {
          this.displayString = this.multiplyNumbers().toString();
          break;
        }
        case '/': {
          this.displayString = this.divideNumbers().toString();
          break;
        }
        case '^2': {
          this.displayString = this.squareNumbers().toString();
          break;
        }
        case 'sqRT': {
          this.displayString = this.squareRootNumbers().toString();
          break;
        }
      }
    }else{
      this.numberA = Number(this.displayString);
    }
    this.function = function2;
    this.displayArray = [];
    this.displayString = '';
  }

  clearClicked(){
    console.log('cleared');
    this.displayArray = [];
    this.displayString = '';
    this.function ='';
    this.numberA = 0;
    this.numberB = 0;
    this.arrayOfCalculations = [];

  }

  equalClicked(){
    this.numberB = Number(this.displayString);
    switch(this.function){
      case '+': {
        this.displayString = this.addNumbers().toString();
        break;
      }
      case '-': {
        this.displayString = this.subtractNumbers().toString();
        break;
      }
      case '*': {
        this.displayString = this.multiplyNumbers().toString();
        break;
      }
      case '/': {
        this.displayString = this.divideNumbers().toString();
        break;
      }
      case '^2': {
        this.displayString = this.squareNumbers().toString();
        break;
      }
      case 'sqRT': {
        this.displayString = this.squareRootNumbers().toString();
        break;
      }
    }
  }

  addNumbers(): any
  {
    this.result = this.numberA + this.numberB;
    console.log(this.result);
    var singleCalculation: Calculation = {
      number1: this.numberA,
      number2: this.numberB,
      function: this.function,
      result: this.result
    }
    this.addCalculationToHistory(singleCalculation);
    this.numberA = this.result;
    this.numberB = 0;
    this.displayString = this.result.toString();
    return this.result;
  }

  subtractNumbers(): any
  {
    this.result = this.numberA - this.numberB;
    console.log(this.result);
    var singleCalculation: Calculation = {
      number1: this.numberA,
      number2: this.numberB,
      function: this.function,
      result: this.result
    }
    this.addCalculationToHistory(singleCalculation);
    this.numberA = this.result;
    this.numberB = 0;
    this.displayString = this.result.toString();
    return this.result;
  }

  multiplyNumbers(): any
  {
    this.result = this.numberA * this.numberB;
    console.log(this.result);
    var singleCalculation: Calculation = {
      number1: this.numberA,
      number2: this.numberB,
      function: this.function,
      result: this.result
    }
    this.addCalculationToHistory(singleCalculation);
    this.numberA = this.result;
    this.numberB = 0;
    this.displayString = this.result.toString();
    return this.result;
  }

  divideNumbers(): any
  {
    this.result = this.numberA / this.numberB;
    console.log(this.result);
    var singleCalculation: Calculation = {
      number1: this.numberA,
      number2: this.numberB,
      function: this.function,
      result: this.result
    }
    this.addCalculationToHistory(singleCalculation);
    this.numberA = this.result;
    this.numberB = 0;
    this.displayString = this.result.toString();
    return this.result;
  }

  squareNumbers(): any
  {
    this.result = this.numberA * this.numberA;
    console.log(this.result);
    var singleCalculation: Calculation = {
      number1: this.numberA,
      number2: this.numberA,
      function: this.function,
      result: this.result
    }
    this.addCalculationToHistory(singleCalculation);
    this.numberA = this.result;
    this.numberB = 0;
    this.displayString = this.result.toString();
    return this.result;
  }

  squareRootNumbers(): any
  {
    this.result = Math.sqrt(this.numberA);
    console.log(this.result);
    var singleCalculation: Calculation = {
      number1: this.numberA,
      number2: undefined,
      function: this.function,
      result: this.result
    }
    this.addCalculationToHistory(singleCalculation);
    this.numberA = this.result;
    this.numberB = 0;
    this.displayString = this.result.toString();
    return this.result;
  }

  backSpaceClicked() :any
  {
    if (this.displayArray)
    {
      this.displayArray.pop();
      this.displayString = this.displayArray.join('');
      console.log(this.displayString);
    }else{
      console.log("Nothing to delete");
    }
  }

  addCalculationToHistory(calculation: Calculation)
  {
    this.arrayOfCalculations.push(calculation);
    this.behaviorCalculationHistory$.next(this.arrayOfCalculations);
    console.log(this.arrayOfCalculations);
  }

  saveToMemory(){
    this.memoryNumber = Number(this.displayString);
    this.behaviorMemoryNumber$.next(this.memoryNumber);
    console.log("Memory saved.")
  }

  useMemory(){
    this.displayString = this.memoryNumber.toString();
    this.behaviorMemoryNumber$.next(this.memoryNumber);
    console.log("Memory used.")
  }

  clearMemory(){
    this.memoryNumber = undefined;
    this.behaviorMemoryNumber$.next(this.memoryNumber);
    console.log("Memory cleared.");
  }
}
