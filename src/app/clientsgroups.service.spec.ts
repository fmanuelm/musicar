import { TestBed } from '@angular/core/testing';

import { ClientsgroupsService } from './clientsgroups.service';

describe('ClientsgroupsService', () => {
  let service: ClientsgroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsgroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
