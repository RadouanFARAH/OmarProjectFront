import { TestBed } from '@angular/core/testing';

import { VendeurMyConsoService } from './vendeur-my-conso.service';

describe('VendeurMyConsoService', () => {
  let service: VendeurMyConsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendeurMyConsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
