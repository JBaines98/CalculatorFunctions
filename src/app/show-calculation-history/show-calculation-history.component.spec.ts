import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCalculationHistoryComponent } from './show-calculation-history.component';

describe('ShowCalculationHistoryComponent', () => {
  let component: ShowCalculationHistoryComponent;
  let fixture: ComponentFixture<ShowCalculationHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCalculationHistoryComponent]
    });
    fixture = TestBed.createComponent(ShowCalculationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
