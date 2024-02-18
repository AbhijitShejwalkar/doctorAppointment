import { TestBed } from '@angular/core/testing';

import { UserinputService } from './userinput.service';

describe('UserinputService', () => {
  let service: UserinputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
