import { TestBed } from '@angular/core/testing';

import { DappRadarService } from './dapp-radar.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DappRadarService', () => {
  let service: DappRadarService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [DappRadarService]});
    service = TestBed.inject(DappRadarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
