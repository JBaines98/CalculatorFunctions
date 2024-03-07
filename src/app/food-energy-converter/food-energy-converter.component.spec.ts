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

  it('should convert food calories to joules', () => {
    component.foodSystem = 'Food Calories';
    component.foodValue = 100;
    component.energySystem = 'Joules';
    component.energyValue = 0;
    component.displayConversionRate = 0;
    component.foodCaloriesToJoules = 4184;

    component.energyConversion();

    expect(component.showFoodKey).toBeTrue();
    expect(component.energyValue).toEqual(component.foodValue * component.foodCaloriesToJoules);
  });

  it('should convert food calories to kilojoules', () => {
    component.foodSystem = 'Food Calories';
    component.foodValue = 100;
    component.energyValue = 0;
    component.energySystem = 'Kilojoules';
    component.displayConversionRate = 0;
    component.foodCaloriesToKiloJoules = 4.184;

    component.energyConversion();

    expect(component.showFoodKey).toBeTrue();
    expect(component.energyValue).toEqual(component.foodValue * component.foodCaloriesToKiloJoules);
  });

  it('should clear all varibales', () => {
    component.clearQuantities();

    expect(component.foodSystem).toEqual('');
    expect(component.foodValue).toEqual(0);
    expect(component.energySystem).toEqual('');
    expect(component.energyValue).toEqual(0);
    expect(component.displayConversionRate).toEqual(0);
    expect(component.displayApples).toEqual([]);
  });

  it('should change varibale showFoodKey to false, hiding key icon', () => {
    component.showFoodKey = true;

    component.clearQuantitiesClicked();

    expect(component.showFoodKey).toBeFalse();
  });
});
