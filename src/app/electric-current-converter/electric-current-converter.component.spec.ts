import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricCurrentConverterComponent } from './electric-current-converter.component';

describe('ElectricCurrentConverterComponent', () => {
  let component: ElectricCurrentConverterComponent;
  let fixture: ComponentFixture<ElectricCurrentConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricCurrentConverterComponent]
    });
    fixture = TestBed.createComponent(ElectricCurrentConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
