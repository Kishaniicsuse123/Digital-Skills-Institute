import { TestBed } from '@angular/core/testing';

import { RegistationFormService } from './registation-form.service';

describe('RegistationFormService', () => {
  let service: RegistationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
