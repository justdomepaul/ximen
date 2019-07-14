import { TestBed, async, inject } from '@angular/core/testing';

import { AuthLoginedGuard } from './auth-logined.guard';

describe('AuthLoginedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoginedGuard]
    });
  });

  it('should ...', inject([AuthLoginedGuard], (guard: AuthLoginedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
