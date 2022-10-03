import { TestBed } from '@angular/core/testing';

import { CoingeckoService } from './coingecko.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoingeckoService', () => {
  let service: CoingeckoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [CoingeckoService] });
    service = TestBed.inject(CoingeckoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
