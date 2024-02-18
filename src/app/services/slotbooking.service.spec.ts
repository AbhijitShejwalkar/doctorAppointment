import { TestBed } from '@angular/core/testing';

import { SlotbookingService } from './slotbooking.service';

describe('SlotbookingService', () => {
  let service: SlotbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
