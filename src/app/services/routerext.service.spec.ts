import { TestBed } from '@angular/core/testing';

import { RouterextService } from './routerext.service';

describe('RouterextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterextService = TestBed.get(RouterextService);
    expect(service).toBeTruthy();
  });
});
