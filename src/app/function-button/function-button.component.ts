import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-function-button',
  templateUrl: './function-button.component.html',
  styleUrls: ['./function-button.component.css']
})
export class FunctionButtonComponent {

  @Output() functionClicked = new EventEmitter<string>();
  @Output() clearClicked = new EventEmitter<string>();
  @Output() equalClicked = new EventEmitter<string>();
  @Output() backSpaceClicked = new EventEmitter<string>();



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

  onClearClicked(event: string)
  {
    this.clearClicked.emit(event);
  }

  onBackSpaceClicked(event: string)
  {
    this.backSpaceClicked.emit(event);
  }
}
