import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceConverterComponent } from './force-converter.component';

describe('ForceConverterComponent', () => {
  let component: ForceConverterComponent;
  let fixture: ComponentFixture<ForceConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForceConverterComponent]
    });
    fixture = TestBed.createComponent(ForceConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
