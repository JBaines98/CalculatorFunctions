import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private behaviorThemeName$ = new BehaviorSubject<string>('business');
  public themeName$ = this.behaviorThemeName$.asObservable();

  constructor() {this.themeChange('business');}

  themeChange(theme: any): BehaviorSubject<string>{
    this.behaviorThemeName$.next(theme);
    return this.behaviorThemeName$;
  }
}
