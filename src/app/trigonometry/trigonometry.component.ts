import { Component } from '@angular/core';

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

  clearTrigonometry(){
    this.adjacent = 0;
    this.angleInput = 0;
    this.hypotenuse = 0;
    this.opposite = 0;
    console.log("Trigonometry functions cleared.")
  }

}
