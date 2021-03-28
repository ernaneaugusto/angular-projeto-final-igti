import { TestBed } from '@angular/core/testing';

import { NewPromotionService } from './new-promotion.service';

describe('NewPromotionService', () => {
  let service: NewPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
