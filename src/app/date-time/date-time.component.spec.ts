import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeComponent } from './date-time.component';

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeComponent]
    });
    fixture = TestBed.createComponent(DateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate variable dateGMT with the current DateTime', () => {
    component.dateGMT = undefined;

    component.timeGetGMT();

    expect(component.dateGMT).toBeTrue();
  });

  it('should test to see if dateGMT is populated, and then minus 5 hours', () => {
    component.timeGetGMT();
    component.timeToEST();

    expect(component.dateEST).toBeTrue();
  });

  it('should test to see if dateGMT is populated, and then add 5 hours', () => {
    component.timeGetGMT();
    component.timeToIST();

    expect(component.dateIST).toBeTrue();
  });

  it('should test to see if dateGMT is populated, and then add 9 hours', () => {
    component.timeGetGMT();
    component.timeToJST();

    expect(component.dateJST).toBeTrue();
  });

  it('should test to see if dateGMT is populated, and then add 3 hours', () => {
    component.timeGetGMT();
    component.timeToMSK();

    expect(component.dateMSK).toBeTrue();
  });

  it('should clear all variables', () => {
    component.clearAllTimes();

    expect(component.dateGMT).toEqual(undefined);
    expect(component.dateEST).toEqual(undefined);
    expect(component.dateIST).toEqual(undefined);
    expect(component.dateJST).toEqual(undefined);
    expect(component.dateMSK).toEqual(undefined);
  });

  it('should get all times', () => {
    component.getAllTimes();

    expect(component.dateGMT).toBeTrue();
    expect(component.dateEST).toBeTrue();
    expect(component.dateIST).toBeTrue();
    expect(component.dateJST).toBeTrue();
    expect(component.dateMSK).toBeTrue();
  });
});
