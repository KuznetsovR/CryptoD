import { TestBed } from '@angular/core/testing';

import { DappRadarService } from './dapp-radar.service';

describe('DappRadarService', () => {
  let service: DappRadarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DappRadarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
