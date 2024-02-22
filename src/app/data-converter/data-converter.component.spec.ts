import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConverterComponent } from './data-converter.component';

describe('DataConverterComponent', () => {
  let component: DataConverterComponent;
  let fixture: ComponentFixture<DataConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataConverterComponent]
    });
    fixture = TestBed.createComponent(DataConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
