import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDisplayerComponent } from './icon-displayer.component';

describe('IconDisplayerComponent', () => {
  let component: IconDisplayerComponent;
  let fixture: ComponentFixture<IconDisplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconDisplayerComponent]
    });
    fixture = TestBed.createComponent(IconDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
