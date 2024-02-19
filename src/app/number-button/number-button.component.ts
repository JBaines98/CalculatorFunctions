import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../theme.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-number-button',
  templateUrl: './number-button.component.html',
  styleUrls: ['./number-button.component.css']
})
export class NumberButtonComponent {

  public themeName: string = 'business';
  @Input() key = '';
  @Output() numberClicked = new EventEmitter<string>();

  constructor(public themeService: ThemeService){
    this.themeService.themeName$.pipe(
      tap((theme) => {
        this.themeName = theme;
      })
    ).subscribe();
  }

  onClick()
  {
    this.numberClicked.emit(this.key);
  }

  getClass(): string
{
  switch(this.key){
    case '1': {
      return 'fa-solid fa-1';
    }
    case '2': {
      return 'fa-solid fa-2';
    }
    case '3': {
      return 'fa-solid fa-3';
    }
    case '4':{
      return 'fa-solid fa-4';
    }
    case '5': {
      return 'fa-solid fa-5';
    }
    case '6': {
      return 'fa-solid fa-6';
    }
    case '7': {
      return 'fa-solid fa-7';
    }
    case '8': {
      return 'fa-solid fa-8';
    }
    case '9': {
      return 'fa-solid fa-9';
    }
    case '0': {
      return 'fa-solid fa-0';
    }
  }
  return '';
}
}
