import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrigonometryComponent } from './trigonometry.component';
import { ComponentPortal } from '@angular/cdk/portal';

describe('TrigonometryComponent', () => {
  let component: TrigonometryComponent;
  let fixture: ComponentFixture<TrigonometryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrigonometryComponent]
    });
    fixture = TestBed.createComponent(TrigonometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all trigonometry variables', () => {

    component.clearTrigonometry();

    expect(component.adjacent).toEqual(0);
    expect(component.angleInput).toEqual(0);
    expect(component.hypotenuse).toEqual(0);
    expect(component.opposite).toEqual(0);
    expect(component.calculation).toEqual({});
  });


  it('should build a calculation and store it in an array in service', () => {
    component.angleInput = 30;
    component.opposite = 10;
    component.hypotenuse = 20;
    component.adjacent = 17.320508

    let result = component.saveTrigonometryClicked();

    expect(component.calculation).toEqual(result);
  });

  it('should complete Sin function to obtain opposite value', () => {
    component.angleInput = 30;
    component.hypotenuse = 20;

    component.trigonometrySin();

    expect(component.opposite).toEqual(Math.sin(component.angleInput) * component.angleInput)
  });

  it('should complete Cos function to obtain hypotenuse value', () => {
    component.angleInput = 30;
    component.adjacent = 17.320508;

    component.trigonometryCos();

    expect(component.hypotenuse).toEqual(component.adjacent / Math.cos(component.angleInput))
  });

  it('should complete Tan function to obtain adjacent value', () => {
    component.angleInput = 30;
    component.opposite = 10;

    component.trigonometryTan();

    expect(component.adjacent).toEqual(component.opposite / Math.tan(component.angleInput))
  });
});
