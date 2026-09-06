import { TestBed } from '@angular/core/testing';

import { DegreeInfoService } from './degree-info.service';

describe('DegreeInfoService', () => {
  let service: DegreeInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
