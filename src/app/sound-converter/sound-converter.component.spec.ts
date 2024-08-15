import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundConverterComponent } from './sound-converter.component';

describe('SoundConverterComponent', () => {
  let component: SoundConverterComponent;
  let fixture: ComponentFixture<SoundConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoundConverterComponent]
    });
    fixture = TestBed.createComponent(SoundConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
