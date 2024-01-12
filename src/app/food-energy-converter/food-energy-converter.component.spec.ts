import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEnergyConverterComponent } from './food-energy-converter.component';

describe('FoodEnergyConverterComponent', () => {
  let component: FoodEnergyConverterComponent;
  let fixture: ComponentFixture<FoodEnergyConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodEnergyConverterComponent]
    });
    fixture = TestBed.createComponent(FoodEnergyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
