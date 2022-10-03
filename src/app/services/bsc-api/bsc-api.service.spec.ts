import { TestBed } from '@angular/core/testing';

import { BscApiService } from './bsc-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BscApiService', () => {
  let service: BscApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [BscApiService] });
    service = TestBed.inject(BscApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
