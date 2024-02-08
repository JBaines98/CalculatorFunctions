import { TestBed } from '@angular/core/testing';

import { LogCalculationsService } from './logCalculations.service';

describe('LogCalculationsService', () => {
  let service: LogCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
