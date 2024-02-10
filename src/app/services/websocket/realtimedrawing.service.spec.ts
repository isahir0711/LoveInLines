import { TestBed } from '@angular/core/testing';

import { RealtimedrawingService } from './realtimedrawing.service';

describe('RealtimedrawingService', () => {
  let service: RealtimedrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimedrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
