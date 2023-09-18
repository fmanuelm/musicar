import { TestBed } from '@angular/core/testing';

import { ClientesgruposService } from './clientesgrupos.service';

describe('ClientesgruposService', () => {
  let service: ClientesgruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesgruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
