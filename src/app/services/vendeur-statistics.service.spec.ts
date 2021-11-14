import { TestBed } from '@angular/core/testing';

import { VendeurStatisticsService } from './vendeur-statistics.service';

describe('VendeurStatisticsService', () => {
  let service: VendeurStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendeurStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
