import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureComponent } from './pressure.component';

describe('PressureComponent', () => {
  let component: PressureComponent;
  let fixture: ComponentFixture<PressureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PressureComponent]
    });
    fixture = TestBed.createComponent(PressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Atmospheres to Bars', () => {
    component.firstSystem = 'Atmospheres';
    component.secondSystem = 'Bars';
    component.atmosphericToBars = 0.986923;
    component.atmosphericToElephants = 0.735;

    component.pressureConversion();

    expect()
  });
});
