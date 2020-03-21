import { TestBed } from '@angular/core/testing';

import { NaranjaService } from './naranja.service';

describe('NaranjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaranjaService = TestBed.get(NaranjaService);
    expect(service).toBeTruthy();
  });
});
