import { TestBed } from '@angular/core/testing';

import { BscApiService } from './bsc-api.service';

describe('BscApiService', () => {
  let service: BscApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BscApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
