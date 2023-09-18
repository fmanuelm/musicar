import { TestBed } from '@angular/core/testing';

import { UsersavailabilityService } from './usersavailability.service';

describe('UsersavailabilityService', () => {
  let service: UsersavailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersavailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
