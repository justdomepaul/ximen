import { TestBed } from '@angular/core/testing';

import { FullSpinnerService } from './full-spinner.service';

describe('FullSpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullSpinnerService = TestBed.get(FullSpinnerService);
    expect(service).toBeTruthy();
  });
});
