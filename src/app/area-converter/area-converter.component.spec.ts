import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaConverterComponent } from './area-converter.component';

describe('AreaConverterComponent', () => {
  let component: AreaConverterComponent;
  let fixture: ComponentFixture<AreaConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaConverterComponent]
    });
    fixture = TestBed.createComponent(AreaConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
